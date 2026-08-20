"use client";

import Link from "next/link";
import { DOHA_THEMES } from "@/lib/validation";

export type DohaFormDefaults = {
  hindiText: string;
  meaningHindi: string;
  meaningEnglish: string;
  theme: string;
  audioUrl?: string | null;
  published: boolean;
  sortOrder: number;
};

export function DohaForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: DohaFormDefaults;
}) {
  const isEdit = !!defaultValues;

  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Doha (Hindi)</label>
        <textarea
          name="hindiText"
          rows={3}
          required
          defaultValue={defaultValues?.hindiText}
          className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Meaning (Hindi)</label>
        <textarea
          name="meaningHindi"
          rows={4}
          required
          defaultValue={defaultValues?.meaningHindi}
          className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Meaning (English)</label>
        <textarea
          name="meaningEnglish"
          rows={4}
          required
          defaultValue={defaultValues?.meaningEnglish}
          className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Theme</label>
          <select
            name="theme"
            defaultValue={defaultValues?.theme ?? DOHA_THEMES[0]}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          >
            {DOHA_THEMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Sort order</label>
          <input
            type="number"
            name="sortOrder"
            defaultValue={defaultValues?.sortOrder ?? 0}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Audio URL (optional)</label>
        <input
          name="audioUrl"
          defaultValue={defaultValues?.audioUrl ?? ""}
          className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" name="published" defaultChecked={defaultValues?.published ?? true} />
        Published
      </label>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="rounded-sm bg-saffron px-4 py-2 text-sm font-medium text-white">
          {isEdit ? "Save changes" : "Add doha"}
        </button>
        <Link href="/admin/dohas" className="rounded-sm border border-border px-4 py-2 text-sm text-ink-soft">
          Cancel
        </Link>
      </div>
    </form>
  );
}
