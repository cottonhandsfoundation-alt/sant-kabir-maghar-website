import "server-only";
import { randomInt } from "node:crypto";
import { prisma } from "@/lib/db";

/** Human-readable donation ID, e.g. SK-2026-000123. Collision-checked
 * against the database rather than assumed unique from a counter, since
 * SQLite/Postgres don't share a single global sequence generator here. */
export async function generateDonationId(): Promise<string> {
  const year = new Date().getFullYear();
  for (let attempt = 0; attempt < 10; attempt++) {
    const suffix = String(randomInt(0, 999999)).padStart(6, "0");
    const candidate = `SK-${year}-${suffix}`;
    const existing = await prisma.donation.findUnique({
      where: { donationId: candidate },
      select: { id: true },
    });
    if (!existing) return candidate;
  }
  throw new Error("Could not generate a unique donation ID after 10 attempts");
}

/** Receipt numbers are only issued once a payment is confirmed SUCCESS. */
export async function generateReceiptNumber(): Promise<string> {
  const year = new Date().getFullYear();
  for (let attempt = 0; attempt < 10; attempt++) {
    const suffix = String(randomInt(0, 999999)).padStart(6, "0");
    const candidate = `RCPT-${year}-${suffix}`;
    const existing = await prisma.donation.findUnique({
      where: { receiptNumber: candidate },
      select: { id: true },
    });
    if (!existing) return candidate;
  }
  throw new Error("Could not generate a unique receipt number after 10 attempts");
}

export function formatInr(amountInPaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amountInPaise / 100);
}
