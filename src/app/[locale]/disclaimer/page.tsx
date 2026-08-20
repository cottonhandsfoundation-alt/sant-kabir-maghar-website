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
        heading: "सामान्य अस्वीकरण",
        body: [
          "यह वेबसाइट किसी सरकारी निकाय, ज़िला प्रशासन अथवा किसी एकल आधिकारिक धार्मिक संस्था का प्रतिनिधित्व नहीं करती। यह संत कबीर जी की शिक्षाओं, मगहर से जुड़ी जानकारी एवं इस संस्था की गतिविधियों के बारे में सूचना प्रदान करने हेतु बनाई गई एक स्वतंत्र वेबसाइट है।",
        ],
      },
      {
        heading: "ऐतिहासिक एवं धार्मिक सामग्री",
        body: [
          "इस वेबसाइट पर मौजूद ऐतिहासिक एवं धार्मिक सामग्री में परंपरा/मान्यता पर आधारित जानकारी और स्वतंत्र रूप से सत्यापित जानकारी, दोनों शामिल हो सकती हैं। हम इन्हें साइट पर स्पष्ट रूप से अलग-अलग लेबल करने का प्रयास करते हैं — इस वर्गीकरण की पद्धति के बारे में विस्तृत जानकारी हेतु कृपया हमारा",
          null,
        ],
        linkText: "स्रोत एवं शोध पृष्ठ",
        afterLink: "देखें। जहाँ किसी दावे पर मतभेद अथवा अनिश्चितता है, हम उसे निश्चित तथ्य के रूप में प्रस्तुत करने से बचते हैं।",
      },
      {
        heading: "व्यक्तियों एवं संबद्धता का उल्लेख",
        body: [
          "इस वेबसाइट पर किसी व्यक्ति (जैसे महंत विचार दास जी) के संदर्भ सार्वजनिक रूप से उपलब्ध समाचार कवरेज एवं सामान्य जानकारी पर आधारित हैं। जहाँ औपचारिक पदनाम, उत्तराधिकार अथवा संस्थागत संबद्धता से जुड़ी जानकारी अस्पष्ट अथवा असत्यापित है, वहाँ हम सावधानीपूर्वक भाषा का उपयोग करते हैं तथा किसी निश्चित दावे का प्रतिपादन नहीं करते।",
        ],
      },
      {
        heading: "यात्रा एवं दर्शन संबंधी जानकारी",
        body: [
          "मंदिर/समाधि स्थल के दर्शन समय, यात्रा मार्ग एवं आयोजन तिथियों जैसी जानकारी समय के साथ बदल सकती है। कृपया यात्रा से पूर्व वर्तमान व्यवस्था की स्वतंत्र रूप से पुष्टि करें।",
        ],
      },
      {
        heading: "बाहरी सामग्री",
        body: [
          "इस वेबसाइट पर उल्लिखित अथवा लिंक की गई बाहरी वेबसाइटों, समाचार लेखों अथवा वीडियो की सामग्री हेतु हम उत्तरदायी नहीं हैं। ऐसी सामग्री संबंधित मूल स्रोत की संपत्ति एवं उत्तरदायित्व है।",
        ],
      },
      {
        heading: "व्यावसायिक सलाह नहीं",
        body: [
          "इस वेबसाइट पर उपलब्ध कोई भी जानकारी कानूनी, वित्तीय अथवा चिकित्सकीय सलाह के रूप में नहीं ली जानी चाहिए। ऐसी किसी भी आवश्यकता हेतु कृपया संबंधित क्षेत्र के योग्य विशेषज्ञ से परामर्श लें।",
        ],
      },
    ],
  },
  en: {
    kicker: "Policies",
    lastUpdated: "Last updated: 19 August 2026",
    sections: [
      {
        heading: "General Disclaimer",
        body: [
          "This website does not represent any government body, district administration, or a single official religious institution. It is an independent website built to provide information about Sant Kabir Ji's teachings, Maghar, and this organisation's activities.",
        ],
      },
      {
        heading: "Historical & Religious Content",
        body: [
          "Historical and religious content on this website may include both tradition/belief-based information and independently verified information. We attempt to clearly label these separately throughout the site — for details of this classification approach, please see our",
          null,
        ],
        linkText: "Research & Sources page",
        afterLink:
          ". Where a claim is disputed or uncertain, we avoid presenting it as settled fact.",
      },
      {
        heading: "References to Individuals & Affiliation",
        body: [
          "References to any individual on this website (such as Mahant Vichar Das Ji) are based on publicly available news coverage and general information. Where information about formal designation, succession, or institutional affiliation is unclear or unverified, we use careful language and do not assert a definite claim.",
        ],
      },
      {
        heading: "Travel & Darshan Information",
        body: [
          "Information such as temple/samadhi darshan timings, travel routes, and event dates may change over time. Please independently confirm current arrangements before travelling.",
        ],
      },
      {
        heading: "External Content",
        body: [
          "We are not responsible for the content of external websites, news articles, or videos referenced or linked on this website. Such content is the property and responsibility of its respective original source.",
        ],
      },
      {
        heading: "Not Professional Advice",
        body: [
          "No information on this website should be taken as legal, financial, or medical advice. For any such need, please consult a qualified professional in the relevant field.",
        ],
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
    title: isHi ? "अस्वीकरण — संत कबीर सेवा समिति" : "Disclaimer — Sant Kabir Sewa Samiti",
    description: isHi
      ? "इस वेबसाइट की सामग्री एवं इसकी सीमाओं के बारे में अस्वीकरण।"
      : "A disclaimer regarding this website's content and its limitations.",
    alternates: {
      canonical: `/${locale}/disclaimer`,
      languages: { hi: "/hi/disclaimer", en: "/en/disclaimer" },
    },
  };
}

export default async function DisclaimerPage({
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
      <SectionHeading kicker={c.kicker} title={t("disclaimer")} />
      <p className="mt-4 font-body text-sm text-ink-faint">{c.lastUpdated}</p>

      <div className="motif-divider my-10" />

      {c.sections.map((s, i) => (
        <section key={i} className="mt-10 space-y-4 first:mt-0">
          <h2 className="font-heading text-2xl font-semibold text-ink">{s.heading}</h2>
          {s.body.map((p, j) =>
            p === null ? null : (
              <p key={j} className="font-body text-ink-soft">
                {p}
                {j === s.body.length - 2 && "linkText" in s ? (
                  <>
                    {" "}
                    <Link href="/research-sources" className="text-saffron underline underline-offset-2">
                      {s.linkText}
                    </Link>
                    {s.afterLink}
                  </>
                ) : null}
              </p>
            ),
          )}
        </section>
      ))}
    </Container>
  );
}
