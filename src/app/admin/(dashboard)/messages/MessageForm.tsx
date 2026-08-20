"use client";

import Link from "next/link";
const MESSAGE_CATEGORIES = ["MESSAGE", "PRAVACHAN", "ANNOUNCEMENT"] as const;

function toDateInput(d?: Date | string | null) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export type MessageFormDefaults = {
  titleEn: string;
  titleHi: string;
  bodyEn: string;
  bodyHi: string;
  category: string;
  coverImage?: string | null;
  videoUrl?: string | null;
  eventDate?: Date | string | null;
  featured: boolean;
  published: boolean;
};

export function MessageForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: MessageFormDefaults;
}) {
  const isEdit = !!defaultValues;

  return (
    <form action={action} className="max-w-3xl space-y-5">
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Body (English)</label>
          <textarea
            name="bodyEn"
            rows={10}
            required
            defaultValue={defaultValues?.bodyEn}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Body (Hindi)</label>
          <textarea
            name="bodyHi"
            rows={10}
            required
            defaultValue={defaultValues?.bodyHi}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Category</label>
          <select
            name="category"
            defaultValue={defaultValues?.category ?? MESSAGE_CATEGORIES[0]}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          >
            {MESSAGE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Event date (optional)</label>
          <input
            type="date"
            name="eventDate"
            defaultValue={toDateInput(defaultValues?.eventDate)}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Cover image URL</label>
          <input
            name="coverImage"
            defaultValue={defaultValues?.coverImage ?? ""}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Video URL</label>
          <input
            name="videoUrl"
            defaultValue={defaultValues?.videoUrl ?? ""}
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
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="rounded-sm bg-saffron px-4 py-2 text-sm font-medium text-white">
          {isEdit ? "Save changes" : "Create message"}
        </button>
        <Link href="/admin/messages" className="rounded-sm border border-border px-4 py-2 text-sm text-ink-soft">
          Cancel
        </Link>
      </div>
    </form>
  );
}
