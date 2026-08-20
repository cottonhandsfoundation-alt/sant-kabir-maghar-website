import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortraitPlaceholder } from "@/components/ui/PortraitPlaceholder";
import { FactBadge } from "@/components/ui/FactBadge";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { JsonLd } from "@/components/site/JsonLd";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { ArrowRight } from "lucide-react";

const content = {
  hi: {
    kicker: "महंत विचार दास जी",
    title: "महंत विचार दास जी",
    designation: "मगहर स्थित कबीर चौरा से संबद्ध धार्मिक मार्गदर्शक",
    portraitLabel:
      "आधिकारिक चित्र अभी उपलब्ध नहीं — सत्यापन के बाद यहां अद्यतन किया जाएगा",
    lead: "महंत विचार दास जी मगहर स्थित कबीर चौरा से जुड़े एक सम्मानित धार्मिक मार्गदर्शक हैं। वे संत कबीर के संदेश को आगे बढ़ाने वाले कार्यक्रमों — जैसे परिनिर्वाण दिवस समारोह और कबीर महोत्सव — में सार्वजनिक रूप से सक्रिय रहे हैं।",
    factNote:
      "इस पृष्ठ पर दी गई जानकारी बहु-स्रोत समाचार रिपोर्टों पर आधारित है और केवल सत्यापित तथ्यों तक सीमित है। किसी विशिष्ट संस्थागत उपाधि, वंश-परंपरा या आंकड़े का दावा तब तक नहीं किया गया है जब तक वह विश्वसनीय स्रोत से पुष्ट न हो — विस्तार से जानने के लिए 'जीवन एवं आध्यात्मिक यात्रा' पृष्ठ देखें।",
    exploreLabel: "आगे जानें",
  },
  en: {
    kicker: "Mahant Vichar Das Ji",
    title: "Mahant Vichar Das Ji",
    designation: "A religious guide associated with Kabir Chaura, Maghar",
    portraitLabel:
      "No official portrait available yet — this will be updated once one is confirmed",
    lead: "Mahant Vichar Das Ji is a respected religious guide associated with Kabir Chaura in Maghar. He has been publicly involved in programmes that carry forward Sant Kabir's message — including Parinirvan Divas observances and the Kabir Mahotsav.",
    factNote:
      "The information on this page is drawn from multiple independent news reports and is limited strictly to verifiable facts. No specific institutional title, lineage claim, or statistic is asserted unless supported by a reliable source — see the 'Life & Spiritual Journey' page for detail.",
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
      canonical: `/${locale}/mahant-vichar-das-ji`,
      languages: {
        hi: "/hi/mahant-vichar-das-ji",
        en: "/en/mahant-vichar-das-ji",
      },
    },
  };
}

export default async function MahantJiHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale as "hi" | "en"];
  const t = await getTranslations("Nav");
  const children =
    NAV_ITEMS.find((i) => i.href === "/mahant-vichar-das-ji")?.children ?? [];

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vichar Das",
    alternateName: "महंत विचार दास जी",
    description:
      "A religious guide publicly associated with Kabir Chaura, Maghar, Sant Kabir Nagar, Uttar Pradesh, India.",
    affiliation: {
      "@type": "Organization",
      name: "Kabir Chaura, Maghar",
    },
  };

  return (
    <>
      <JsonLd data={personJsonLd} />
      <SectionSubNav items={children} activeHref="/mahant-vichar-das-ji" />
      <Container className="grid gap-10 py-14 lg:grid-cols-[320px_1fr] lg:items-start">
        <PortraitPlaceholder initials="वि. दा." label={c.portraitLabel} />

        <div>
          <SectionHeading kicker={c.kicker} title={c.title} />
          <p className="mt-2 font-body text-sm font-medium uppercase tracking-wide text-gold">
            {c.designation}
          </p>
          <p className="mt-5 max-w-2xl font-body leading-relaxed text-ink-soft">{c.lead}</p>
          <FactBadge kind="verified" className="mt-4" />

          <div className="mt-6 max-w-2xl rounded-sm border border-gold/30 bg-gold-pale/40 p-4">
            <p className="font-body text-sm leading-relaxed text-ink-soft">{c.factNote}</p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
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
        </div>
      </Container>
    </>
  );
}
