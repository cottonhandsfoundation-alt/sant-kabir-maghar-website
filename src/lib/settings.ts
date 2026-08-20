import "server-only";
import { prisma } from "@/lib/db";

/**
 * Defaults for every editable organisational setting. These are intentionally
 * generic placeholders — see CONTENT_REQUIRED.md. An administrator replaces
 * them from /admin/settings; nothing here is presented on the public site as
 * verified fact.
 */
export const SITE_SETTING_DEFAULTS = {
  org_name_en: "Sant Kabir Trust",
  org_name_hi: "संत कबीर ट्रस्ट",
  org_tagline_en: "Maghar, Sant Kabir Nagar, Uttar Pradesh",
  org_tagline_hi: "मगहर, संत कबीर नगर, उत्तर प्रदेश",
  org_address_en: "PLACEHOLDER — Maghar, Sant Kabir Nagar, Uttar Pradesh, India",
  org_address_hi: "प्लेसहोल्डर — मगहर, संत कबीर नगर, उत्तर प्रदेश, भारत",
  org_phone: "PLACEHOLDER — REPLACE WITH VERIFIED PHONE NUMBER",
  org_email: "PLACEHOLDER — REPLACE WITH VERIFIED EMAIL ADDRESS",
  org_whatsapp: "",
  org_registration_number: "",
  org_pan: "",
  org_80g_status: "not_verified", // "not_verified" | "eligible" | "not_eligible"
  org_80g_number: "",
  org_12a_number: "",
  org_fcra_number: "",
  social_youtube: "",
  social_facebook: "",
  social_instagram: "",
  social_twitter: "",
  social_whatsapp_channel: "",
  maps_embed_url:
    "https://www.google.com/maps?q=Maghar,+Sant+Kabir+Nagar,+Uttar+Pradesh&output=embed",
  maps_place_url: "https://www.google.com/maps?q=Maghar,+Sant+Kabir+Nagar,+Uttar+Pradesh",
  seo_default_title_en: "Sant Kabir Ji & Maghar — Humanity, Equality, Harmony",
  seo_default_title_hi: "संत कबीर जी और मगहर — मानवता, समानता, सद्भाव",
  seo_default_description_en:
    "Learn about Sant Kabir Ji's teachings, the sacred site of Maghar, and the contemporary spiritual community associated with Mahant Vichar Das Ji.",
  seo_default_description_hi:
    "संत कबीर जी की शिक्षाओं, मगहर के पवित्र स्थल और महंत विचार दास जी से जुड़ी समकालीन आध्यात्मिक परंपरा के बारे में जानें।",
  footer_text_en: "",
  footer_text_hi: "",
  analytics_ga_id: "",
  analytics_meta_pixel_id: "",
} as const;

export type SiteSettingKey = keyof typeof SITE_SETTING_DEFAULTS;

export async function getSiteSettings(): Promise<
  Record<SiteSettingKey, string>
> {
  const rows = await prisma.siteSetting.findMany();
  const map = new Map(rows.map((r) => [r.key, r.value]));

  const result = {} as Record<SiteSettingKey, string>;
  for (const key of Object.keys(SITE_SETTING_DEFAULTS) as SiteSettingKey[]) {
    result[key] = map.get(key) ?? SITE_SETTING_DEFAULTS[key];
  }
  return result;
}

export async function getSiteSetting(key: SiteSettingKey): Promise<string> {
  const row = await prisma.siteSetting.findUnique({ where: { key } });
  return row?.value ?? SITE_SETTING_DEFAULTS[key];
}

export async function setSiteSetting(key: string, value: string) {
  return prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}
