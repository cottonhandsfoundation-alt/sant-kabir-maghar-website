import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { ConfirmDeleteButton } from "../_shared/ConfirmDeleteButton";
import { deleteDonationPurpose, toggleDonationPurposeActive } from "./actions";

const ALLOWED_ROLES = ["SUPER_ADMIN", "DONATION_MANAGER"];

export default async function DonationPurposesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (!ALLOWED_ROLES.includes(session.role)) {
    return (
      <div className="p-8">
        <p className="text-lg font-semibold">Access denied</p>
        <p className="text-sm text-ink-soft">
          Your role ({session.role}) does not have access to this section.
        </p>
      </div>
    );
  }

  const purposes = await prisma.donationPurpose.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink">Donation Purposes</h1>
        <Link
          href="/admin/donation-purposes/new"
          className="rounded-sm bg-saffron px-4 py-2 text-sm font-medium text-white"
        >
          + New Purpose
        </Link>
      </div>

      <div className="overflow-x-auto rounded-sm border border-border-soft bg-paper">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-ink-soft">
            <tr>
              <th className="px-3 py-2">Key</th>
              <th className="px-3 py-2">Label (English)</th>
              <th className="px-3 py-2">Label (Hindi)</th>
              <th className="px-3 py-2">Sort</th>
              <th className="px-3 py-2">Active</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {purposes.map((row) => (
              <tr key={row.id} className="border-b border-border-soft">
                <td className="px-3 py-2 font-mono text-xs text-ink">{row.key}</td>
                <td className="px-3 py-2 text-ink-soft">{row.labelEn}</td>
                <td className="px-3 py-2 text-ink-soft">{row.labelHi}</td>
                <td className="px-3 py-2 text-ink-soft">{row.sortOrder}</td>
                <td className="px-3 py-2">
                  <form action={toggleDonationPurposeActive.bind(null, row.id)}>
                    <button
                      type="submit"
                      className={`rounded-full px-2 py-0.5 text-xs text-white ${
                        row.active ? "bg-green" : "bg-ink-faint"
                      }`}
                    >
                      {row.active ? "Active" : "Inactive"}
                    </button>
                  </form>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/donation-purposes/${row.id}`}
                      className="rounded-sm border border-border px-2 py-1 text-xs font-medium text-ink-soft hover:border-saffron hover:text-saffron"
                    >
                      Edit
                    </Link>
                    <form action={deleteDonationPurpose.bind(null, row.id)}>
                      <ConfirmDeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {purposes.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-ink-faint">
                  No donation purposes yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
