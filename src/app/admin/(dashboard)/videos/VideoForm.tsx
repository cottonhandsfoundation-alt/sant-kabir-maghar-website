"use client";

import Link from "next/link";
const VIDEO_CATEGORIES = ["SATSANG", "PRAVACHAN", "EVENT", "MESSAGE"] as const;

export type VideoFormDefaults = {
  titleEn: string;
  titleHi: string;
  youtubeId: string;
  category: string;
  descriptionEn?: string | null;
  descriptionHi?: string | null;
  featured: boolean;
  published: boolean;
};

export function VideoForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: VideoFormDefaults;
}) {
  const isEdit = !!defaultValues;

  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Title (English)</label>
          <input
            name="titleEn"
            required
            defaultValue={defaultValues?.titleEn}
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
        <label className="mb-1 block text-sm font-medium text-ink">YouTube video ID</label>
        <input
          name="youtubeId"
          required
          defaultValue={defaultValues?.youtubeId}
          className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-ink-faint">
          Just the video ID, e.g. dQw4w9WgXcQ — not the full URL.
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Category</label>
        <select
          name="category"
          defaultValue={defaultValues?.category ?? VIDEO_CATEGORIES[0]}
          className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
        >
          {VIDEO_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Description (English)</label>
          <textarea
            name="descriptionEn"
            rows={4}
            defaultValue={defaultValues?.descriptionEn ?? ""}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Description (Hindi)</label>
          <textarea
            name="descriptionHi"
            rows={4}
            defaultValue={defaultValues?.descriptionHi ?? ""}
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
          <input type="checkbox" name="published" defaultChecked={defaultValues?.published ?? true} />
          Published
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="rounded-sm bg-saffron px-4 py-2 text-sm font-medium text-white">
          {isEdit ? "Save changes" : "Add video"}
        </button>
        <Link href="/admin/videos" className="rounded-sm border border-border px-4 py-2 text-sm text-ink-soft">
          Cancel
        </Link>
      </div>
    </form>
  );
}
