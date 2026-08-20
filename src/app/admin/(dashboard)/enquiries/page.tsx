import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatDateTime } from "@/lib/utils";
import { StatusPill } from "../_shared/StatusPill";
import { StatusSelect } from "../_shared/StatusSelect";
import { updateEnquiryStatus } from "./actions";
import type { Prisma } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

const TYPES = ["GENERAL", "VISIT", "DONATION", "VOLUNTEER"] as const;
const STATUSES = ["NEW", "IN_PROGRESS", "RESOLVED"] as const;

function statusTone(status: string) {
  if (status === "RESOLVED") return "green" as const;
  if (status === "IN_PROGRESS") return "gold" as const;
  return "saffron" as const; // NEW
}

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; type?: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const allowed = ["SUPER_ADMIN", "CONTENT_MANAGER"];
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

  const where: Prisma.ContactEnquiryWhereInput = {};
  if (sp.status) where.status = sp.status;
  if (sp.type) where.type = sp.type;

  const enquiries = await prisma.contactEnquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 300,
  });

  return (
    <div className="p-8">
      <h1 className="mb-6 text-xl font-semibold">Enquiries</h1>

      <form
        method="GET"
        className="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-border-soft bg-paper p-4"
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs text-ink-soft" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            name="type"
            defaultValue={sp.type ?? ""}
            className="rounded border border-border bg-cream px-2 py-1.5 text-sm text-ink"
          >
            <option value="">All</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

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

        <button
          type="submit"
          className="rounded bg-saffron px-4 py-1.5 text-sm font-medium text-white hover:bg-saffron-dark"
        >
          Filter
        </button>
        {(sp.status || sp.type) && (
          <Link
            href="/admin/enquiries"
            className="text-sm text-ink-soft underline hover:text-ink"
          >
            Clear
          </Link>
        )}
      </form>

      <div className="overflow-x-auto rounded-lg border border-border-soft bg-paper">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="border-b border-border-soft bg-cream-soft text-xs uppercase text-ink-soft">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email / Phone</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((e) => (
              <tr key={e.id} className="border-b border-border-soft align-top last:border-0">
                <td className="px-4 py-3">
                  <StatusPill label={e.type} tone="saffron" />
                </td>
                <td className="px-4 py-3">{e.name}</td>
                <td className="px-4 py-3">
                  <div>{e.email}</div>
                  {e.phone && <div className="text-ink-soft">{e.phone}</div>}
                </td>
                <td className="px-4 py-3">{e.subject ?? "—"}</td>
                <td className="px-4 py-3 max-w-xs">
                  {e.message.length > 80 ? (
                    <details>
                      <summary className="cursor-pointer">{e.message.slice(0, 80)}…</summary>
                      <p className="mt-1 whitespace-pre-wrap text-ink-soft">{e.message}</p>
                    </details>
                  ) : (
                    e.message
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="mb-1">
                    <StatusPill label={e.status} tone={statusTone(e.status)} />
                  </div>
                  <form action={updateEnquiryStatus}>
                    <input type="hidden" name="id" value={e.id} />
                    <StatusSelect name="status" defaultValue={e.status} options={STATUSES} />
                  </form>
                </td>
                <td className="px-4 py-3 text-ink-soft">{formatDateTime(e.createdAt, "en")}</td>
              </tr>
            ))}
            {enquiries.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-ink-soft">
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
