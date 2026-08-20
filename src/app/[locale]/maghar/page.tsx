import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AttributedImage } from "@/components/ui/AttributedImage";
import { FactBadge } from "@/components/ui/FactBadge";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { JsonLd } from "@/components/site/JsonLd";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { IMAGE_SOURCES } from "@/content/image-sources";
import { ArrowRight } from "lucide-react";

const content = {
  hi: {
    kicker: "मगहर",
    title: "मगहर — संत कबीर की निर्वाण भूमि",
    lead: "संत कबीर नगर जिले, उत्तर प्रदेश में स्थित मगहर, वह स्थान है जहां संत कबीर दास जी ने अपना जीवन पूर्ण किया। यहां उनकी समाधि और मजार आज भी साथ-साथ खड़े हैं — सद्भाव का एक जीवंत प्रतीक।",
    body: "मगहर आमी नदी के तट पर बसा एक कस्बा है, जो जिला मुख्यालय खलीलाबाद से लगभग 5-9 किलोमीटर दूर है। यह केवल एक ऐतिहासिक स्थल नहीं, बल्कि आज भी सक्रिय आस्था, तीर्थाटन और वार्षिक उत्सवों का केंद्र है।",
    exploreLabel: "आगे जानें",
  },
  en: {
    kicker: "Maghar",
    title: "Maghar — The Nirvana Land of Sant Kabir",
    lead: "Located in Sant Kabir Nagar district, Uttar Pradesh, Maghar is where Sant Kabir Das Ji's life came to its end. His Samadhi and Mazar stand side by side here to this day — a living symbol of harmony.",
    body: "Maghar is a town on the banks of the Aami River, roughly 5-9 km from the district headquarters, Khalilabad. It is not merely a historical site — it remains an active centre of faith, pilgrimage and annual celebration today.",
    exploreLabel: "Explore further",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = content[locale as "hi" | "en"];
  return {
    title: c.title,
    description: c.lead,
    alternates: {
      canonical: `/${locale}/maghar`,
      languages: { hi: "/hi/maghar", en: "/en/maghar" },
    },
  };
}

export default async function MagharHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale as "hi" | "en"];
  const t = await getTranslations("Nav");
  const children = NAV_ITEMS.find((i) => i.href === "/maghar")?.children ?? [];

  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Sant Kabir Chaura, Maghar",
    description: c.lead,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Maghar",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
      postalCode: "272173",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.76,
      longitude: 83.13,
    },
  };

  return (
    <>
      <JsonLd data={placeJsonLd} />
      <SectionSubNav items={children} activeHref="/maghar" />
      <Container className="grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <SectionHeading kicker={c.kicker} title={c.title} />
          <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">{c.lead}</p>
          <p className="mt-4 font-body leading-relaxed text-ink-soft">{c.body}</p>
          <FactBadge kind="verified" className="mt-4" />
        </div>
        <AttributedImage image={IMAGE_SOURCES.magharSamadhiMazar1} locale={locale} priority />
      </Container>

      <div className="motif-divider" />

      <Container className="py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="group flex items-center justify-between rounded-sm border border-border-soft bg-paper px-5 py-4 transition-colors hover:border-saffron"
            >
              <span className="font-heading text-base text-ink group-hover:text-saffron">
                {t(child.labelKey)}
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-1 group-hover:text-saffron"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
