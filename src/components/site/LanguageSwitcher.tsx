"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function switchTo(nextLocale: string) {
    router.replace(
      // @ts-expect-error -- pathname is dynamic across route segments
      { pathname, params },
      { locale: nextLocale }
    );
  }

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-ink/15 bg-paper p-0.5"
      role="group"
      aria-label={t("language")}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchTo(loc)}
          aria-pressed={locale === loc}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            locale === loc
              ? "bg-saffron text-cream"
              : "text-ink-soft hover:text-saffron"
          } ${compact ? "px-2.5" : ""}`}
        >
          {loc === "hi" ? "हिं" : "EN"}
        </button>
      ))}
    </div>
  );
}
