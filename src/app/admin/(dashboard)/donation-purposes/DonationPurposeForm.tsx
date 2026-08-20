"use client";

import Link from "next/link";
export type DonationPurposeFormDefaults = {
  key: string;
  labelEn: string;
  labelHi: string;
  active: boolean;
  sortOrder: number;
};

export function DonationPurposeForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: DonationPurposeFormDefaults;
}) {
  const isEdit = !!defaultValues;

  return (
    <form action={action} className="max-w-xl space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Key</label>
        <input
          name="key"
          required
          pattern="[a-z0-9_-]+"
          defaultValue={defaultValues?.key}
          readOnly={isEdit}
          aria-readonly={isEdit}
          className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm read-only:bg-cream-soft read-only:text-ink-faint"
        />
        <p className="mt-1 text-xs text-ink-faint">
          Lowercase letters, numbers, hyphens and underscores only.{" "}
          {isEdit && "Cannot be changed after creation — the public donation form and existing donations reference it."}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Label (English)</label>
          <input
            name="labelEn"
            required
            defaultValue={defaultValues?.labelEn}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Label (Hindi)</label>
          <input
            name="labelHi"
            required
            defaultValue={defaultValues?.labelHi}
            className="w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>
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

      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" name="active" defaultChecked={defaultValues?.active ?? true} />
        Active (shown on the public donation form)
      </label>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="rounded-sm bg-saffron px-4 py-2 text-sm font-medium text-white">
          {isEdit ? "Save changes" : "Create purpose"}
        </button>
        <Link
          href="/admin/donation-purposes"
          className="rounded-sm border border-border px-4 py-2 text-sm text-ink-soft"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
