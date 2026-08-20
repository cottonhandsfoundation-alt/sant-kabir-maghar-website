import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { isPaymentGatewayConfigured, createRazorpayOrder } from "@/lib/payments";
import { generateDonationId } from "@/lib/receipt";
import { createDonationOrderSchema } from "@/lib/validation";

/**
 * Creates a Razorpay order and a corresponding CREATED-status Donation row.
 * The client never gets to dictate the paise amount used for verification —
 * it is fixed here, from the validated rupee amount, and stored server-side.
 */
export async function POST(req: Request) {
  try {
    const ip = getClientIp(await headers());
    const { allowed } = rateLimit(`donate:${ip}`, { max: 10, windowMs: 10 * 60 * 1000 });
    if (!allowed) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }

    if (!isPaymentGatewayConfigured()) {
      return NextResponse.json({ error: "gateway_not_configured" }, { status: 503 });
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "invalid_json" }, { status: 400 });
    }

    const parsed = createDonationOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "validation_failed", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { donorName, email, mobile, pan, address, amount, purposeKey, anonymous, isRecurring } =
      parsed.data;

    const purpose = await prisma.donationPurpose.findUnique({ where: { key: purposeKey } });
    if (!purpose || !purpose.active) {
      return NextResponse.json({ error: "invalid_purpose" }, { status: 400 });
    }

    const amountInPaise = amount * 100;
    const donationId = await generateDonationId();

    const order = await createRazorpayOrder({
      amountInPaise,
      receipt: donationId,
      notes: { donationId, purposeKey },
    });

    await prisma.donation.create({
      data: {
        donationId,
        donorName,
        email,
        mobile,
        pan: pan || null,
        address: address || null,
        amount: amountInPaise,
        currency: "INR",
        purposeId: purpose.id,
        isRecurring,
        anonymous,
        paymentGateway: "RAZORPAY",
        gatewayOrderId: order.id,
        paymentStatus: "CREATED",
        ipAddress: ip,
      },
    });

    return NextResponse.json({
      donationId,
      orderId: order.id,
      amount: amountInPaise,
      currency: "INR",
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("[donations:create-order] unexpected error", error);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
