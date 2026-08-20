"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { SITE_SETTING_DEFAULTS, setSiteSetting, type SiteSettingKey } from "@/lib/settings";

export type UpdateSettingsState = { success?: boolean; error?: string } | undefined;

// NOTE: SITE_SETTING_DEFAULTS is intentionally all non-secret organisational
// content. Payment gateway keys, webhook secrets, SMTP credentials, etc. must
// NEVER be added to the SiteSetting table — those live only in environment
// variables (see .env.example / src/lib/db.ts adapter config).
export async function updateSettings(
  prevState: UpdateSettingsState,
  formData: FormData
): Promise<UpdateSettingsState> {
  // Never trust the page-level role check alone — re-verify here.
  const session = await requireAdmin(["SUPER_ADMIN"]);
  if (!session) {
    return { error: "You do not have permission to update settings." };
  }

  const knownKeys = Object.keys(SITE_SETTING_DEFAULTS) as SiteSettingKey[];

  await Promise.all(
    knownKeys.map((key) => {
      const raw = formData.get(key);
      if (raw === null) return Promise.resolve();
      return setSiteSetting(key, String(raw));
    })
  );

  revalidatePath("/admin/settings");
  return { success: true };
}
