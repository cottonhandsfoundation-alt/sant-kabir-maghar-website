import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AttributedImage } from "@/components/ui/AttributedImage";
import { FactBadge } from "@/components/ui/FactBadge";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { NAV_ITEMS } from "@/lib/nav";
import { IMAGE_SOURCES } from "@/content/image-sources";

const content = {
  hi: {
    kicker: "संत कबीर जी · जीवन परिचय",
    title: "जीवन परिचय",
    lead: "संत कबीर दास जी का जीवन इतिहास और परंपरा — दोनों से मिलकर बना है। यहां हम दोनों को स्पष्ट रूप से अलग-अलग दिखाते हैं, ताकि श्रद्धा और तथ्य में कोई भ्रम न रहे।",
    sections: [
      {
        heading: "समय-काल",
        badges: ["traditional", "verified"] as const,
        paras: [
          "संत कबीर दास जी का जन्म और निर्वाण-काल इतिहासकारों के बीच विवाद का विषय रहा है। परंपरागत रूप से इन्हें संवत 1455 (सन् 1398) में जन्मा और सन् 1518 में मगहर में देह त्यागने वाला माना जाता है — इस गणना के अनुसार उनकी आयु लगभग 120 वर्ष बैठती है, जिसे कुछ विद्वान प्रतीकात्मक मानते हैं।",
          "कुछ आधुनिक इतिहासकार उनका कालखंड लगभग सन् 1440-1518 के बीच रखते हैं। संत कबीर नगर जिले की आधिकारिक वेबसाइट के अनुसार, उनका निर्वाण माघ शुक्ल एकादशी, विक्रम संवत 1575 (जनवरी 1518) को मगहर में हुआ। जन्म-तिथि को लेकर स्पष्ट ऐतिहासिक सहमति नहीं है, जबकि मगहर में निर्वाण की तिथि तुलनात्मक रूप से अधिक स्वीकृत है।",
        ],
      },
      {
        heading: "जन्म से जुड़ी परंपराएं",
        badges: ["traditional"] as const,
        paras: [
          "कबीर के जन्म को लेकर एक से अधिक परंपराएं प्रचलित हैं, और इन्हें ऐतिहासिक तथ्य के बजाय आस्था और लोक-कथा के रूप में समझा जाना चाहिए।",
          "कबीरपंथी परंपरा में एक मान्यता है कि कबीर सतलोक से अवतरित होकर वाराणसी के लहरतारा तालाब में कमल के फूल पर प्रकट हुए — एक दिव्य, अलौकिक जन्म की कथा।",
          "एक अन्य, अधिक व्यापक रूप से प्रचलित परंपरा के अनुसार, लहरतारा तालाब के निकट एक शिशु को नीरू और नीमा नामक मुस्लिम जुलाहा दंपति ने पाया और उसे अपने पुत्र के रूप में पाला — यही शिशु आगे चलकर कबीर कहलाया।",
          "कुछ कथाओं में यह भी कहा जाता है कि उनकी जन्मदात्री माता एक ब्राह्मण विधवा थीं, जिन्होंने शिशु को त्याग दिया था — यह कथा कबीर के हिंदू दार्शनिक जड़ों और मुस्लिम पालन-पोषण के बीच सामंजस्य बिठाने के एक प्रयास के रूप में देखी जाती है। इनमें से किसी भी कथा का समकालीन ऐतिहासिक प्रमाण उपलब्ध नहीं है।",
        ],
      },
      {
        heading: "व्यवसाय और सामाजिक परिवेश",
        badges: ["verified"] as const,
        paras: [
          "कबीर पेशे से जुलाहा (बुनकर) थे — उस दौर में वाराणसी में यह एक निम्न-मानी जाने वाली जाति/पेशा था, जिसके अधिकांश सदस्य इस्लाम अपना चुके थे। उनका यह दोहरा सामाजिक परिवेश — हिंदू भक्ति परंपरा और मुस्लिम पारिवारिक पृष्ठभूमि — उन्हें दोनों समुदायों के बीच एक विशिष्ट सेतु का स्थान देता है, जो उनकी वाणी में स्पष्ट झलकता है।",
        ],
      },
      {
        heading: "गुरु से संबंध",
        badges: ["traditional"] as const,
        paras: [
          "परंपरा के अनुसार कबीर के गुरु वाराणसी के भक्ति संत स्वामी रामानंद थे। एक प्रचलित लोक-कथा है कि रामानंद जी किसी मुस्लिम को शिष्य बनाने को तैयार नहीं थे, इसलिए कबीर घाट की सीढ़ियों पर लेट गए जहां रामानंद जी प्रातः भ्रमण करते थे। अनजाने में उनके पांव कबीर को छू गए और उनके मुख से 'राम' निकला — कबीर ने इसे ही अपनी दीक्षा-मंत्र के रूप में स्वीकार कर लिया। यह एक श्रद्धेय किंवदंती है, ऐतिहासिक दस्तावेज़ नहीं।",
        ],
      },
      {
        heading: "निर्वाण — मगहर",
        badges: ["verified", "traditional"] as const,
        paras: [
          "कबीर दास जी ने अपने जीवन के अंतिम समय में मगहर (वर्तमान संत कबीर नगर जिला, उत्तर प्रदेश) को चुना — यह तथ्य विश्वसनीय स्रोतों से पुष्ट है। परंपरा के अनुसार, उस समय यह मान्यता प्रचलित थी कि काशी में मृत्यु से मोक्ष मिलता है जबकि मगहर में मृत्यु से गधे की योनि प्राप्त होती है। कहा जाता है कि कबीर ने जानबूझकर मगहर में देह त्यागकर इस अंधविश्वास को चुनौती दी और यह संदेश दिया कि मुक्ति स्थान पर नहीं, आंतरिक सत्य पर निर्भर करती है — यह व्याख्या परंपरा का हिस्सा है, प्रमाणित इतिहास नहीं।",
          "उनके निर्वाण के पश्चात हिंदू और मुस्लिम अनुयायियों के बीच अंत्येष्टि को लेकर विवाद और फिर चादर के नीचे केवल फूल मिलने की कथा — जिसके आधार पर समाधि और मजार दोनों बने — विस्तार से मगहर पृष्ठ पर बताई गई है।",
        ],
      },
    ],
  },
  en: {
    kicker: "Sant Kabir Ji · Life Introduction",
    title: "Life Introduction",
    lead: "Sant Kabir Das Ji's life is woven from both history and tradition. Here the two are clearly distinguished, so that reverence and fact are never confused.",
    sections: [
      {
        heading: "Historical Period",
        badges: ["traditional", "verified"] as const,
        paras: [
          "Kabir's birth and death dates have long been a subject of historical debate. Tradition places his birth in Samvat 1455 (1398 CE) and his death at Maghar in 1518 CE — a span that would put his age at roughly 120 years, a figure some scholars read as symbolic rather than literal.",
          "Some modern historians instead place his life within roughly 1440–1518 CE. According to the official Sant Kabir Nagar district government website, his passing occurred on Magh Shukla Ekadashi, Vikram Samvat 1575 (January 1518) at Maghar. There is no firm scholarly consensus on his birth date, whereas his death at Maghar is comparatively better attested.",
        ],
      },
      {
        heading: "Traditions of His Birth",
        badges: ["traditional"] as const,
        paras: [
          "More than one tradition surrounds Kabir's birth, and these should be understood as devotional and folk narrative rather than historical fact.",
          "One Kabir Panthi hagiographic tradition holds that Kabir descended from Satlok and appeared upon a lotus flower at the Lahartara tank in Varanasi — a divine, non-biological birth narrative.",
          "A more widely repeated tradition holds that an infant was found near the Lahartara tank by a Muslim weaver couple, Niru and Nima, who raised the child as their own — this child grew up to be Kabir.",
          "Some accounts further suggest his birth mother was an unwed Brahmin widow who abandoned the infant — a narrative that appears aimed at reconciling Kabir's Hindu philosophical roots with his Muslim upbringing. None of these accounts has contemporary historical documentation.",
        ],
      },
      {
        heading: "Occupation & Social Context",
        badges: ["verified"] as const,
        paras: [
          "Kabir worked as a weaver (julaha) — a low-ranked occupational caste in Varanasi at the time, most of whose members had converted to Islam. This dual social position — rooted in Hindu bhakti tradition yet raised within a Muslim family — placed him in a genuinely liminal space between both communities, a position reflected throughout his verses.",
        ],
      },
      {
        heading: "His Guru",
        badges: ["traditional"] as const,
        paras: [
          "Tradition holds that Kabir's guru was the Varanasi bhakti saint Swami Ramananda. A well-known legend recounts that since Ramananda would not accept a Muslim disciple, Kabir lay on the ghat steps where the saint walked each morning; when Ramananda accidentally stepped on him and exclaimed 'Ram', Kabir took this as his initiation mantra. This is a cherished legend, not a historical record.",
        ],
      },
      {
        heading: "Nirvana — Maghar",
        badges: ["verified", "traditional"] as const,
        paras: [
          "That Kabir chose to spend his final period at Maghar (in present-day Sant Kabir Nagar district, Uttar Pradesh) is well attested by reliable sources. Tradition adds that a popular belief of the time held that dying in Kashi (Varanasi) guaranteed salvation, while dying in Maghar condemned one to rebirth as a donkey. Kabir is said to have deliberately chosen to leave his body in Maghar to challenge this superstition and affirm that liberation depends on inner truth, not the place of death — this interpretation belongs to tradition, not documented history.",
          "The dispute between his Hindu and Muslim followers after his passing, and the legend of flowers found beneath the shroud — from which both a Samadhi and a Mazar came to be built — is described in full on the Maghar section of this site.",
        ],
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
      canonical: `/${locale}/sant-kabir/jivan-parichay`,
      languages: {
        hi: "/hi/sant-kabir/jivan-parichay",
        en: "/en/sant-kabir/jivan-parichay",
      },
    },
  };
}

export default async function JivanParichayPage({
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
      <SectionSubNav items={children} activeHref="/sant-kabir/jivan-parichay" />
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="max-w-2xl">
            <SectionHeading kicker={c.kicker} title={c.title} />
            <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>

            <div className="mt-10 space-y-10">
              {c.sections.map((section, i) => (
                <section key={i}>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <h2 className="font-heading text-xl font-semibold text-ink">
                      {section.heading}
                    </h2>
                    {section.badges.map((b) => (
                      <FactBadge key={b} kind={b} />
                    ))}
                  </div>
                  {section.paras.map((p, j) => (
                    <p key={j} className="mb-3 font-body leading-relaxed text-ink-soft">
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <AttributedImage image={IMAGE_SOURCES.kabirWeavingLoom} locale={locale} />
            <AttributedImage image={IMAGE_SOURCES.kabirWithRavidas} locale={locale} />
          </div>
        </div>
      </Container>
    </>
  );
}
