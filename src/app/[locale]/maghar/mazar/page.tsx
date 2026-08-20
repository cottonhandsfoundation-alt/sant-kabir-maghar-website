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
    kicker: "मगहर · मजार",
    title: "मजार",
    lead: "मगहर स्थित संत कबीर की मजार, मुस्लिम परंपरा के अनुसार निर्मित एक दरगाह है, जो समाधि से कुछ ही दूरी पर स्थित है।",
    sections: [
      {
        heading: "निर्माण की परंपरा",
        badge: "traditional" as const,
        body: "परंपरा के अनुसार, कबीर के निर्वाण के पश्चात मुस्लिम अनुयायियों ने चादर के नीचे मिले फूलों का शेष भाग लेकर विधिवत दफनाया और उसी स्थान पर मजार का निर्माण किया।",
      },
      {
        heading: "वर्तमान स्थिति",
        badge: "verified" as const,
        body: "मजार आज भी समाधि के निकट स्थित है, और इसकी देखरेख परंपरागत रूप से एक मुतवल्ली द्वारा की जाती बताई जाती है। शोध के दौरान यह भी पाया गया कि परिसर में जीर्णोद्धार का कार्य समय-समय पर होता रहा है।",
      },
    ],
  },
  en: {
    kicker: "Maghar · Mazar",
    title: "Mazar",
    lead: "Sant Kabir's Mazar at Maghar is a dargah built according to Muslim tradition, standing only a short distance from the Samadhi.",
    sections: [
      {
        heading: "The Tradition of Its Building",
        badge: "traditional" as const,
        body: "Tradition holds that after Kabir's passing, his Muslim followers took the remaining portion of the flowers found beneath the shroud, performed the appropriate burial rites, and built the Mazar at that same site.",
      },
      {
        heading: "Present Day",
        badge: "verified" as const,
        body: "The Mazar still stands close beside the Samadhi today, and its upkeep is traditionally described as the responsibility of a Mutwalli (Muslim custodian). Research for this site also found that restoration work at the complex has taken place from time to time.",
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
      canonical: `/${locale}/maghar/mazar`,
      languages: { hi: "/hi/maghar/mazar", en: "/en/maghar/mazar" },
    },
  };
}

export default async function MazarPage({
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
      <SectionSubNav items={children} activeHref="/maghar/mazar" />
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
            <AttributedImage image={IMAGE_SOURCES.magharSamadhiMazar2} locale={locale} />
          </div>
        </div>
      </Container>
    </>
  );
}
