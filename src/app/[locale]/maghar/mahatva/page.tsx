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
    kicker: "मगहर · महत्व",
    title: "मगहर का महत्व",
    lead: "मगहर का महत्व दो स्तरों पर है — एक, यह संत कबीर के जीवन का अंतिम और सर्वाधिक प्रतीकात्मक अध्याय है; दूसरा, यह आज भी धार्मिक सद्भाव और सामाजिक समरसता का जीवंत केंद्र बना हुआ है।",
    sections: [
      {
        heading: "आध्यात्मिक महत्व",
        badge: "traditional" as const,
        body: "परंपरा के अनुसार, कबीर ने जानबूझकर मगहर को अपने जीवन के अंतिम पड़ाव के रूप में चुना — उस युग की इस लोक-मान्यता को चुनौती देने के लिए कि मगहर में मृत्यु अशुभ होती है। यह कार्य स्वयं उनकी शिक्षा का प्रत्यक्ष उदाहरण बन गया: मुक्ति स्थान पर नहीं, आंतरिक सत्य पर निर्भर करती है।",
      },
      {
        heading: "ऐतिहासिक एवं प्रशासनिक महत्व",
        badge: "verified" as const,
        body: "मगहर का महत्व इतना गहरा है कि इसी के नाम पर 5 सितंबर 1997 को संत कबीर नगर नामक एक पृथक जिला बनाया गया। जिले की आधिकारिक वेबसाइट पर मगहर/संत कबीर चौरा को जिले के प्रमुख पर्यटन एवं तीर्थ स्थलों में सूचीबद्ध किया गया है।",
      },
      {
        heading: "समकालीन सरकारी सहभागिता",
        badge: "verified" as const,
        body: "जून 2018 में प्रधानमंत्री नरेंद्र मोदी ने संत कबीर की 500वीं निर्वाण-वर्षगांठ के अवसर पर मगहर की यात्रा की और यहां आयोजित कबीर महोत्सव का उद्घाटन किया तथा संत कबीर अकादमी की आधारशिला रखी। उत्तर प्रदेश के मुख्यमंत्री सहित राज्य के नेता भी विभिन्न अवसरों पर मगहर आकर इसके विकास और महत्व को रेखांकित कर चुके हैं।",
      },
      {
        heading: "सद्भाव का प्रतीक",
        badge: "verified" as const,
        body: "समाधि और मजार का एक साथ खड़ा होना मगहर को हिंदू-मुस्लिम एकता के एक शक्तिशाली, जीवंत प्रतीक के रूप में स्थापित करता है — यह भाव केवल परंपरा तक सीमित नहीं, बल्कि आज भी सरकारी एवं सामुदायिक स्तर पर सक्रिय रूप से मनाया जाता है।",
      },
    ],
  },
  en: {
    kicker: "Maghar · Significance",
    title: "The Significance of Maghar",
    lead: "Maghar's significance operates on two levels — it is the final and most symbolically important chapter of Sant Kabir's life, and it remains, to this day, a living centre of religious harmony and social unity.",
    sections: [
      {
        heading: "Spiritual Significance",
        badge: "traditional" as const,
        body: "Tradition holds that Kabir deliberately chose Maghar as the final chapter of his life, to challenge the popular belief of his time that death there was inauspicious. This act itself became a living demonstration of his own teaching: that liberation depends not on place, but on inner truth.",
      },
      {
        heading: "Historical & Administrative Significance",
        badge: "verified" as const,
        body: "Maghar's importance runs deep enough that a separate district — Sant Kabir Nagar — was carved out and named after him on 5 September 1997. The district's official government website lists Maghar/Sant Kabir Chaura among its principal tourist and pilgrimage sites.",
      },
      {
        heading: "Contemporary Government Engagement",
        badge: "verified" as const,
        body: "In June 2018, Prime Minister Narendra Modi visited Maghar for the 500th death anniversary of Sant Kabir, inaugurated the Kabir Mahotsav held there, and laid the foundation stone of the Sant Kabir Academy. The Chief Minister of Uttar Pradesh and other state leaders have also visited Maghar on various occasions, underscoring its development and significance.",
      },
      {
        heading: "A Symbol of Harmony",
        badge: "verified" as const,
        body: "The Samadhi and Mazar standing side by side establishes Maghar as a powerful, living symbol of Hindu-Muslim unity — a spirit that is not confined to tradition alone, but is actively marked at both governmental and community levels to this day.",
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
      canonical: `/${locale}/maghar/mahatva`,
      languages: { hi: "/hi/maghar/mahatva", en: "/en/maghar/mahatva" },
    },
  };
}

export default async function MagharMahatvaPage({
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
      <SectionSubNav items={children} activeHref="/maghar/mahatva" />
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
