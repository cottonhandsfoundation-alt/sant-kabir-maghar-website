import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getSiteSettings } from "@/lib/settings";
import SettingsForm from "./settings-form";

function AccessDeniedNotice() {
  return (
    <div className="rounded-sm border border-border bg-paper p-6">
      <h1 className="font-heading text-lg font-semibold text-ink">Access denied</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Site settings can only be edited by a Super Admin.
      </p>
    </div>
  );
}

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (session.role !== "SUPER_ADMIN") return <AccessDeniedNotice />;

  const values = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-ink">Site Settings</h1>
        <p className="text-sm text-ink-soft">
          Organisation details shown across the public site. Payment gateway and SMTP secrets
          are managed only via environment variables and never appear here.
        </p>
      </div>
      <SettingsForm values={values} />
    </div>
  );
}
