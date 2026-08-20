import { cn } from "@/lib/utils";

/**
 * Tasteful placeholder for a portrait that cannot yet be sourced with
 * confirmed usage rights (see IMAGE_SOURCES.md — no reusable high-resolution
 * photograph of Mahant Vichar Das Ji was found during research). Renders an
 * abstract, dignified monogram treatment rather than a fake photograph.
 * Swap for a real photo via the admin panel once an official portrait with
 * clear permission is available — this component takes no props tied to any
 * specific person so it can be reused anywhere a portrait is pending.
 */
export function PortraitPlaceholder({
  initials,
  label,
  className,
}: {
  initials: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-sm border border-border-soft bg-gradient-to-b from-cream-deep to-gold-pale",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--color-gold) 0, var(--color-gold) 1px, transparent 1px, transparent 16px)",
        }}
      />
      <span className="font-heading text-6xl font-semibold text-gold">{initials}</span>
      <span className="mt-4 max-w-[75%] text-center font-body text-xs leading-snug text-ink-faint">
        {label}
      </span>
    </div>
  );
}
