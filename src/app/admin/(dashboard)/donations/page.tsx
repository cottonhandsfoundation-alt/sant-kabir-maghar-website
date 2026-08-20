import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatInr } from "@/lib/receipt";
import { formatDateTime } from "@/lib/utils";
import { StatusPill } from "../_shared/StatusPill";
import type { Prisma } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

const STATUSES = ["CREATED", "PENDING", "SUCCESS", "FAILED", "REFUNDED"] as const;

function statusTone(status: string) {
  if (status === "SUCCESS") return "green" as const;
  if (status === "FAILED" || status === "REFUNDED") return "maroon" as const;
  return "gold" as const; // CREATED | PENDING
}

function buildWhere(sp: {
  status?: string;
  purpose?: string;
  from?: string;
  to?: string;
  q?: string;
}): Prisma.DonationWhereInput {
  const where: Prisma.DonationWhereInput = {};

  if (sp.status) {
    where.paymentStatus = sp.status;
  }
  if (sp.purpose) {
    where.purposeId = sp.purpose;
  }
  if (sp.from || sp.to) {
    where.createdAt = {
      ...(sp.from ? { gte: new Date(sp.from) } : {}),
      ...(sp.to ? { lte: new Date(`${sp.to}T23:59:59.999`) } : {}),
    };
  }
  if (sp.q) {
    where.OR = [
      { donorName: { contains: sp.q } },
      { email: { contains: sp.q } },
      { donationId: { contains: sp.q } },
    ];
  }

  return where;
}

export default async function DonationsPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    purpose?: string;
    from?: string;
    to?: string;
    q?: string;
  }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const allowed = ["SUPER_ADMIN", "DONATION_MANAGER"];
  if (!allowed.includes(session.role)) {
    return (
      <div className="p-8">
        <p className="text-lg font-semibold">Access denied</p>
        <p className="text-sm text-ink-soft">
          Your role ({session.role}) does not have access to this section.
        </p>
      </div>
    );
  }

  const sp = await searchParams;
  const where = buildWhere(sp);

  const [donations, purposes] = await Promise.all([
    prisma.donation.findMany({
      where,
      include: { purpose: true },
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    prisma.donationPurpose.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const exportQuery = new URLSearchParams();
  if (sp.status) exportQuery.set("status", sp.status);
  if (sp.purpose) exportQuery.set("purpose", sp.purpose);
  if (sp.from) exportQuery.set("from", sp.from);
  if (sp.to) exportQuery.set("to", sp.to);
  if (sp.q) exportQuery.set("q", sp.q);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Donations</h1>
        <a
          href={`/admin/donations/export-csv${exportQuery.toString() ? `?${exportQuery.toString()}` : ""}`}
          className="rounded border border-border bg-paper px-4 py-2 text-sm font-medium text-ink hover:bg-cream-soft"
        >
          Export CSV
        </a>
      </div>

      <form
        method="GET"
        className="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-border-soft bg-paper p-4"
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs text-ink-soft" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={sp.status ?? ""}
            className="rounded border border-border bg-cream px-2 py-1.5 text-sm text-ink"
          >
            <option value="">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-ink-soft" htmlFor="purpose">
            Purpose
          </label>
          <select
            id="purpose"
            name="purpose"
            defaultValue={sp.purpose ?? ""}
            className="rounded border border-border bg-cream px-2 py-1.5 text-sm text-ink"
          >
            <option value="">All</option>
            {purposes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.labelEn}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-ink-soft" htmlFor="from">
            From
          </label>
          <input
            id="from"
            type="date"
            name="from"
            defaultValue={sp.from ?? ""}
            className="rounded border border-border bg-cream px-2 py-1.5 text-sm text-ink"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-ink-soft" htmlFor="to">
            To
          </label>
          <input
            id="to"
            type="date"
            name="to"
            defaultValue={sp.to ?? ""}
            className="rounded border border-border bg-cream px-2 py-1.5 text-sm text-ink"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-ink-soft" htmlFor="q">
            Search
          </label>
          <input
            id="q"
            type="text"
            name="q"
            placeholder="Name, email, donation ID"
            defaultValue={sp.q ?? ""}
            className="rounded border border-border bg-cream px-2 py-1.5 text-sm text-ink"
          />
        </div>

        <button
          type="submit"
          className="rounded bg-saffron px-4 py-1.5 text-sm font-medium text-white hover:bg-saffron-dark"
        >
          Filter
        </button>
        {(sp.status || sp.purpose || sp.from || sp.to || sp.q) && (
          <Link
            href="/admin/donations"
            className="text-sm text-ink-soft underline hover:text-ink"
          >
            Clear
          </Link>
        )}
      </form>

      <div className="overflow-x-auto rounded-lg border border-border-soft bg-paper">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-border-soft bg-cream-soft text-xs uppercase text-ink-soft">
            <tr>
              <th className="px-4 py-3">Donation ID</th>
              <th className="px-4 py-3">Donor Name</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Purpose</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {donations.map((d) => (
              <tr key={d.id} className="border-b border-border-soft last:border-0">
                <td className="px-4 py-3 font-mono text-xs">{d.donationId}</td>
                <td className="px-4 py-3">{d.anonymous ? "Anonymous" : d.donorName}</td>
                <td className="px-4 py-3">{formatInr(d.amount)}</td>
                <td className="px-4 py-3">{d.purpose?.labelEn ?? "—"}</td>
                <td className="px-4 py-3">
                  <StatusPill label={d.paymentStatus} tone={statusTone(d.paymentStatus)} />
                </td>
                <td className="px-4 py-3 text-ink-soft">{formatDateTime(d.createdAt, "en")}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/donations/${d.id}`}
                    className="text-saffron hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-ink-soft">
                  No donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
