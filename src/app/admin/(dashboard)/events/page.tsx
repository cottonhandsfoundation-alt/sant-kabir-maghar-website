import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { ConfirmDeleteButton } from "../_shared/ConfirmDeleteButton";
import { deleteEvent, toggleEventPublished } from "./actions";

const ALLOWED_ROLES = ["SUPER_ADMIN", "EVENT_MANAGER"];

export default async function EventsPage() {
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

  const events = await prisma.event.findMany({ orderBy: { startDate: "desc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink">Events</h1>
        <Link
          href="/admin/events/new"
          className="rounded-sm bg-saffron px-4 py-2 text-sm font-medium text-white"
        >
          + New Event
        </Link>
      </div>

      <div className="overflow-x-auto rounded-sm border border-border-soft bg-paper">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-ink-soft">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Start date</th>
              <th className="px-3 py-2">Featured</th>
              <th className="px-3 py-2">Published</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((row) => (
              <tr key={row.id} className="border-b border-border-soft">
                <td className="px-3 py-2 text-ink">{row.titleEn}</td>
                <td className="px-3 py-2 text-ink-soft">{row.category}</td>
                <td className="px-3 py-2 text-ink-soft">
                  {row.startDate.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                </td>
                <td className="px-3 py-2">
                  {row.featured ? (
                    <span className="rounded-full bg-saffron px-2 py-0.5 text-xs text-white">Featured</span>
                  ) : (
                    <span className="text-xs text-ink-faint">—</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  <form action={toggleEventPublished.bind(null, row.id)}>
                    <button
                      type="submit"
                      className={`rounded-full px-2 py-0.5 text-xs text-white ${
                        row.published ? "bg-green" : "bg-ink-faint"
                      }`}
                    >
                      {row.published ? "Published" : "Draft"}
                    </button>
                  </form>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/events/${row.id}`}
                      className="rounded-sm border border-border px-2 py-1 text-xs font-medium text-ink-soft hover:border-saffron hover:text-saffron"
                    >
                      Edit
                    </Link>
                    <form action={deleteEvent.bind(null, row.id)}>
                      <ConfirmDeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-ink-faint">
                  No events yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
