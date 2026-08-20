import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSiteSettings } from "@/lib/settings";
import { pick } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHi = locale === "hi";
  return {
    title: isHi ? "संपर्क करें — संत कबीर सेवा समिति" : "Contact Us — Sant Kabir Sewa Samiti",
    description: isHi
      ? "अपने प्रश्न, दर्शन/यात्रा से जुड़ी जानकारी, दान संबंधी या स्वयंसेवा संबंधी जानकारी के लिए हमसे संपर्क करें।"
      : "Get in touch with us for general questions, visit enquiries, donation queries, or volunteering information.",
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        hi: "/hi/contact",
        en: "/en/contact",
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ContactForm");
  const tp = await getTranslations("ContactPage");
  const settings = await getSiteSettings();

  const address = pick(locale, settings.org_address_hi, settings.org_address_en);

  return (
    <Container className="py-16">
      <SectionHeading kicker={tp("enquiryTypesTitle")} title={t("title")} />
      <p className="mt-4 max-w-2xl font-body text-ink-soft">{t("subtitle")}</p>

      <div className="motif-divider my-10" />

      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-heading text-xl font-semibold text-ink">{tp("visitInfoTitle")}</h3>

          <ul className="mt-5 space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-saffron" aria-hidden="true" />
              <span className="font-body text-ink-soft">{address}</span>
            </li>
            {settings.org_phone ? (
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-saffron" aria-hidden="true" />
                <a
                  href={`tel:${settings.org_phone}`}
                  className="font-body text-ink-soft hover:text-saffron"
                >
                  {settings.org_phone}
                </a>
              </li>
            ) : null}
            {settings.org_email ? (
              <li className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-saffron" aria-hidden="true" />
                <a
                  href={`mailto:${settings.org_email}`}
                  className="font-body text-ink-soft hover:text-saffron"
                >
                  {settings.org_email}
                </a>
              </li>
            ) : null}
          </ul>

          {settings.maps_embed_url ? (
            <iframe
              src={settings.maps_embed_url}
              className="mt-6 h-64 w-full rounded-sm border border-border"
              loading="lazy"
              title="Map"
            />
          ) : null}
        </div>
      </div>
    </Container>
  );
}
