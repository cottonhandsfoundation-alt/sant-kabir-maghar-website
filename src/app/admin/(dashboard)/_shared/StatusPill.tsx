/**
 * Small colored pill for status/type fields. Not a client component — pure
 * presentational server-renderable markup. `tone` maps to the project's
 * warm palette tokens; callers pass whichever tone fits their status value.
 */
export function StatusPill({
  label,
  tone,
}: {
  label: string;
  tone: "green" | "maroon" | "gold" | "saffron" | "ink-soft";
}) {
  const toneClass =
    tone === "green"
      ? "bg-green"
      : tone === "maroon"
        ? "bg-maroon"
        : tone === "gold"
          ? "bg-gold"
          : tone === "saffron"
            ? "bg-saffron"
            : "bg-ink-soft";

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${toneClass}`}
    >
      {label}
    </span>
  );
}
