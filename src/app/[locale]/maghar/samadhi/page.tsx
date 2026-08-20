import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactBadge } from "@/components/ui/FactBadge";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { AttributedImage } from "@/components/ui/AttributedImage";
import { NAV_ITEMS } from "@/lib/nav";
import { IMAGE_SOURCES } from "@/content/image-sources";

const content = {
  hi: {
    kicker: "मगहर · समाधि",
    title: "समाधि",
    lead: "मगहर स्थित संत कबीर की समाधि, हिंदू परंपरा के अनुसार निर्मित एक स्मारक है, जो मजार से कुछ ही दूरी पर स्थित है।",
    sections: [
      {
        heading: "निर्माण की परंपरा",
        badge: "traditional" as const,
        body: "परंपरा के अनुसार, कबीर के निर्वाण के पश्चात हिंदू अनुयायियों ने चादर के नीचे मिले फूलों का एक भाग लेकर विधिवत उनका दाह-संस्कार किया और उसी स्थान पर समाधि का निर्माण किया।",
      },
      {
        heading: "वर्तमान स्थिति",
        badge: "verified" as const,
        body: "यह समाधि आज भी मजार के निकट, साथ-साथ स्थित है — जिला प्रशासन की आधिकारिक वेबसाइट पर भी इसका उल्लेख इसी रूप में किया गया है। यह स्थल कबीरपंथी अनुयायियों के लिए एक महत्वपूर्ण तीर्थ है।",
      },
    ],
  },
  en: {
    kicker: "Maghar · Samadhi",
    title: "Samadhi",
    lead: "Sant Kabir's Samadhi at Maghar is a memorial built according to Hindu tradition, standing only a short distance from the Mazar.",
    sections: [
      {
        heading: "The Tradition of Its Building",
        badge: "traditional" as const,
        body: "Tradition holds that after Kabir's passing, his Hindu followers took a portion of the flowers found beneath the shroud, performed the appropriate last rites, and built the Samadhi at that same site.",
      },
      {
        heading: "Present Day",
        badge: "verified" as const,
        body: "The Samadhi still stands close beside the Mazar today — a fact also described this way on the district administration's official website. The site remains an important place of pilgrimage for Kabir Panthi followers.",
      },
    ],
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
      canonical: `/${locale}/maghar/samadhi`,
      languages: { hi: "/hi/maghar/samadhi", en: "/en/maghar/samadhi" },
    },
  };
}

export default async function SamadhiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale as "hi" | "en"];
  const children = NAV_ITEMS.find((i) => i.href === "/maghar")?.children ?? [];

  return (
    <>
      <SectionSubNav items={children} activeHref="/maghar/samadhi" />
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="max-w-2xl">
            <SectionHeading kicker={c.kicker} title={c.title} />
            <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>

            <div className="mt-10 space-y-8">
              {c.sections.map((s, i) => (
                <section key={i}>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h2 className="font-heading text-xl font-semibold text-ink">{s.heading}</h2>
                    <FactBadge kind={s.badge} />
                  </div>
                  <p className="font-body leading-relaxed text-ink-soft">{s.body}</p>
                </section>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <AttributedImage image={IMAGE_SOURCES.sadguruKabirSamadhiSthali} locale={locale} />
          </div>
        </div>
      </Container>
    </>
  );
}
