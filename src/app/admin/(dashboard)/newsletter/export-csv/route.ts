import { NextRequest } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDateTime } from "@/lib/utils";
import type { Prisma } from "@/generated/prisma/client";

const CONTENT_ROLES = ["SUPER_ADMIN", "CONTENT_MANAGER"];

function csvEscape(value: string) {
  if (/[",\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session || !CONTENT_ROLES.includes(session.role)) {
    return new Response("Forbidden", { status: 403 });
  }

  const sp = request.nextUrl.searchParams;
  const status = sp.get("status") ?? undefined;

  const where: Prisma.NewsletterSubscriberWhereInput = {};
  if (status) where.status = status;

  const subscribers = await prisma.newsletterSubscriber.findMany({
    where,
    orderBy: { subscribedAt: "desc" },
  });

  const header = ["Name", "Email", "Status", "Subscribed At"];

  const rows = subscribers.map((s) => [
    s.name ?? "",
    s.email,
    s.status,
    formatDateTime(s.subscribedAt, "en"),
  ]);

  const csvContent = [header, ...rows]
    .map((row) => row.map((cell) => csvEscape(String(cell))).join(","))
    .join("\r\n");

  return new Response(csvContent, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="newsletter-subscribers-export.csv"`,
    },
  });
}
