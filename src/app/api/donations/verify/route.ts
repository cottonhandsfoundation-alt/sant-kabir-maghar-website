import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyCheckoutSignature } from "@/lib/payments";
import { generateReceiptNumber, formatInr } from "@/lib/receipt";
import { sendEmail, donationReceiptEmail } from "@/lib/email";
import { getSiteSettings } from "@/lib/settings";
import { formatDate } from "@/lib/utils";
import { verifyDonationPaymentSchema } from "@/lib/validation";

/**
 * Fast-path optimistic confirmation for the checkout redirect. This is NOT
 * the source of truth — the webhook handler is — but it lets the browser
 * show a success screen and receive a receipt email without waiting on the
 * webhook round-trip. Every mutation here is idempotent so it is safe to run
 * whether the webhook has already landed, is about to land, or never lands
 * (e.g. local dev without a public webhook URL).
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "invalid_json" }, { status: 400 });
    }

    const parsed = verifyDonationPaymentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "validation_failed", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { donationId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

    const donation = await prisma.donation.findUnique({
      where: { donationId },
      include: { purpose: true },
    });
    if (!donation) {
      return NextResponse.json({ error: "donation_not_found" }, { status: 404 });
    }

    // The order stored server-side at creation must match the one the
    // checkout handler reports back — never trust the client's order id blindly.
    if (donation.gatewayOrderId !== razorpay_order_id) {
      return NextResponse.json({ error: "order_mismatch" }, { status: 400 });
    }

    const validSignature = verifyCheckoutSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!validSignature) {
      await prisma.donation.update({
        where: { donationId },
        data: { paymentStatus: "FAILED" },
      });
      return NextResponse.json({ error: "signature_invalid" }, { status: 400 });
    }

    let receiptNumber = donation.receiptNumber;

    if (donation.paymentStatus !== "SUCCESS") {
      if (!receiptNumber) {
        receiptNumber = await generateReceiptNumber();
      }

      // Atomic guard: only the request that actually flips CREATED/PENDING/FAILED
      // -> SUCCESS (i.e. matched a non-SUCCESS row) proceeds to send the email.
      // A concurrent duplicate call (or a race with the webhook) will match
      // zero rows here and simply skip the side effect.
      const { count } = await prisma.donation.updateMany({
        where: { donationId, paymentStatus: { not: "SUCCESS" } },
        data: {
          gatewayPaymentId: razorpay_payment_id,
          gatewaySignature: razorpay_signature,
          paymentStatus: "SUCCESS",
          receiptNumber,
        },
      });

      if (count === 0) {
        // Someone else (webhook or a concurrent verify call) already marked
        // this donation SUCCESS between our read and write — re-read the
        // authoritative receipt number and return without re-sending mail.
        const latest = await prisma.donation.findUnique({ where: { donationId } });
        return NextResponse.json({
          ok: true,
          donationId,
          receiptNumber: latest?.receiptNumber ?? receiptNumber,
        });
      }

      const settings = await getSiteSettings();
      const email = donationReceiptEmail({
        donorName: donation.donorName,
        donationId: donation.donationId,
        receiptNumber,
        amountFormatted: formatInr(donation.amount),
        purpose: donation.purpose?.labelEn ?? "General Seva",
        dateFormatted: formatDate(donation.createdAt, "en"),
        orgName: settings.org_name_en,
      });

      // Best-effort — sendEmail never throws, so this cannot fail the request.
      await sendEmail({ to: donation.email, ...email });
    }

    return NextResponse.json({ ok: true, donationId, receiptNumber });
  } catch (error) {
    console.error("[donations:verify] unexpected error", error);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
