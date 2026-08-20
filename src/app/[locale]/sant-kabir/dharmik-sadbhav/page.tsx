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
    kicker: "संत कबीर जी · धार्मिक सद्भाव",
    title: "धार्मिक सद्भाव",
    lead: "कबीर की वाणी किसी एक धर्म की संपत्ति नहीं — वह हिंदू और मुस्लिम, दोनों परंपराओं में समान श्रद्धा से पढ़ी और गाई जाती है।",
    sections: [
      {
        heading: "दोनों परंपराओं की समान आलोचना",
        badge: "verified" as const,
        body: "कबीर ने अपनी वाणी में जितनी बेबाकी से मूर्ति-पूजा, तीर्थाटन और कर्मकांड को चुनौती दी, उतनी ही स्पष्टता से नमाज़-रोज़े के केवल बाहरी पालन को भी निरर्थक बताया। उनकी आलोचना किसी एक धर्म के विरुद्ध नहीं थी — वह हर उस आडंबर के विरुद्ध थी जो सच्ची आंतरिक भक्ति की जगह ले लेता है।",
      },
      {
        heading: "जीवन में सेतु की भूमिका",
        badge: "verified" as const,
        body: "एक मुस्लिम जुलाहा परिवार में पले-बढ़े, किंतु हिंदू भक्ति परंपरा से गहराई से जुड़े कबीर स्वयं दोनों समुदायों के बीच एक जीवंत सेतु थे। प्रारंभिक ग्रंथ-परंपराओं में उन्हें वैष्णव भक्ति और सूफी — दोनों परंपराओं से जोड़ा गया है।",
      },
      {
        heading: "मगहर — सद्भाव का प्रतीक",
        badge: "traditional" as const,
        body: "परंपरा के अनुसार, कबीर के निर्वाण के बाद हिंदू और मुस्लिम अनुयायियों के बीच अंतिम संस्कार को लेकर विवाद हुआ, किंतु चादर हटाने पर वहां केवल फूल पाए गए — जिन्हें दोनों समुदायों ने बांट लिया। इसी कथा के आधार पर आज भी मगहर में समाधि और मजार पास-पास खड़े हैं, जो सद्भाव का एक जीवंत, वर्तमान प्रतीक बने हुए हैं।",
      },
      {
        heading: "समकालीन संदर्भ",
        badge: "verified" as const,
        body: "मगहर का यह सद्भाव आज भी सरकारी और सामुदायिक स्तर पर सक्रिय रूप से मनाया जाता है — प्रधानमंत्री सहित विभिन्न राष्ट्रीय एवं राज्य नेताओं ने मगहर की यात्रा कर कबीर के सद्भाव-संदेश को रेखांकित किया है। यह स्थल आज भी विभिन्न धर्मों के लोगों का समान रूप से स्वागत करता है।",
      },
    ],
  },
  en: {
    kicker: "Sant Kabir Ji · Religious Harmony",
    title: "Religious Harmony",
    lead: "Kabir's verses belong to no single religion — they are read and sung with equal reverence within both Hindu and Muslim tradition.",
    sections: [
      {
        heading: "Equal Critique of Both Traditions",
        badge: "verified" as const,
        body: "Kabir challenged idol worship, pilgrimage and empty ritual with the same directness he used to call out purely mechanical observance of namaz and roza. His critique was never aimed at one religion — it was aimed at any outward show that replaces genuine inner devotion.",
      },
      {
        heading: "A Living Bridge",
        badge: "verified" as const,
        body: "Raised in a Muslim weaver family yet deeply immersed in Hindu bhakti tradition, Kabir himself embodied a living bridge between both communities. Early textual traditions link him simultaneously to the Vaishnava bhakti tradition and the Sufi tradition.",
      },
      {
        heading: "Maghar — a Symbol of Harmony",
        badge: "traditional" as const,
        body: "According to tradition, a dispute arose between Kabir's Hindu and Muslim followers over his funeral rites after his passing, but upon lifting the shroud, only flowers were found — divided between the two communities. This story underlies why a Samadhi and a Mazar stand side by side at Maghar to this day, a living, present-day symbol of harmony.",
      },
      {
        heading: "In the Present Day",
        badge: "verified" as const,
        body: "This spirit of harmony at Maghar continues to be actively marked at both governmental and community levels — the Prime Minister and various national and state leaders have visited Maghar, underscoring Kabir's message of harmony. The site continues to welcome people of every faith equally.",
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
      canonical: `/${locale}/sant-kabir/dharmik-sadbhav`,
      languages: { hi: "/hi/sant-kabir/dharmik-sadbhav", en: "/en/sant-kabir/dharmik-sadbhav" },
    },
  };
}

export default async function DharmikSadbhavPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale as "hi" | "en"];
  const children = NAV_ITEMS.find((i) => i.href === "/sant-kabir")?.children ?? [];

  return (
    <>
      <SectionSubNav items={children} activeHref="/sant-kabir/dharmik-sadbhav" />
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
            <AttributedImage image={IMAGE_SOURCES.magharSamadhiMazar1} locale={locale} />
          </div>
        </div>
      </Container>
    </>
  );
}
