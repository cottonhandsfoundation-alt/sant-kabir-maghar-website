"use client";

import { useActionState } from "react";
import { updateSettings } from "./actions";
import type { SiteSettingKey } from "@/lib/settings";

type FieldKind = "text" | "textarea" | "select";

type FieldDef = {
  key: SiteSettingKey;
  label: string;
  kind?: FieldKind;
  options?: { value: string; label: string }[];
};

type SectionDef = {
  title: string;
  fields: FieldDef[];
};

const SECTIONS: SectionDef[] = [
  {
    title: "Organisation Details",
    fields: [
      { key: "org_name_en", label: "Organisation Name (English)" },
      { key: "org_name_hi", label: "Organisation Name (Hindi)" },
      { key: "org_tagline_en", label: "Tagline (English)" },
      { key: "org_tagline_hi", label: "Tagline (Hindi)" },
      { key: "org_address_en", label: "Address (English)", kind: "textarea" },
      { key: "org_address_hi", label: "Address (Hindi)", kind: "textarea" },
    ],
  },
  {
    title: "Contact",
    fields: [
      { key: "org_phone", label: "Phone Number" },
      { key: "org_email", label: "Email Address" },
      { key: "org_whatsapp", label: "WhatsApp Number" },
    ],
  },
  {
    title: "Social Links",
    fields: [
      { key: "social_youtube", label: "YouTube URL" },
      { key: "social_facebook", label: "Facebook URL" },
      { key: "social_instagram", label: "Instagram URL" },
      { key: "social_twitter", label: "Twitter / X URL" },
      { key: "social_whatsapp_channel", label: "WhatsApp Channel URL" },
    ],
  },
  {
    title: "Google Maps",
    fields: [
      { key: "maps_embed_url", label: "Maps Embed URL", kind: "textarea" },
      { key: "maps_place_url", label: "Maps Place URL" },
    ],
  },
  {
    title: "SEO Defaults",
    fields: [
      { key: "seo_default_title_en", label: "Default SEO Title (English)" },
      { key: "seo_default_title_hi", label: "Default SEO Title (Hindi)" },
      {
        key: "seo_default_description_en",
        label: "Default SEO Description (English)",
        kind: "textarea",
      },
      {
        key: "seo_default_description_hi",
        label: "Default SEO Description (Hindi)",
        kind: "textarea",
      },
    ],
  },
  {
    title: "Tax / Registration",
    fields: [
      { key: "org_registration_number", label: "Registration Number" },
      { key: "org_pan", label: "PAN" },
      {
        key: "org_80g_status",
        label: "80G Status",
        kind: "select",
        options: [
          { value: "not_verified", label: "Not verified" },
          { value: "eligible", label: "Eligible" },
          { value: "not_eligible", label: "Not eligible" },
        ],
      },
      { key: "org_80g_number", label: "80G Number" },
      { key: "org_12a_number", label: "12A Number" },
      { key: "org_fcra_number", label: "FCRA Number" },
    ],
  },
  {
    title: "Footer",
    fields: [
      { key: "footer_text_en", label: "Footer Text (English)", kind: "textarea" },
      { key: "footer_text_hi", label: "Footer Text (Hindi)", kind: "textarea" },
    ],
  },
  {
    title: "Analytics",
    fields: [
      { key: "analytics_ga_id", label: "Google Analytics ID" },
      { key: "analytics_meta_pixel_id", label: "Meta Pixel ID" },
    ],
  },
];

const inputClass =
  "w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm focus:border-saffron focus:outline-none";

export default function SettingsForm({
  values,
}: {
  values: Record<SiteSettingKey, string>;
}) {
  const [state, formAction, isPending] = useActionState(updateSettings, undefined);

  return (
    <form action={formAction} className="space-y-8">
      {SECTIONS.map((section) => (
        <fieldset key={section.title} className="rounded-sm border border-border bg-paper p-5">
          <legend className="px-1 font-heading text-base font-semibold text-ink">
            {section.title}
          </legend>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {section.fields.map((field) => (
              <div key={field.key} className={field.kind === "textarea" ? "sm:col-span-2" : ""}>
                <label htmlFor={field.key} className="mb-1 block text-sm font-medium text-ink">
                  {field.label}
                </label>
                {field.kind === "select" ? (
                  <select
                    id={field.key}
                    name={field.key}
                    defaultValue={values[field.key]}
                    className={inputClass}
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : field.kind === "textarea" ? (
                  <textarea
                    id={field.key}
                    name={field.key}
                    defaultValue={values[field.key]}
                    rows={3}
                    className={inputClass}
                  />
                ) : (
                  <input
                    id={field.key}
                    name={field.key}
                    type="text"
                    defaultValue={values[field.key]}
                    className={inputClass}
                  />
                )}
              </div>
            ))}
          </div>
        </fieldset>
      ))}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-sm bg-saffron px-5 py-2.5 font-medium text-cream transition hover:bg-saffron-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving…" : "Save settings"}
        </button>
        {state?.success ? (
          <span className="text-sm text-green">Settings saved.</span>
        ) : null}
        {state?.error ? (
          <span className="text-sm text-saffron-dark">{state.error}</span>
        ) : null}
      </div>
    </form>
  );
}
