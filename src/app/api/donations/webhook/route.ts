import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyWebhookSignature } from "@/lib/payments";
import { generateReceiptNumber, formatInr } from "@/lib/receipt";
import { sendEmail, donationReceiptEmail } from "@/lib/email";
import { getSiteSettings } from "@/lib/settings";
import { formatDate } from "@/lib/utils";

/**
 * Source of truth for donation payment status. Must be idempotent: Razorpay
 * retries webhooks aggressively on anything other than a 2xx response, and a
 * retried delivery of an already-processed event must never re-apply side
 * effects (email sent twice, status flapping). Idempotency is enforced by a
 * unique constraint on WebhookEvent.gatewayEventId — see below.
 */
export async function POST(req: Request) {
  // Raw body text is required for HMAC verification — parsing to JSON first
  // and re-serializing would not reproduce the exact bytes Razorpay signed.
  const rawBody = await req.text();
  const signatureHeader = req.headers.get("x-razorpay-signature");

  let validSignature: boolean;
  try {
    validSignature = verifyWebhookSignature(rawBody, signatureHeader);
  } catch (error) {
    console.error("[donations:webhook] RAZORPAY_WEBHOOK_SECRET not configured", error);
    return NextResponse.json({ error: "webhook_not_configured" }, { status: 503 });
  }

  if (!validSignature) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  let event: unknown;
  try {
    event = JSON.parse(rawBody);
  } catch (error) {
    console.error("[donations:webhook] invalid JSON payload", error);
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const payload = event as {
    id?: string;
    event?: string;
    payload?: { payment?: { entity?: { id?: string; order_id?: string } } };
  };

  const eventType = payload.event ?? "unknown";
  const paymentEntity = payload.payload?.payment?.entity;
  const paymentId = paymentEntity?.id;
  const orderId = paymentEntity?.order_id;

  // Prefer Razorpay's own top-level event id; fall back to a deterministic
  // key derived from the payment id + event type if it's ever absent so we
  // still get an idempotency guard.
  const idempotencyKey = payload.id || (paymentId ? `${paymentId}:${eventType}` : null);

  if (!idempotencyKey) {
    // Nothing stable to dedupe on and nothing we can safely act on either —
    // acknowledge so Razorpay doesn't retry forever, but do no processing.
    console.warn("[donations:webhook] event with no usable id/payment id, skipping", eventType);
    return NextResponse.json({ ok: true, skipped: true });
  }

  let webhookEventRowId: string;
  try {
    const created = await prisma.webhookEvent.create({
      data: {
        gatewayEventId: idempotencyKey,
        eventType,
        payload: rawBody,
      },
    });
    webhookEventRowId = created.id;
  } catch {
    // Unique constraint violation (or any create failure) on this
    // dedupe-only table means we've already seen this event — exit early
    // without reprocessing so side effects are never double-applied.
    return NextResponse.json({ ok: true, duplicate: true });
  }

  try {
    if (eventType === "payment.captured" || eventType === "order.paid") {
      if (orderId) {
        const donation = await prisma.donation.findUnique({ where: { gatewayOrderId: orderId } });
        if (donation) {
          await prisma.webhookEvent.update({
            where: { id: webhookEventRowId },
            data: { donationId: donation.id },
          });

          if (donation.paymentStatus !== "SUCCESS") {
            const receiptNumber = donation.receiptNumber ?? (await generateReceiptNumber());

            const { count } = await prisma.donation.updateMany({
              where: { donationId: donation.donationId, paymentStatus: { not: "SUCCESS" } },
              data: {
                paymentStatus: "SUCCESS",
                gatewayPaymentId: paymentId ?? donation.gatewayPaymentId,
                receiptNumber,
              },
            });

            if (count > 0) {
              const settings = await getSiteSettings();
              const purpose = donation.purposeId
                ? await prisma.donationPurpose.findUnique({ where: { id: donation.purposeId } })
                : null;

              const email = donationReceiptEmail({
                donorName: donation.donorName,
                donationId: donation.donationId,
                receiptNumber,
                amountFormatted: formatInr(donation.amount),
                purpose: purpose?.labelEn ?? "General Seva",
                dateFormatted: formatDate(donation.createdAt, "en"),
                orgName: settings.org_name_en,
              });

              // Best-effort — sendEmail never throws.
              await sendEmail({ to: donation.email, ...email });
            }
          }
        } else {
          console.warn("[donations:webhook] no donation found for gatewayOrderId", orderId);
        }
      }
    } else if (eventType === "payment.failed") {
      if (orderId) {
        const donation = await prisma.donation.findUnique({ where: { gatewayOrderId: orderId } });
        if (donation) {
          await prisma.webhookEvent.update({
            where: { id: webhookEventRowId },
            data: { donationId: donation.id },
          });
          if (donation.paymentStatus !== "SUCCESS") {
            await prisma.donation.update({
              where: { donationId: donation.donationId },
              data: { paymentStatus: "FAILED" },
            });
          }
        }
      }
    }
    // Other event types are acknowledged but not otherwise processed.

    return NextResponse.json({ ok: true });
  } catch (error) {
    // The WebhookEvent row is already persisted, so a retry from Razorpay
    // would be deduped above even if we return an error here. We still
    // return 200 to stop retries once the idempotency row exists, since
    // reprocessing can't help if the failure was in our own side-effect
    // code (e.g. email); the payment status update itself is the critical
    // path and is attempted before this catch.
    console.error("[donations:webhook] error while processing event", error);
    return NextResponse.json({ ok: true, processedWithErrors: true });
  }
}
