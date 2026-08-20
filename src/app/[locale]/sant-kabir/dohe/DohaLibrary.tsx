"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { DOHA_THEME_LABELS, type DohaTheme } from "@/content/dohas";

type DohaRow = {
  id: string;
  hindiText: string;
  meaningHindi: string;
  meaningEnglish: string;
  theme: string;
};

export function DohaLibrary({
  dohas,
  locale,
  labels,
}: {
  dohas: DohaRow[];
  locale: string;
  labels: { all: string; search: string; filterByTheme: string; noResults: string };
}) {
  const [query, setQuery] = useState("");
  const [activeTheme, setActiveTheme] = useState<DohaTheme | "all">("all");

  const themes = Object.keys(DOHA_THEME_LABELS) as DohaTheme[];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dohas.filter((d) => {
      const matchesTheme = activeTheme === "all" || d.theme === activeTheme;
      if (!matchesTheme) return false;
      if (!q) return true;
      return (
        d.hindiText.toLowerCase().includes(q) ||
        d.meaningHindi.toLowerCase().includes(q) ||
        d.meaningEnglish.toLowerCase().includes(q)
      );
    });
  }, [dohas, query, activeTheme]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.search}
            aria-label={labels.search}
            className="w-full rounded-full border border-border bg-paper py-2.5 pl-10 pr-4 font-body text-sm text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
          />
        </div>
      </div>

      <div
        role="group"
        aria-label={labels.filterByTheme}
        className="mt-5 flex flex-wrap gap-2"
      >
        <button
          onClick={() => setActiveTheme("all")}
          aria-pressed={activeTheme === "all"}
          className={cn(
            "rounded-full border px-3.5 py-1.5 font-body text-sm transition-colors",
            activeTheme === "all"
              ? "border-saffron bg-saffron text-cream"
              : "border-border text-ink-soft hover:border-saffron hover:text-saffron"
          )}
        >
          {labels.all}
        </button>
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => setActiveTheme(theme)}
            aria-pressed={activeTheme === theme}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-body text-sm transition-colors",
              activeTheme === theme
                ? "border-saffron bg-saffron text-cream"
                : "border-border text-ink-soft hover:border-saffron hover:text-saffron"
            )}
          >
            {DOHA_THEME_LABELS[theme][locale === "hi" ? "hi" : "en"]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center font-body text-ink-faint">{labels.noResults}</p>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {filtered.map((doha) => (
            <article
              key={doha.id}
              className="rounded-sm border border-border-soft bg-paper p-6"
            >
              <p className="font-heading text-lg leading-relaxed text-ink">
                {doha.hindiText}
              </p>
              <div className="motif-divider my-4" />
              <p className="font-body text-sm leading-relaxed text-ink-soft">
                {locale === "hi" ? doha.meaningHindi : doha.meaningEnglish}
              </p>
              <span className="mt-4 inline-block rounded-full border border-gold/40 bg-gold-pale px-3 py-1 font-body text-xs text-gold">
                {DOHA_THEME_LABELS[doha.theme as DohaTheme]?.[locale === "hi" ? "hi" : "en"] ??
                  doha.theme}
              </span>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
