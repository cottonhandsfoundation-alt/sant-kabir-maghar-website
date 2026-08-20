import { NextRequest } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatInr } from "@/lib/receipt";
import { formatDateTime } from "@/lib/utils";
import type { Prisma } from "@/generated/prisma/client";

const DONATION_ROLES = ["SUPER_ADMIN", "DONATION_MANAGER"];

function csvEscape(value: string) {
  if (/[",\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session || !DONATION_ROLES.includes(session.role)) {
    return new Response("Forbidden", { status: 403 });
  }

  const sp = request.nextUrl.searchParams;
  const status = sp.get("status") ?? undefined;
  const purpose = sp.get("purpose") ?? undefined;
  const from = sp.get("from") ?? undefined;
  const to = sp.get("to") ?? undefined;
  const q = sp.get("q") ?? undefined;

  const where: Prisma.DonationWhereInput = {};
  if (status) where.paymentStatus = status;
  if (purpose) where.purposeId = purpose;
  if (from || to) {
    where.createdAt = {
      ...(from ? { gte: new Date(from) } : {}),
      ...(to ? { lte: new Date(`${to}T23:59:59.999`) } : {}),
    };
  }
  if (q) {
    where.OR = [
      { donorName: { contains: q } },
      { email: { contains: q } },
      { donationId: { contains: q } },
    ];
  }

  const donations = await prisma.donation.findMany({
    where,
    include: { purpose: true },
    orderBy: { createdAt: "desc" },
  });

  const header = [
    "Donation ID",
    "Donor Name",
    "Email",
    "Mobile",
    "Amount (INR)",
    "Purpose",
    "Status",
    "Gateway Payment ID",
    "Receipt Number",
    "Date",
  ];

  const rows = donations.map((d) => [
    d.donationId,
    d.donorName,
    d.email,
    d.mobile,
    formatInr(d.amount),
    d.purpose?.labelEn ?? "",
    d.paymentStatus,
    d.gatewayPaymentId ?? "",
    d.receiptNumber ?? "",
    formatDateTime(d.createdAt, "en"),
  ]);

  const csvContent = [header, ...rows]
    .map((row) => row.map((cell) => csvEscape(String(cell))).join(","))
    .join("\r\n");

  return new Response(csvContent, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="donations-export.csv"`,
    },
  });
}
