"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ADMIN_NAV_ITEMS } from "./AdminNav";
import { adminLogout } from "@/app/admin/(dashboard)/logout-action";
import type { AdminRole } from "@/lib/auth";

type AdminShellSession = {
  email: string;
  role: AdminRole;
};

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({
  role,
  pathname,
  onNavigate,
}: {
  role: AdminRole;
  pathname: string;
  onNavigate?: () => void;
}) {
  const items = ADMIN_NAV_ITEMS.filter((item) => item.roles.includes(role));
  return (
    <nav className="flex flex-col gap-0.5">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`rounded-sm px-3 py-2 text-sm transition ${
              active
                ? "bg-saffron-soft font-medium text-saffron-dark"
                : "text-ink-soft hover:bg-cream-soft hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminShell({
  session,
  children,
}: {
  session: AdminShellSession;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream-soft lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-[240px] shrink-0 border-r border-border bg-paper lg:flex lg:flex-col">
        <div className="border-b border-border px-4 py-5">
          <p className="font-heading text-lg font-semibold text-ink">Sant Kabir Admin</p>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-4">
          <NavLinks role={session.role} pathname={pathname} />
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between border-b border-border bg-paper px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-sm p-1.5 text-ink hover:bg-cream-soft lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="font-heading text-base font-semibold text-ink lg:hidden">
              Sant Kabir Admin
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <a
              href="/hi"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-ink-soft hover:text-saffron sm:inline"
            >
              View public site
            </a>
            <div className="hidden text-right sm:block">
              <p className="font-medium text-ink">{session.email}</p>
              <p className="text-xs text-ink-faint">{session.role.replaceAll("_", " ")}</p>
            </div>
            <form action={adminLogout}>
              <button
                type="submit"
                className="rounded-sm border border-border px-3 py-1.5 text-ink-soft transition hover:border-saffron hover:text-saffron"
              >
                Logout
              </button>
            </form>
          </div>
        </header>

        {/* Mobile nav dropdown */}
        {mobileOpen ? (
          <div className="border-b border-border bg-paper px-2 py-3 lg:hidden">
            <NavLinks
              role={session.role}
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        ) : null}

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
