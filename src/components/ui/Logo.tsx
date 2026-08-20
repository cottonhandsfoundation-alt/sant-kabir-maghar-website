import { getTranslations } from "next-intl/server";

/**
 * Tasteful original wordmark — NOT an official logo (none could be verified
 * as authorised for use; see IMAGE_SOURCES.md). The mark is a simple
 * abstract lotus/flame motif referencing devotion and the Maghar tradition,
 * built entirely from inline SVG so it stays crisp at any size and needs no
 * external asset. Replace via the admin Settings page once an official mark
 * is confirmed.
 */
export async function Logo({ size = "default" }: { size?: "default" | "large" }) {
  const t = await getTranslations("Meta");
  const dimension = size === "large" ? 44 : 34;

  return (
    <span className="flex items-center gap-2.5">
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="24" cy="24" r="23" stroke="var(--color-gold)" strokeWidth="1" />
        <path
          d="M24 10c3 4 3 7 0 10-3-3-3-6 0-10Z"
          fill="var(--color-saffron)"
        />
        <path
          d="M24 15c6 3 9 8 9 14-4 3-9 3-9 3s-5 0-9-3c0-6 3-11 9-14Z"
          fill="var(--color-saffron)"
          opacity="0.85"
        />
        <path
          d="M12 30c3-1.5 7-2.3 12-2.3S33 28.5 36 30c-2.5 4-7 7-12 7s-9.5-3-12-7Z"
          fill="var(--color-gold)"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[1.05rem] font-semibold text-ink">
          {t("siteName")}
        </span>
        <span className="font-body text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint">
          Maghar · Sant Kabir Nagar
        </span>
      </span>
    </span>
  );
}
