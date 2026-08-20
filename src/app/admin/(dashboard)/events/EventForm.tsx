"use client";

import Link from "next/link";
import { useState } from "react";
import { EVENT_CATEGORIES } from "@/lib/validation";

function toDatetimeLocal(d?: Date | string | null) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type EventFormDefaults = {
  slug: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  category: string;
  startDate: Date | string;
  endDate?: Date | string | null;
  venueEn?: string | null;
  venueHi?: string | null;
  bannerImage?: string | null;
  registrationUrl?: string | null;
  featured: boolean;
  published: boolean;
  isDemo: boolean;
};

export function EventForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: EventFormDefaults;
}) {
  const isEdit = !!defaultValues;
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);

  return (
    <form action={action} className="max-w-3xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Title (English)</label>
          <input
            name="titleEn"
            required
            defaultValue={defaultValues?.titleEn}
            onChange={(e) => {
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Title (Hindi)</label>
          <input
            name="titleHi"
            required
            defaultValue={defaultValues?.titleHi}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Slug</label>
        <input
          name="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          pattern="[a-z0-9-]+"
          className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-ink-faint">
          Lowercase letters, numbers and hyphens only. Auto-filled from the English title.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Description (English)</label>
          <textarea
            name="descriptionEn"
            rows={6}
            required
            defaultValue={defaultValues?.descriptionEn}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Description (Hindi)</label>
          <textarea
            name="descriptionHi"
            rows={6}
            required
            defaultValue={defaultValues?.descriptionHi}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Category</label>
          <select
            name="category"
            defaultValue={defaultValues?.category ?? EVENT_CATEGORIES[0]}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          >
            {EVENT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Start date/time</label>
          <input
            type="datetime-local"
            name="startDate"
            required
            defaultValue={toDatetimeLocal(defaultValues?.startDate)}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">End date/time (optional)</label>
          <input
            type="datetime-local"
            name="endDate"
            defaultValue={toDatetimeLocal(defaultValues?.endDate)}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Venue (English)</label>
          <input
            name="venueEn"
            defaultValue={defaultValues?.venueEn ?? ""}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Venue (Hindi)</label>
          <input
            name="venueHi"
            defaultValue={defaultValues?.venueHi ?? ""}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Banner image URL</label>
          <input
            name="bannerImage"
            defaultValue={defaultValues?.bannerImage ?? ""}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Registration URL</label>
          <input
            name="registrationUrl"
            defaultValue={defaultValues?.registrationUrl ?? ""}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="featured" defaultChecked={defaultValues?.featured} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="published" defaultChecked={defaultValues?.published} />
          Published
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="isDemo" defaultChecked={defaultValues?.isDemo} />
          Demo (placeholder) event
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="rounded-sm bg-saffron px-4 py-2 text-sm font-medium text-white">
          {isEdit ? "Save changes" : "Create event"}
        </button>
        <Link href="/admin/events" className="rounded-sm border border-border px-4 py-2 text-sm text-ink-soft">
          Cancel
        </Link>
      </div>
    </form>
  );
}
