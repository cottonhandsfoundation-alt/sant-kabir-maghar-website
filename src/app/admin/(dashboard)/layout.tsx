import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

// Guards EVERY route nested under (dashboard) — individual pages don't need
// to re-check "is anyone logged in". They SHOULD still check role-specific
// access themselves (see ADMIN_NAV_ITEMS roles) for stricter per-section
// permissions, since this layout only requires *some* valid admin session.
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell session={{ email: session.email, role: session.role }}>
      {children}
    </AdminShell>
  );
}
