import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";

const content = {
  hi: {
    kicker: "नीतियां",
    lastUpdated: "अंतिम अद्यतन: 19 अगस्त 2026",
    sections: [
      {
        heading: "छवि श्रेय की प्रक्रिया",
        body: [
          "इस वेबसाइट पर उपयोग की गई छवियाँ विभिन्न स्रोतों से ली गई हैं, जिनमें संस्था द्वारा स्वयं ली गई तस्वीरें, सार्वजनिक स्रोत एवं लाइसेंसयुक्त सामग्री शामिल हैं। जहाँ लाइसेंस की शर्तों के अनुसार श्रेय (attribution) आवश्यक है, वहाँ प्रत्येक छवि के साथ गैलरी में विस्तृत श्रेय जानकारी दी जाती है।",
        ],
      },
      {
        heading: "Wikimedia Commons एवं CC BY-SA लाइसेंस",
        body: [
          "इस वेबसाइट पर कुछ छवियाँ Wikimedia Commons से ली गई हैं, जो सामान्यतः Creative Commons Attribution-ShareAlike (CC BY-SA) अथवा समान लाइसेंस के अंतर्गत उपलब्ध हैं। ऐसे लाइसेंस के अंतर्गत मूल फ़ोटोग्राफर/योगदानकर्ता का नाम एवं लाइसेंस प्रकार बताना आवश्यक होता है। हम इस आवश्यकता का पालन करने हेतु प्रतिबद्ध हैं।",
        ],
      },
      {
        heading: "विस्तृत श्रेय सूची कहाँ देखें",
        body: [
          "प्रत्येक छवि हेतु आवश्यक होने पर विस्तृत, प्रति-छवि श्रेय जानकारी गैलरी में संबंधित छवि के साथ प्रदर्शित की जाती है। इसके अतिरिक्त, संस्था आंतरिक रूप से एक पूर्ण छवि-स्रोत सूची फ़ाइल (IMAGE_SOURCES.md) बनाए रखती है, जिसमें प्रत्येक छवि का स्रोत, लाइसेंस एवं मूल योगदानकर्ता दर्ज किया जाता है।",
        ],
      },
      {
        heading: "उपयोग अधिकार से जुड़ी चिंता",
        body: [
          "यदि आपको लगता है कि इस वेबसाइट पर किसी छवि का श्रेय गलत दिया गया है, अथवा किसी छवि के उपयोग को लेकर आपकी कोई चिंता है, तो कृपया हमारे संपर्क पृष्ठ के माध्यम से हमसे संपर्क करें — हम शीघ्र उचित सुधार करेंगे।",
        ],
      },
      {
        heading: "संबंधित पृष्ठ",
        body: ["इस वेबसाइट की सामग्री के व्यापक स्रोतों की जानकारी हेतु कृपया देखें:"],
        link: { href: "/research-sources", label: "स्रोत एवं शोध पृष्ठ" },
      },
    ],
  },
  en: {
    kicker: "Policies",
    lastUpdated: "Last updated: 19 August 2026",
    sections: [
      {
        heading: "How Image Credits Work",
        body: [
          "Images used on this website are drawn from a variety of sources, including photographs taken by the organisation itself, public sources, and licensed material. Where a license requires attribution, detailed credit information is shown alongside the relevant image in the Gallery.",
        ],
      },
      {
        heading: "Wikimedia Commons & CC BY-SA Licensing",
        body: [
          "Some images on this website are sourced from Wikimedia Commons, which are typically available under a Creative Commons Attribution-ShareAlike (CC BY-SA) or similar license. Such licenses require naming the original photographer/contributor and the license type. We are committed to honouring this requirement.",
        ],
      },
      {
        heading: "Where to Find the Detailed Credit List",
        body: [
          "Where required for a given image, detailed, per-image attribution is shown alongside each image in the Gallery. In addition, the organisation internally maintains a complete image-source list file (IMAGE_SOURCES.md), recording the source, license, and original contributor for every image.",
        ],
      },
      {
        heading: "Concerns About Usage Rights",
        body: [
          "If you believe an image on this website is credited incorrectly, or have any concern about the use of an image, please contact us via our contact page — we will make an appropriate correction promptly.",
        ],
      },
      {
        heading: "Related Page",
        body: ["For a broader account of the sources behind this website's content, please see:"],
        link: { href: "/research-sources", label: "the Research & Sources page" },
      },
    ],
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHi = locale === "hi";
  return {
    title: isHi
      ? "छवि स्रोत एवं एट्रिब्यूशन — संत कबीर सेवा समिति"
      : "Image Sources & Attribution — Sant Kabir Sewa Samiti",
    description: isHi
      ? "इस वेबसाइट पर उपयोग की गई छवियों के स्रोत एवं श्रेय की जानकारी।"
      : "Information about the sources and credits for images used on this website.",
    alternates: {
      canonical: `/${locale}/media-attribution`,
      languages: { hi: "/hi/media-attribution", en: "/en/media-attribution" },
    },
  };
}

export default async function MediaAttributionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");
  const c = content[locale as "hi" | "en"];

  return (
    <Container className="py-16 max-w-3xl">
      <SectionHeading kicker={c.kicker} title={t("mediaAttribution")} />
      <p className="mt-4 font-body text-sm text-ink-faint">{c.lastUpdated}</p>

      <div className="motif-divider my-10" />

      {c.sections.map((s, i) => (
        <section key={i} className="mt-10 space-y-4 first:mt-0">
          <h2 className="font-heading text-2xl font-semibold text-ink">{s.heading}</h2>
          {s.body.map((p, j) => (
            <p key={j} className="font-body text-ink-soft">
              {p}
            </p>
          ))}
          {"link" in s && s.link ? (
            <p className="font-body">
              <Link href={s.link.href} className="text-saffron underline underline-offset-2">
                {s.link.label}
              </Link>
            </p>
          ) : null}
        </section>
      ))}
    </Container>
  );
}
