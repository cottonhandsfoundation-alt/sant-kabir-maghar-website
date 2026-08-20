"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const t = useTranslations("Nav");
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="rounded-sm p-2 text-ink hover:text-saffron"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-cream px-5 py-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <LanguageSwitcher />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-sm p-2 text-ink hover:text-saffron"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                const isExpanded = expanded === item.href;
                const isActive = pathname === item.href;
                return (
                  <div key={item.href} className="border-b border-border-soft">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex-1 py-3 font-body text-base ${
                          isActive ? "font-semibold text-saffron" : "text-ink"
                        }`}
                      >
                        {t(item.labelKey)}
                      </Link>
                      {item.children ? (
                        <button
                          onClick={() =>
                            setExpanded(isExpanded ? null : item.href)
                          }
                          aria-expanded={isExpanded}
                          aria-label={`${t(item.labelKey)} submenu`}
                          className="p-3 text-ink-soft"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      ) : null}
                    </div>
                    {item.children && isExpanded ? (
                      <ul className="mb-2 flex flex-col gap-0.5 pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="block rounded-sm py-2 text-sm text-ink-soft hover:text-saffron"
                            >
                              {t(child.labelKey)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-sm bg-saffron px-5 py-3 font-body text-sm font-semibold text-cream"
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              {t("donate")}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
