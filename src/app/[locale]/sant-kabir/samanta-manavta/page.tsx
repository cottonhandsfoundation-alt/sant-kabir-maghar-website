import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactBadge } from "@/components/ui/FactBadge";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { NAV_ITEMS } from "@/lib/nav";
import { DOHAS } from "@/content/dohas";

const content = {
  hi: {
    kicker: "संत कबीर जी · समानता और मानवता",
    title: "समानता और मानवता",
    lead: "कबीर का सबसे क्रांतिकारी संदेश शायद यही है — मनुष्य का मूल्य उसकी जाति, धर्म या जन्म से नहीं, बल्कि उसके आचरण, ज्ञान और हृदय की सच्चाई से आंका जाना चाहिए।",
    body: [
      "पंद्रहवीं-सोलहवीं शताब्दी के भारत में, जब सामाजिक व्यवस्था जन्म-आधारित जाति-भेद पर गहराई से टिकी थी, कबीर ने बेबाकी से इस ढांचे को चुनौती दी। स्वयं एक निम्न-मानी जाने वाली जुलाहा जाति में पले-बढ़े कबीर ने न केवल हिंदू वर्ण-व्यवस्था बल्कि किसी भी प्रकार के जन्म-आधारित भेदभाव को अस्वीकार किया।",
      "उनकी दृष्टि में सच्चा साधु या ज्ञानी वह है जिसके पास ज्ञान और सद्गुण हों — जाति, कुल या धर्म उसकी पहचान नहीं। यह विचार उस युग में असाधारण साहस की मांग करता था, और आज भी उतना ही प्रासंगिक है।",
      "कबीर की मानवतावादी दृष्टि केवल जाति तक सीमित नहीं थी — वे हर मनुष्य के भीतर एक ही परम सत्ता का वास मानते थे, चाहे वह किसी भी धर्म, जाति या सामाजिक स्थिति का हो। यही भाव उनकी वाणी को आज भी सार्वभौमिक बनाता है।",
    ],
    versesTitle: "इस भाव को व्यक्त करते कुछ दोहे",
  },
  en: {
    kicker: "Sant Kabir Ji · Equality & Humanity",
    title: "Equality and Humanity",
    lead: "Perhaps Kabir's most radical message is this: a person's worth should be measured by their conduct, knowledge and sincerity of heart — not by caste, religion or birth.",
    body: [
      "In 15th–16th century India, when the social order rested deeply on birth-based caste distinctions, Kabir openly challenged this structure. Having himself grown up within the low-ranked weaver caste, he rejected not only the Hindu varna system but any form of birth-based discrimination.",
      "In his view, a true sadhu or a truly wise person is one who possesses knowledge and virtue — caste, lineage or religion is not their defining mark. This was a position of extraordinary courage for its time, and remains just as relevant today.",
      "Kabir's humanist vision extended beyond caste alone — he held that the same ultimate reality dwells within every human being, regardless of religion, caste or social standing. It is this spirit that keeps his verses universal even now.",
    ],
    versesTitle: "Verses expressing this spirit",
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
      canonical: `/${locale}/sant-kabir/samanta-manavta`,
      languages: {
        hi: "/hi/sant-kabir/samanta-manavta",
        en: "/en/sant-kabir/samanta-manavta",
      },
    },
  };
}

export default async function SamantaManavtaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale as "hi" | "en"];
  const children = NAV_ITEMS.find((i) => i.href === "/sant-kabir")?.children ?? [];
  const verses = DOHAS.filter((d) => d.theme === "manavta" || d.theme === "jaati");

  return (
    <>
      <SectionSubNav items={children} activeHref="/sant-kabir/samanta-manavta" />
      <Container className="py-14">
        <div className="max-w-2xl">
          <SectionHeading kicker={c.kicker} title={c.title} />
          <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>
          <FactBadge kind="verified" className="mt-4" />
          {c.body.map((p, i) => (
            <p key={i} className="mt-4 font-body leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="font-heading text-xl font-semibold text-ink">{c.versesTitle}</h2>
          <div className="motif-divider my-4" />
          <div className="grid gap-5 md:grid-cols-2">
            {verses.map((verse, i) => (
              <blockquote key={i} className="border-l-2 border-saffron/60 py-1 pl-5">
                <p className="font-heading text-lg leading-relaxed text-ink">{verse.hindiText}</p>
                <p className="mt-2 font-body text-sm text-ink-soft">
                  {locale === "hi" ? verse.meaningHindi : verse.meaningEnglish}
                </p>
              </blockquote>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
