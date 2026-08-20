"use server";

import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateReceiptNumber, formatInr } from "@/lib/receipt";
import { sendEmail, donationReceiptEmail } from "@/lib/email";
import { getSiteSettings } from "@/lib/settings";
import { formatDate } from "@/lib/utils";
import { redirect } from "next/navigation";

const DONATION_ROLES = ["SUPER_ADMIN", "DONATION_MANAGER"];
const PAYMENT_STATUSES = ["CREATED", "PENDING", "SUCCESS", "FAILED", "REFUNDED"];

/**
 * Re-sends the donation receipt email for an already-successful donation.
 * Every server action independently re-checks the admin session/role —
 * never relies on the page-level guard alone.
 */
export async function resendReceiptEmail(donationId: string) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (!DONATION_ROLES.includes(session.role)) {
    throw new Error("Forbidden: your role does not have access to this action.");
  }

  const donation = await prisma.donation.findUnique({
    where: { id: donationId },
    include: { purpose: true },
  });
  if (!donation) throw new Error("Donation not found.");
  if (donation.paymentStatus !== "SUCCESS") {
    // Cannot issue a receipt for a donation that never succeeded.
    return;
  }

  const receiptNumber = donation.receiptNumber ?? (await generateReceiptNumber());
  if (!donation.receiptNumber) {
    await prisma.donation.update({
      where: { id: donation.id },
      data: { receiptNumber },
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

  await sendEmail({ to: donation.email, ...email });

  redirect(`/admin/donations/${donationId}?resent=1`);
}

/**
 * Manual status override — SUPER_ADMIN only (stricter than the section-level
 * DONATION_MANAGER-inclusive guard), for rare cases where a payment needs a
 * manual correction (e.g. bank-statement-confirmed payment whose webhook
 * never arrived). Every override is written to AuditLog.
 */
export async function overrideDonationStatus(donationId: string, newStatus: string) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (session.role !== "SUPER_ADMIN") {
    throw new Error("Forbidden: only SUPER_ADMIN may manually override donation status.");
  }
  if (!PAYMENT_STATUSES.includes(newStatus)) {
    throw new Error("Invalid status.");
  }

  const donation = await prisma.donation.findUnique({ where: { id: donationId } });
  if (!donation) throw new Error("Donation not found.");

  const oldStatus = donation.paymentStatus;

  await prisma.donation.update({
    where: { id: donationId },
    data: { paymentStatus: newStatus },
  });

  await prisma.auditLog.create({
    data: {
      userId: session.sub,
      action: "manual_donation_status_override",
      entity: "Donation",
      entityId: donationId,
      metadata: JSON.stringify({ from: oldStatus, to: newStatus }),
    },
  });

  redirect(`/admin/donations/${donationId}?statusUpdated=1`);
}
