"use client";

import Link from "next/link";
import { useState } from "react";
import { MEDIA_CATEGORIES } from "@/lib/validation";

export type GalleryFormDefaults = {
  type: string;
  url: string;
  thumbnailUrl?: string | null;
  captionEn?: string | null;
  captionHi?: string | null;
  category: string;
  eventId?: string | null;
  sourceUrl?: string | null;
  creator?: string | null;
  license?: string | null;
  attributionRequired: boolean;
  attributionText?: string | null;
  published: boolean;
};

export function GalleryForm({
  action,
  defaultValues,
  events,
}: {
  action: (formData: FormData) => void;
  defaultValues?: GalleryFormDefaults;
  events: { id: string; titleEn: string }[];
}) {
  const isEdit = !!defaultValues;
  const [attributionRequired, setAttributionRequired] = useState(
    defaultValues?.attributionRequired ?? false
  );

  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Type</label>
          <select
            name="type"
            defaultValue={defaultValues?.type ?? "IMAGE"}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          >
            <option value="IMAGE">IMAGE</option>
            <option value="VIDEO">VIDEO</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Category</label>
          <select
            name="category"
            defaultValue={defaultValues?.category ?? MEDIA_CATEGORIES[0]}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          >
            {MEDIA_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Asset URL</label>
        <input
          name="url"
          required
          defaultValue={defaultValues?.url}
          className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Thumbnail URL (optional)</label>
        <input
          name="thumbnailUrl"
          defaultValue={defaultValues?.thumbnailUrl ?? ""}
          className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Caption (English)</label>
          <input
            name="captionEn"
            defaultValue={defaultValues?.captionEn ?? ""}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Caption (Hindi)</label>
          <input
            name="captionHi"
            defaultValue={defaultValues?.captionHi ?? ""}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Linked event (optional)</label>
        <select
          name="eventId"
          defaultValue={defaultValues?.eventId ?? ""}
          className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
        >
          <option value="">— none —</option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.titleEn}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Source URL</label>
          <input
            name="sourceUrl"
            defaultValue={defaultValues?.sourceUrl ?? ""}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Creator</label>
          <input
            name="creator"
            defaultValue={defaultValues?.creator ?? ""}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">License</label>
        <input
          name="license"
          defaultValue={defaultValues?.license ?? ""}
          className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="attributionRequired"
            checked={attributionRequired}
            onChange={(e) => setAttributionRequired(e.target.checked)}
          />
          Attribution required
        </label>
      </div>

      {attributionRequired && (
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Attribution text</label>
          <input
            name="attributionText"
            defaultValue={defaultValues?.attributionText ?? ""}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
      )}

      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" name="published" defaultChecked={defaultValues?.published ?? true} />
        Published
      </label>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="rounded-sm bg-saffron px-4 py-2 text-sm font-medium text-white">
          {isEdit ? "Save changes" : "Add media"}
        </button>
        <Link href="/admin/gallery" className="rounded-sm border border-border px-4 py-2 text-sm text-ink-soft">
          Cancel
        </Link>
      </div>
    </form>
  );
}
