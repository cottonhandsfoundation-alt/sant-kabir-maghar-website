import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import type { AdminRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import CreateUserForm from "./create-user-form";
import UserRowActions from "./user-row-actions";

function AccessDeniedNotice() {
  return (
    <div className="rounded-sm border border-border bg-paper p-6">
      <h1 className="font-heading text-lg font-semibold text-ink">Access denied</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Admin users can only be managed by a Super Admin.
      </p>
    </div>
  );
}

export default async function AdminUsersPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (session.role !== "SUPER_ADMIN") return <AccessDeniedNotice />;

  const users = await prisma.adminUser.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-ink">Admin Users</h1>
        <p className="text-sm text-ink-soft">
          Manage who can access this admin panel and what they can do.
        </p>
      </div>

      <div className="rounded-sm border border-border bg-paper p-5">
        <h2 className="mb-4 font-heading text-base font-semibold text-ink">Add admin user</h2>
        <CreateUserForm />
      </div>

      <div className="overflow-x-auto rounded-sm border border-border bg-paper">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-border bg-cream-soft text-ink-soft">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Last login</th>
              <th className="px-4 py-3 font-medium">Role / Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-ink">
                  {u.name}
                  {u.id === session.sub ? (
                    <span className="ml-2 text-xs text-ink-faint">(you)</span>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-ink-soft">{u.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      u.active ? "bg-green/10 text-green" : "bg-ink-faint/10 text-ink-faint"
                    }`}
                  >
                    {u.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-soft">
                  {u.lastLoginAt ? u.lastLoginAt.toLocaleString("en-IN") : "Never"}
                </td>
                <td className="px-4 py-3">
                  <UserRowActions
                    userId={u.id}
                    active={u.active}
                    role={u.role as AdminRole}
                    isSelf={u.id === session.sub}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
