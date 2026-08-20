import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { NavChild } from "@/lib/nav";

/**
 * Horizontal scrollable sub-navigation shown at the top of every subpage
 * within a major section (Sant Kabir Ji / Mahant Vichar Das Ji / Maghar),
 * so a visitor always sees siblings without going back to the mega-menu.
 */
export async function SectionSubNav({
  items,
  activeHref,
}: {
  items: NavChild[];
  activeHref: string;
}) {
  const t = await getTranslations("Nav");

  return (
    <nav
      aria-label="Section navigation"
      className="border-b border-border-soft bg-cream-soft"
    >
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 font-body text-sm transition-colors",
              activeHref === item.href
                ? "bg-saffron text-cream"
                : "text-ink-soft hover:bg-cream-deep hover:text-saffron"
            )}
          >
            {t(item.labelKey)}
          </Link>
        ))}
      </div>
    </nav>
  );
}
