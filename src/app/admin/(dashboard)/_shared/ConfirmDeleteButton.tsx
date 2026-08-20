"use client";

/**
 * Submit button for a per-row delete `<form action={deleteX.bind(null, id)}>`.
 * Wraps the native `confirm()` dialog since a server action itself can't
 * call browser APIs. Shared across all content-CRUD sections owned by this
 * agent — do not duplicate per section.
 */
export function ConfirmDeleteButton({
  label = "Delete",
  confirmMessage = "Delete this item? This cannot be undone.",
}: {
  label?: string;
  confirmMessage?: string;
}) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
      className="rounded-sm border border-border px-2 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-saffron hover:text-saffron"
    >
      {label}
    </button>
  );
}
