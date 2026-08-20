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
    kicker: "संत कबीर जी · शिक्षाएँ",
    title: "संत कबीर की शिक्षाएँ",
    lead: "कबीर की वाणी किसी एक संप्रदाय या परंपरा में बंधी नहीं है — वह सीधे मानव हृदय से बात करती है। उनकी शिक्षाओं के मूल में सत्य, प्रेम और आत्मज्ञान की खोज है, जो बाहरी कर्मकांड से कहीं ऊपर है।",
    teachings: [
      {
        title: "निर्गुण भक्ति",
        body: "कबीर भक्ति आंदोलन की निर्गुण धारा के एक प्रमुख स्तंभ माने जाते हैं — अर्थात एक निराकार, निर्गुण परम सत्ता की भक्ति, न कि किसी मूर्ति या अवतार की। वे बाहरी पूजा-पद्धति से अधिक भीतर की सीधी अनुभूति पर बल देते हैं।",
      },
      {
        title: "कर्मकांड और आडंबर की आलोचना",
        body: "कबीर ने हिंदू और मुस्लिम — दोनों धर्मों में व्याप्त आडंबरपूर्ण कर्मकांड की खुलकर आलोचना की। मूर्ति-पूजा, तीर्थाटन और जाति-आधारित कर्मकांड जितनी बेबाकी से उन्होंने ललकारे, उतनी ही स्पष्टता से नमाज़ और रोज़े के केवल बाहरी पालन को भी निरर्थक बताया — उनका आग्रह था कि सच्ची भक्ति भीतर से आनी चाहिए।",
      },
      {
        title: "जाति-भेद की समाप्ति",
        body: "कबीर ने जन्म-आधारित जाति-व्यवस्था और छुआछूत को अस्वीकार किया। उनके अनुसार मनुष्य का मूल्य उसके आचरण और ज्ञान से है, जन्म से नहीं — यह विचार उनके समय के लिए क्रांतिकारी था और आज भी उतना ही सार्थक है।",
      },
      {
        title: "गुरु का महत्व",
        body: "कबीर की वाणी में गुरु को असाधारण महत्व दिया गया है — गुरु वह है जो साधक को सत्य और परम तत्व से परिचित कराता है। बिना गुरु के मार्गदर्शन के साधक भटक सकता है।",
      },
      {
        title: "सत्य, प्रेम और आंतरिक भक्ति",
        body: "कबीर की वाणी बार-बार अहंकार त्यागने, सभी जीवों में परमात्मा को समान रूप से देखने और शास्त्रीय ज्ञान से अधिक प्रेम व सत्य के अनुभव को महत्व देने की बात करती है।",
      },
      {
        title: "हिंदू-मुस्लिम समन्वय",
        body: "प्रारंभिक ग्रंथ-परंपराओं में कबीर को एक साथ वैष्णव भक्ति परंपरा और सूफी परंपरा दोनों से जोड़ा गया है — जो उन्हें किसी एक पंथ का नहीं, बल्कि दोनों समुदायों के बीच एक सच्चे सेतु का स्थान देता है।",
      },
      {
        title: "बहु-धार्मिक विरासत",
        body: "कबीर की वाणी को लेकर उनकी पहुंच का प्रमाण यह है कि उनके पद सिख धर्मग्रंथ गुरु ग्रंथ साहिब में, संत गरीबदास जी के सतगुरु ग्रंथ साहिब में, और धर्मदास जी के कबीर सागर में भी शामिल हैं — यह विरासत मध्यकाल में भी उनके व्यापक प्रभाव को दर्शाती है।",
      },
    ],
    themesKicker: "मुख्य विषय",
    themesTitle: "कबीर वाणी के केंद्रीय भाव",
    themes: ["मानवता", "समानता", "प्रेम", "सत्य", "भक्ति", "सद्भाव", "सेवा", "आत्मज्ञान"],
  },
  en: {
    kicker: "Sant Kabir Ji · Teachings",
    title: "Teachings of Sant Kabir",
    lead: "Kabir's verses belong to no single sect or tradition — they speak directly to the human heart. At their core lies a search for truth, love and self-knowledge that rises far above external ritual.",
    teachings: [
      {
        title: "Nirguna Bhakti",
        body: "Kabir is regarded as a foundational figure of the nirguna strand of the Bhakti movement — devotion to a formless, attributeless Supreme Reality rather than to an idol or incarnation. He emphasised direct inner realisation over external worship.",
      },
      {
        title: "Critique of Ritualism",
        body: "Kabir openly criticised the empty ritualism he saw within both Hinduism and Islam. He challenged idol worship, pilgrimage-for-its-own-sake and caste-based ritual with the same directness he used to call out purely mechanical observance of namaz and roza — insisting that true devotion must come from within.",
      },
      {
        title: "Rejecting Caste Discrimination",
        body: "Kabir rejected the birth-based caste system and untouchability. He held that a person's worth lies in conduct and knowledge, not birth — a radical position for his time, and one that remains just as relevant today.",
      },
      {
        title: "The Importance of the Guru",
        body: "Kabir's verses place extraordinary importance on the guru — the one who reveals truth and the ultimate reality to the seeker. Without a guru's guidance, he held, the seeker can easily lose their way.",
      },
      {
        title: "Truth, Love & Inner Devotion",
        body: "Kabir's verses repeatedly call for dropping the ego, recognising the divine equally within every being, and valuing the direct experience of love and truth above scriptural learning alone.",
      },
      {
        title: "Hindu-Muslim Synthesis",
        body: "Early textual traditions place Kabir simultaneously within the Vaishnava Bhakti tradition and the Sufi tradition — positioning him not as belonging to one faith, but as a genuine bridge between both communities.",
      },
      {
        title: "A Multi-Faith Legacy",
        body: "The reach of Kabir's verses is evidenced by their inclusion in the Sikh scripture Guru Granth Sahib, in Sant Garibdas Ji's Satguru Granth Sahib, and in Dharamdas Ji's Kabir Sagar — a legacy that reflects his wide influence even within the medieval period itself.",
      },
    ],
    themesKicker: "Core Themes",
    themesTitle: "The central spirit of Kabir's verses",
    themes: ["Humanity", "Equality", "Love", "Truth", "Devotion", "Harmony", "Service", "Self-Knowledge"],
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
      canonical: `/${locale}/sant-kabir/shikshayein`,
      languages: { hi: "/hi/sant-kabir/shikshayein", en: "/en/sant-kabir/shikshayein" },
    },
  };
}

export default async function ShikshayeinPage({
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
      <SectionSubNav items={children} activeHref="/sant-kabir/shikshayein" />
      <Container className="py-14">
        <div className="max-w-2xl">
          <SectionHeading kicker={c.kicker} title={c.title} />
          <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>
          <FactBadge kind="verified" className="mt-4" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {c.teachings.map((teach, i) => (
            <div key={i} className="rounded-sm border border-border-soft bg-paper p-6">
              <h2 className="font-heading text-lg font-semibold text-ink">{teach.title}</h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{teach.body}</p>
            </div>
          ))}
          <div className="rounded-sm border border-border-soft">
            <AttributedImage
              image={IMAGE_SOURCES.kabirGatheringHolyMen}
              locale={locale}
              className="h-full border-0"
            />
          </div>
        </div>

        <div className="mt-14">
          <SectionHeading kicker={c.themesKicker} title={c.themesTitle} />
          <div className="mt-5 flex flex-wrap gap-2.5">
            {c.themes.map((theme) => (
              <span
                key={theme}
                className="rounded-full border border-gold/40 bg-gold-pale px-4 py-1.5 font-body text-sm text-gold"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
