"use client";

/**
 * Tiny client island: a <select> that auto-submits its wrapping <form> on
 * change. Used for inline status changes in tables (enquiries, volunteers)
 * so the row doesn't need a separate "Save" button. The actual mutation is
 * a server action bound as the form's action — this component has no
 * knowledge of what it updates, it only triggers the submit.
 */
export function StatusSelect({
  name,
  defaultValue,
  options,
  className,
}: {
  name: string;
  defaultValue: string;
  options: readonly string[];
  className?: string;
}) {
  return (
    <select
      name={name}
      defaultValue={defaultValue}
      onChange={(e) => e.currentTarget.form?.requestSubmit()}
      className={
        className ??
        "rounded border border-border bg-paper px-2 py-1 text-sm text-ink"
      }
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
