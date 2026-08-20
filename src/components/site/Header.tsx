import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { Logo } from "../ui/Logo";
import { ChevronDown, Heart } from "lucide-react";

export async function Header() {
  const t = await getTranslations("Nav");

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Logo />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex lg:items-center lg:gap-1"
        >
          {NAV_ITEMS.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded-sm px-3 py-2 font-body text-[0.92rem] text-ink-soft transition-colors hover:text-saffron"
              >
                {t(item.labelKey)}
                {item.children ? (
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                ) : null}
              </Link>
              {item.children ? (
                <div className="invisible absolute left-0 top-full z-50 min-w-64 -translate-y-1 rounded-sm border border-border-soft bg-paper p-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-sm px-3 py-2 text-sm text-ink-soft hover:bg-cream-soft hover:text-saffron"
                    >
                      {t(child.labelKey)}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
          <Link
            href="/donate"
            className="hidden items-center gap-2 rounded-sm bg-saffron px-4 py-2 font-body text-sm font-semibold text-cream transition-colors hover:bg-saffron-dark sm:inline-flex"
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
            {t("donate")}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
