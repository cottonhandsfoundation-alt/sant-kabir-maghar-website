import type { AdminRole } from "@/lib/auth";

export type AdminNavItem = {
  href: string;
  label: string;
  roles: AdminRole[];
};

// Fixed route list — other agents are building pages at these exact paths,
// so this list (and the hrefs in particular) must stay in sync with them.
export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    roles: ["SUPER_ADMIN", "CONTENT_MANAGER", "DONATION_MANAGER", "EVENT_MANAGER"],
  },
  { href: "/admin/events", label: "Events", roles: ["SUPER_ADMIN", "EVENT_MANAGER"] },
  { href: "/admin/gallery", label: "Gallery", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  { href: "/admin/videos", label: "Videos", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  {
    href: "/admin/messages",
    label: "Messages / Pravachan",
    roles: ["SUPER_ADMIN", "CONTENT_MANAGER"],
  },
  { href: "/admin/dohas", label: "Doha Library", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  {
    href: "/admin/testimonials",
    label: "Testimonials",
    roles: ["SUPER_ADMIN", "CONTENT_MANAGER"],
  },
  { href: "/admin/donations", label: "Donations", roles: ["SUPER_ADMIN", "DONATION_MANAGER"] },
  {
    href: "/admin/donation-purposes",
    label: "Donation Purposes",
    roles: ["SUPER_ADMIN", "DONATION_MANAGER"],
  },
  { href: "/admin/enquiries", label: "Enquiries", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  { href: "/admin/volunteers", label: "Volunteers", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  { href: "/admin/newsletter", label: "Newsletter", roles: ["SUPER_ADMIN", "CONTENT_MANAGER"] },
  { href: "/admin/settings", label: "Settings", roles: ["SUPER_ADMIN"] },
  { href: "/admin/users", label: "Admin Users", roles: ["SUPER_ADMIN"] },
];
