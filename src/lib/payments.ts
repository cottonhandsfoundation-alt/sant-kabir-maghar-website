import "server-only";
import Razorpay from "razorpay";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Razorpay was chosen over Cashfree/PayU for this build because it offers
 * the broadest combination of UPI + cards + net banking, a well-documented
 * webhook + signature-verification flow, first-class Node SDK support, and
 * (unlike PayU) does not require a separate merchant-specific integration
 * per payment mode. Cashfree is a reasonable alternative; either can be
 * swapped in by reimplementing this module's three functions.
 *
 * IMPORTANT: keys are read from env vars only. If they are not configured,
 * order creation fails loudly rather than silently pretending to work —
 * a donation flow must never appear to succeed without a real gateway.
 */

function getClient() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new Error(
      "Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET (test/sandbox keys for development) in .env."
    );
  }
  return new Razorpay({ key_id, key_secret });
}

export function isPaymentGatewayConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

export async function createRazorpayOrder(opts: {
  amountInPaise: number;
  receipt: string;
  notes?: Record<string, string>;
}) {
  const client = getClient();
  return client.orders.create({
    amount: opts.amountInPaise,
    currency: "INR",
    receipt: opts.receipt,
    notes: opts.notes,
  });
}

/** Verifies the checkout-handler signature returned to the browser after a
 * payment. This alone is NOT sufficient to mark a donation successful in a
 * security-critical sense — always treat the webhook (verifyWebhookSignature)
 * as the source of truth, and use this only to give the user immediate
 * feedback before the webhook lands. */
export function verifyCheckoutSignature(opts: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_secret) throw new Error("RAZORPAY_KEY_SECRET is not configured");

  const expected = createHmac("sha256", key_secret)
    .update(`${opts.orderId}|${opts.paymentId}`)
    .digest("hex");

  return safeCompare(expected, opts.signature);
}

/** Verifies an incoming webhook's `X-Razorpay-Signature` header against the
 * raw request body using the separate webhook secret (never the API key
 * secret) configured in the Razorpay dashboard. */
export function verifyWebhookSignature(rawBody: string, signatureHeader: string | null) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("RAZORPAY_WEBHOOK_SECRET is not configured");
  }
  if (!signatureHeader) return false;

  const expected = createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
  return safeCompare(expected, signatureHeader);
}

function safeCompare(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
