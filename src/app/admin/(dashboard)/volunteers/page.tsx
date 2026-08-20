import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatDateTime } from "@/lib/utils";
import { StatusPill } from "../_shared/StatusPill";
import { StatusSelect } from "../_shared/StatusSelect";
import { updateVolunteerStatus } from "./actions";
import type { Prisma } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

const STATUSES = ["NEW", "CONTACTED", "ACTIVE", "INACTIVE"] as const;

function statusTone(status: string) {
  if (status === "ACTIVE") return "green" as const;
  if (status === "INACTIVE") return "maroon" as const;
  if (status === "CONTACTED") return "gold" as const;
  return "saffron" as const; // NEW
}

export default async function VolunteersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; city?: string }>;
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

  const where: Prisma.VolunteerApplicationWhereInput = {};
  if (sp.status) where.status = sp.status;
  if (sp.city) where.city = { contains: sp.city };

  const volunteers = await prisma.volunteerApplication.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 300,
  });

  return (
    <div className="p-8">
      <h1 className="mb-6 text-xl font-semibold">Volunteers</h1>

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
          <label className="text-xs text-ink-soft" htmlFor="city">
            City
          </label>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="Search city"
            defaultValue={sp.city ?? ""}
            className="rounded border border-border bg-cream px-2 py-1.5 text-sm text-ink"
          />
        </div>

        <button
          type="submit"
          className="rounded bg-saffron px-4 py-1.5 text-sm font-medium text-white hover:bg-saffron-dark"
        >
          Filter
        </button>
        {(sp.status || sp.city) && (
          <Link
            href="/admin/volunteers"
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
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Mobile / Email</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Area of Interest</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((v) => (
              <tr key={v.id} className="border-b border-border-soft align-top last:border-0">
                <td className="px-4 py-3">{v.name}</td>
                <td className="px-4 py-3">
                  <div>{v.mobile}</div>
                  <div className="text-ink-soft">{v.email}</div>
                </td>
                <td className="px-4 py-3">{v.city}</td>
                <td className="px-4 py-3">{v.areaOfInterest}</td>
                <td className="px-4 py-3">{v.availability ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="mb-1">
                    <StatusPill label={v.status} tone={statusTone(v.status)} />
                  </div>
                  <form action={updateVolunteerStatus}>
                    <input type="hidden" name="id" value={v.id} />
                    <StatusSelect name="status" defaultValue={v.status} options={STATUSES} />
                  </form>
                </td>
                <td className="px-4 py-3 text-ink-soft">{formatDateTime(v.createdAt, "en")}</td>
              </tr>
            ))}
            {volunteers.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-ink-soft">
                  No volunteer applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
