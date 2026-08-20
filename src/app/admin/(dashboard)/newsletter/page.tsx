import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatDateTime } from "@/lib/utils";
import { StatusPill } from "../_shared/StatusPill";
import { manuallyUnsubscribe } from "./actions";
import type { Prisma } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

const STATUSES = ["ACTIVE", "UNSUBSCRIBED"] as const;

export default async function NewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
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

  const where: Prisma.NewsletterSubscriberWhereInput = {};
  if (sp.status) where.status = sp.status;

  const [subscribers, activeCount] = await Promise.all([
    prisma.newsletterSubscriber.findMany({
      where,
      orderBy: { subscribedAt: "desc" },
      take: 500,
    }),
    prisma.newsletterSubscriber.count({ where: { status: "ACTIVE" } }),
  ]);

  const exportQuery = new URLSearchParams();
  if (sp.status) exportQuery.set("status", sp.status);

  return (
    <div className="p-8">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Newsletter Subscribers</h1>
        <a
          href={`/admin/newsletter/export-csv${exportQuery.toString() ? `?${exportQuery.toString()}` : ""}`}
          className="rounded border border-border bg-paper px-4 py-2 text-sm font-medium text-ink hover:bg-cream-soft"
        >
          Export CSV
        </a>
      </div>
      <p className="mb-6 text-sm text-ink-soft">
        {activeCount} active subscriber{activeCount === 1 ? "" : "s"}
      </p>

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

        <button
          type="submit"
          className="rounded bg-saffron px-4 py-1.5 text-sm font-medium text-white hover:bg-saffron-dark"
        >
          Filter
        </button>
        {sp.status && (
          <Link
            href="/admin/newsletter"
            className="text-sm text-ink-soft underline hover:text-ink"
          >
            Clear
          </Link>
        )}
      </form>

      <div className="overflow-x-auto rounded-lg border border-border-soft bg-paper">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="border-b border-border-soft bg-cream-soft text-xs uppercase text-ink-soft">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Subscribed At</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s.id} className="border-b border-border-soft last:border-0">
                <td className="px-4 py-3">{s.name ?? "—"}</td>
                <td className="px-4 py-3">{s.email}</td>
                <td className="px-4 py-3">
                  <StatusPill
                    label={s.status}
                    tone={s.status === "ACTIVE" ? "green" : "maroon"}
                  />
                </td>
                <td className="px-4 py-3 text-ink-soft">
                  {formatDateTime(s.subscribedAt, "en")}
                </td>
                <td className="px-4 py-3">
                  {s.status === "ACTIVE" && (
                    <form action={manuallyUnsubscribe}>
                      <input type="hidden" name="id" value={s.id} />
                      <button
                        type="submit"
                        className="rounded border border-border px-3 py-1 text-xs font-medium text-maroon hover:bg-cream-soft"
                      >
                        Unsubscribe
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-soft">
                  No subscribers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
