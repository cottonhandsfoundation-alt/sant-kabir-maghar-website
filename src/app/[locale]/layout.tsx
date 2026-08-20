import type { Metadata } from "next";
import { Noto_Serif_Devanagari, Noto_Sans_Devanagari } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { getSiteSettings } from "@/lib/settings";
import "../globals.css";

const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif-devanagari",
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-devanagari",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("defaultTitle"),
      template: `%s — ${t("siteName")}`,
    },
    description: t("defaultDescription"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        hi: "/hi",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      locale: locale === "hi" ? "hi_IN" : "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const settings = await getSiteSettings();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.org_name_en,
    alternateName: settings.org_name_hi,
    url: siteUrl,
    ...(settings.org_email && !settings.org_email.includes("PLACEHOLDER")
      ? { email: settings.org_email }
      : {}),
    ...(settings.org_phone && !settings.org_phone.includes("PLACEHOLDER")
      ? { telephone: settings.org_phone }
      : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Maghar",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.org_name_en,
    url: siteUrl,
    inLanguage: routing.locales,
  };

  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${notoSerifDevanagari.variable} ${notoSansDevanagari.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <NextIntlClientProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
