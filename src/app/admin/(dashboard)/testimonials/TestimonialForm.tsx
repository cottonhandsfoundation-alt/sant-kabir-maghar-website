"use client";

import Link from "next/link";
export type TestimonialFormDefaults = {
  name: string;
  roleEn?: string | null;
  roleHi?: string | null;
  messageEn: string;
  messageHi: string;
  published: boolean;
  sortOrder: number;
};

export function TestimonialForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: TestimonialFormDefaults;
}) {
  const isEdit = !!defaultValues;

  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Name</label>
        <input
          name="name"
          required
          defaultValue={defaultValues?.name}
          className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Role (English, optional)</label>
          <input
            name="roleEn"
            defaultValue={defaultValues?.roleEn ?? ""}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Role (Hindi, optional)</label>
          <input
            name="roleHi"
            defaultValue={defaultValues?.roleHi ?? ""}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Message (English)</label>
          <textarea
            name="messageEn"
            rows={4}
            required
            defaultValue={defaultValues?.messageEn}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Message (Hindi)</label>
          <textarea
            name="messageHi"
            rows={4}
            required
            defaultValue={defaultValues?.messageHi}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Sort order</label>
          <input
            type="number"
            name="sortOrder"
            defaultValue={defaultValues?.sortOrder ?? 0}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" name="published" defaultChecked={defaultValues?.published} />
            Published
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="rounded-sm bg-saffron px-4 py-2 text-sm font-medium text-white">
          {isEdit ? "Save changes" : "Add testimonial"}
        </button>
        <Link
          href="/admin/testimonials"
          className="rounded-sm border border-border px-4 py-2 text-sm text-ink-soft"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
