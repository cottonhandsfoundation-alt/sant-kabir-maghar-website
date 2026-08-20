import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

// The admin panel is a standalone route tree with its own root layout (a
// sibling of `src/app/[locale]/layout.tsx`, not nested under it), so it must
// independently define <html>/<body>. Next.js App Router supports multiple
// independent root layouts as long as neither is nested under a shared one.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin — Sant Kabir Sewa Samiti",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-full bg-cream-soft text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
