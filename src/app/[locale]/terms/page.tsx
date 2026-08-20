import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteSettings } from "@/lib/settings";

const jurisdictionPlaceholder = {
  hi: "प्लेसहोल्डर — क्षेत्राधिकार दर्ज करें",
  en: "PLACEHOLDER — INSERT JURISDICTION",
} as const;

function content(orgName: string) {
  return {
    hi: {
      kicker: "नीतियां",
      lastUpdated: "अंतिम अद्यतन: 19 अगस्त 2026",
      sections: [
        {
          heading: "स्वीकृति",
          body: [
            `इस वेबसाइट (${orgName} द्वारा संचालित) का उपयोग करके, आप इन नियमों एवं शर्तों से बाध्य होने के लिए सहमत होते हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया इस वेबसाइट का उपयोग न करें।`,
          ],
        },
        {
          heading: "वेबसाइट का उद्देश्य",
          body: [
            "यह वेबसाइट संत कबीर जी की शिक्षाओं, मगहर से जुड़ी जानकारी, संस्था की सेवा एवं आयोजन गतिविधियों की जानकारी प्रदान करने, तथा ऑनलाइन दान की सुविधा हेतु बनाई गई है। यह किसी सरकारी निकाय का आधिकारिक पोर्टल नहीं है।",
          ],
        },
        {
          heading: "सामग्री का उपयोग",
          body: [
            "इस वेबसाइट पर उपलब्ध पाठ्य सामग्री, चित्र एवं अन्य सामग्री व्यक्तिगत, गैर-व्यावसायिक उपयोग हेतु उपलब्ध कराई गई है। बिना पूर्व लिखित अनुमति के इस सामग्री का व्यावसायिक पुनरुत्पादन, वितरण अथवा संशोधन न करें। कुछ छवियों पर विशिष्ट लाइसेंस शर्तें लागू हो सकती हैं — कृपया छवि स्रोत एवं एट्रिब्यूशन पृष्ठ देखें।",
          ],
        },
        {
          heading: "सामग्री की सटीकता",
          body: [
            "हम इस वेबसाइट पर सामग्री को सटीक एवं अद्यतन रखने का प्रयास करते हैं, विशेष रूप से ऐतिहासिक/धार्मिक जानकारी को सत्यापित एवं परंपरा-आधारित जानकारी में स्पष्ट रूप से विभाजित करके (देखें: स्रोत एवं शोध पृष्ठ)। फिर भी, हम पूर्ण सटीकता, पूर्णता अथवा वर्तमानता की गारंटी नहीं देते। दर्शन/यात्रा व्यवस्था से संबंधित जानकारी यात्रा से पूर्व स्वतंत्र रूप से सत्यापित की जानी चाहिए।",
          ],
        },
        {
          heading: "उपयोगकर्ता आचरण",
          body: [
            "इस वेबसाइट का उपयोग करते समय आप सहमत होते हैं कि आप किसी भी अवैध, अपमानजनक, अथवा वेबसाइट की सुरक्षा को प्रभावित करने वाली गतिविधि में संलग्न नहीं होंगे, न ही किसी फ़ॉर्म के माध्यम से भ्रामक अथवा झूठी जानकारी प्रस्तुत करेंगे।",
          ],
        },
        {
          heading: "बाहरी लिंक",
          body: [
            "यह वेबसाइट कभी-कभी बाहरी वेबसाइटों (जैसे सरकारी पोर्टल, समाचार लेख, यूट्यूब वीडियो) के लिंक प्रदान कर सकती है। हम ऐसी बाहरी वेबसाइटों की सामग्री अथवा गोपनीयता प्रथाओं के लिए उत्तरदायी नहीं हैं।",
          ],
        },
        {
          heading: "दायित्व की सीमा",
          body: [
            "कानून द्वारा अनुमत सीमा तक, संस्था इस वेबसाइट के उपयोग से उत्पन्न किसी भी प्रत्यक्ष, अप्रत्यक्ष, आकस्मिक अथवा परिणामी क्षति के लिए उत्तरदायी नहीं होगी।",
          ],
        },
        {
          heading: "नियमों में परिवर्तन",
          body: [
            "हम इन नियमों एवं शर्तों को समय-समय पर अद्यतन कर सकते हैं। किसी भी परिवर्तन के बाद वेबसाइट का निरंतर उपयोग संशोधित शर्तों की स्वीकृति माना जाएगा।",
          ],
        },
        {
          heading: "शासकीय कानून एवं क्षेत्राधिकार",
          body: [
            `ये नियम भारत के लागू कानूनों के अनुसार शासित होंगे। इनसे जुड़े किसी भी विवाद के लिए ${jurisdictionPlaceholder.hi} की अदालतों को विशेष क्षेत्राधिकार प्राप्त होगा।`,
          ],
        },
      ],
    },
    en: {
      kicker: "Policies",
      lastUpdated: "Last updated: 19 August 2026",
      sections: [
        {
          heading: "Acceptance",
          body: [
            `By using this website (operated by ${orgName}), you agree to be bound by these Terms & Conditions. If you do not agree with these terms, please do not use this website.`,
          ],
        },
        {
          heading: "Purpose of This Website",
          body: [
            "This website is built to provide information about Sant Kabir Ji's teachings, Maghar, the organisation's seva and event activities, and to facilitate online donations. It is not the official portal of any government body.",
          ],
        },
        {
          heading: "Use of Content",
          body: [
            "The text, images, and other content on this website are made available for personal, non-commercial use. Do not commercially reproduce, distribute, or modify this content without prior written permission. Some images may carry specific license terms — please see the Image Sources & Attribution page.",
          ],
        },
        {
          heading: "Accuracy of Content",
          body: [
            "We make reasonable efforts to keep the content on this website accurate and up to date, in particular by clearly separating historical/religious content into verified and tradition-based categories (see the Research & Sources page). However, we do not guarantee complete accuracy, completeness, or currency. Information relating to darshan/travel arrangements should be independently verified before travel.",
          ],
        },
        {
          heading: "User Conduct",
          body: [
            "By using this website, you agree not to engage in any unlawful, abusive, or activity that compromises the website's security, and not to submit misleading or false information through any form.",
          ],
        },
        {
          heading: "External Links",
          body: [
            "This website may occasionally link to external websites (such as government portals, news articles, YouTube videos). We are not responsible for the content or privacy practices of such external websites.",
          ],
        },
        {
          heading: "Limitation of Liability",
          body: [
            "To the extent permitted by law, the organisation shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website.",
          ],
        },
        {
          heading: "Changes to These Terms",
          body: [
            "We may update these Terms & Conditions from time to time. Continued use of the website after any change constitutes acceptance of the revised terms.",
          ],
        },
        {
          heading: "Governing Law & Jurisdiction",
          body: [
            `These terms shall be governed by the applicable laws of India. The courts of ${jurisdictionPlaceholder.en} shall have exclusive jurisdiction over any disputes arising from them.`,
          ],
        },
      ],
    },
  } as const;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHi = locale === "hi";
  return {
    title: isHi ? "नियम एवं शर्तें — संत कबीर सेवा समिति" : "Terms & Conditions — Sant Kabir Sewa Samiti",
    description: isHi
      ? "इस वेबसाइट के उपयोग हेतु सामान्य नियम एवं शर्तें।"
      : "General terms and conditions governing the use of this website.",
    alternates: {
      canonical: `/${locale}/terms`,
      languages: { hi: "/hi/terms", en: "/en/terms" },
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");
  const settings = await getSiteSettings();
  const isHi = locale === "hi";
  const orgName = isHi ? settings.org_name_hi : settings.org_name_en;
  const c = content(orgName)[locale as "hi" | "en"];

  return (
    <Container className="py-16 max-w-3xl">
      <SectionHeading kicker={c.kicker} title={t("terms")} />
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
        </section>
      ))}
    </Container>
  );
}
