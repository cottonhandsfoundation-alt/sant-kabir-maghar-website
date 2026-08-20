import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactBadge } from "@/components/ui/FactBadge";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { Button } from "@/components/ui/Button";
import { AttributedImage } from "@/components/ui/AttributedImage";
import { NAV_ITEMS } from "@/lib/nav";
import { IMAGE_SOURCES } from "@/content/image-sources";

const content = {
  hi: {
    kicker: "संत कबीर जी · मगहर से संबंध",
    title: "मगहर से संबंध",
    lead: "मगहर वह स्थान है जहां कबीर दास जी ने अपने जीवन के अंतिम वर्ष बिताए और देह त्यागी — यह उनके जीवन-वृत्तांत का सबसे प्रतीकात्मक अध्याय है।",
    body: [
      "विश्वसनीय स्रोतों के अनुसार, संत कबीर दास जी का निर्वाण मगहर में हुआ — यह स्थान वर्तमान में उत्तर प्रदेश के संत कबीर नगर जिले में स्थित है। यह जिला भी उन्हीं के नाम पर रखा गया है।",
      "परंपरा के अनुसार, उस युग में यह लोक-मान्यता प्रचलित थी कि काशी (वाराणसी) में देह त्यागने वालों को मोक्ष मिलता है, जबकि मगहर में मृत्यु अशुभ मानी जाती थी। कहा जाता है कि कबीर ने स्वयं मगहर को चुनकर इस अंधविश्वास को चुनौती दी — यह दिखाने के लिए कि सच्ची मुक्ति स्थान-विशेष पर नहीं, आंतरिक सत्य और भक्ति पर निर्भर करती है।",
      "उनके निर्वाण के पश्चात मगहर में ही समाधि और मजार, दोनों का निर्माण हुआ — जो आज भी साथ-साथ खड़े हैं। यह स्थल कबीर के जीवन और शिक्षाओं दोनों का प्रतीक बन गया है: उनकी शिक्षाओं की तरह ही, यह स्थान भी धार्मिक विभाजन से ऊपर उठकर एकता का संदेश देता है।",
    ],
    cta: "मगहर के बारे में विस्तार से जानें",
  },
  en: {
    kicker: "Sant Kabir Ji · Connection with Maghar",
    title: "Connection with Maghar",
    lead: "Maghar is where Kabir Das Ji spent his final years and left his mortal body — the most symbolically significant chapter of his life story.",
    body: [
      "According to reliable sources, Sant Kabir Das Ji's passing occurred at Maghar — a location now situated within Sant Kabir Nagar district, Uttar Pradesh, a district that itself takes its name from him.",
      "Tradition holds that a popular belief of the time held that dying in Kashi (Varanasi) guaranteed salvation, while death in Maghar was considered inauspicious. Kabir is said to have deliberately chosen Maghar to challenge this superstition — demonstrating that true liberation depends not on a particular place, but on inner truth and devotion.",
      "After his passing, both a Samadhi and a Mazar came to be built at Maghar — standing side by side to this day. The site has become a symbol of both his life and his teachings: like his verses, it too rises above religious division to carry a message of unity.",
    ],
    cta: "Explore Maghar in detail",
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
      canonical: `/${locale}/sant-kabir/maghar-sambandh`,
      languages: { hi: "/hi/sant-kabir/maghar-sambandh", en: "/en/sant-kabir/maghar-sambandh" },
    },
  };
}

export default async function MagharSambandhPage({
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
      <SectionSubNav items={children} activeHref="/sant-kabir/maghar-sambandh" />
      <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_360px] lg:items-start">
        <div className="max-w-2xl">
          <SectionHeading kicker={c.kicker} title={c.title} />
          <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>
          <FactBadge kind="verified" className="mt-4" />
          {c.body.map((p, i) => (
            <p key={i} className="mt-4 font-body leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
          <div className="mt-8">
            <Button href="/maghar" variant="primary">
              {c.cta}
            </Button>
          </div>
        </div>
        <div className="space-y-6">
          <AttributedImage image={IMAGE_SOURCES.sadguruKabirSamadhiSthali} locale={locale} />
          <AttributedImage image={IMAGE_SOURCES.kabirChauraMagharSign} locale={locale} />
        </div>
      </Container>
    </>
  );
}
