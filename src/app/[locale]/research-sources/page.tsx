import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";

const content = {
  hi: {
    kicker: "पद्धति",
    introHeading: "हम जानकारी को कैसे वर्गीकृत करते हैं",
    introBody: [
      "इस वेबसाइट पर मौजूद सामग्री तीन श्रेणियों में विभाजित की जाती है, ताकि पाठक यह स्पष्ट रूप से समझ सकें कि किसी जानकारी की प्रकृति क्या है:",
    ],
    verifiedTitle: "सत्यापित (Verified)",
    verifiedBody:
      "सरकारी स्रोतों (जैसे जिला प्रशासन की आधिकारिक वेबसाइट), स्थापित विश्वकोशों (जैसे Encyclopaedia Britannica) और प्रतिष्ठित समाचार माध्यमों से प्राप्त जानकारी। ऐसी जानकारी को साइट पर 'सत्यापित' के रूप में चिह्नित किया जाता है।",
    traditionalTitle: "परंपरा / मान्यता (Traditional / Believed)",
    traditionalBody:
      "धार्मिक परंपरा, मौखिक इतिहास (oral history) एवं लोक-मान्यताओं पर आधारित जानकारी। यह जानकारी समुदाय के लिए गहरा अर्थ रखती है, परंतु स्वतंत्र ऐतिहासिक स्रोतों से इसकी पूर्ण पुष्टि नहीं होती। साइट पर ऐसी सामग्री को स्पष्ट रूप से 'परंपरा / मान्यता' के रूप में लेबल किया जाता है।",
    unverifiedTitle: "असत्यापित दावे (Unverified Claims)",
    unverifiedBody:
      "जिन दावों की पुष्टि किसी विश्वसनीय स्रोत से नहीं हो पाती, उन्हें इस वेबसाइट पर या तो शामिल नहीं किया जाता, या स्पष्ट रूप से असत्यापित/विवादित के रूप में चिह्नित किया जाता है। हम अनुमान अथवा अटकलों को तथ्य के रूप में प्रस्तुत नहीं करते।",
    sourcesHeading: "प्रयुक्त स्रोत",
    sourcesIntro:
      "इस वेबसाइट की सामग्री तैयार करने में निम्नलिखित स्रोतों का उपयोग किया गया है:",
    tableSourceHeader: "स्रोत",
    tableDescHeader: "विवरण",
    sources: [
      {
        name: "संत कबीर नगर ज़िला सरकारी पोर्टल",
        url: "https://sknagar.nic.in",
        desc: "आधिकारिक ज़िला प्रशासन वेबसाइट — मगहर/कबीर चौरा से जुड़े तथ्यों, 'यात्रा कैसे करें' एवं ज़िले के इतिहास का स्रोत।",
      },
      {
        name: "संत कबीर अकादमी",
        url: "https://santkabiracademy.ac.in",
        desc: "उत्तर प्रदेश सरकार, संस्कृति विभाग की मगहर स्थित शोध संस्था।",
      },
      {
        name: "विकिपीडिया लेख",
        url: null,
        desc: "'Kabir', 'Kabir Panth', 'Maghar, India', 'Maghar railway station', 'Maghar Mahotsav', 'Kabir Dharm Nagar Damakheda' — सामान्य संदर्भ हेतु, जहाँ संभव हो सका वहाँ सरकारी/प्राथमिक स्रोतों से क्रॉस-चेक किया गया।",
      },
      {
        name: "Encyclopaedia Britannica — \"Kabir: Indian mystic and poet\"",
        url: "https://www.britannica.com/biography/Kabir-Indian-mystic-and-poet",
        desc: "स्थापित विश्वकोश — संत कबीर जी के जीवन एवं शिक्षाओं पर सामान्य ऐतिहासिक संदर्भ।",
      },
      {
        name: "Wikimedia Commons",
        url: null,
        desc: "लाइसेंसयुक्त छवियों के लिए। पूर्ण छवि-श्रेय सूची हेतु देखें: ",
        linkLabel: "छवि स्रोत एवं एट्रिब्यूशन पृष्ठ",
        linkHref: "/media-attribution",
      },
      {
        name: "समाचार कवरेज (PTI/Business Standard, Amar Ujala, National Herald एवं अन्य)",
        url: null,
        desc: "समकालीन घटनाओं एवं महंत विचार दास जी की सार्वजनिक गतिविधियों हेतु — इन्हें व्यक्तिगत रूप से उद्धृत करने के बजाय सामान्यतः '2018–2025 के दौरान विभिन्न स्वतंत्र समाचार रिपोर्टें' के रूप में वर्णित किया गया है। साइट प्रशासकों द्वारा एक विस्तृत आंतरिक स्रोत-लॉग बनाए रखा जाता है।",
      },
    ],
    disputeNoteHeading: "जहाँ जानकारी अनिश्चित या विवादित है",
    disputeNoteBody:
      "जहाँ विश्वसनीय जानकारी नहीं मिल सकी है, या जो सक्रिय रूप से विवादित है (उदाहरण के लिए, कबीर पंथ की संस्थाओं के भीतर उत्तराधिकार/वंश-परंपरा से जुड़े सटीक दावे), वहाँ यह वेबसाइट उसे स्थापित तथ्य के रूप में प्रस्तुत करने से बचती है।",
  },
  en: {
    kicker: "Methodology",
    introHeading: "How We Categorise Information",
    introBody: [
      "Content on this website is divided into three categories so that readers can clearly understand the nature of any given piece of information:",
    ],
    verifiedTitle: "Verified",
    verifiedBody:
      "Information drawn from government sources (such as official district administration websites), established encyclopedias (such as Encyclopaedia Britannica), and reputable news outlets. Such information is marked as \"Verified\" on the site.",
    traditionalTitle: "Traditional / Believed",
    traditionalBody:
      "Information based on religious tradition, oral history, and community belief. This information holds deep meaning for the community, but is not fully corroborated by independent historical sources. Such content is clearly labelled \"Tradition / Believed\" throughout the site.",
    unverifiedTitle: "Unverified Claims",
    unverifiedBody:
      "Claims that cannot be corroborated by a credible source are either omitted from this website, or clearly marked as unverified/disputed. We do not present speculation or conjecture as fact.",
    sourcesHeading: "Sources Used",
    sourcesIntro: "The following sources were used in building this website's content:",
    tableSourceHeader: "Source",
    tableDescHeader: "Description",
    sources: [
      {
        name: "Sant Kabir Nagar District Government Portal",
        url: "https://sknagar.nic.in",
        desc: "Official district administration website — source for Maghar/Kabir Chaura facts, \"How to Reach\", and district history.",
      },
      {
        name: "Sant Kabir Academy",
        url: "https://santkabiracademy.ac.in",
        desc: "A UP Government, Department of Culture research institution based in Maghar.",
      },
      {
        name: "Wikipedia articles",
        url: null,
        desc: "\"Kabir\", \"Kabir Panth\", \"Maghar, India\", \"Maghar railway station\", \"Maghar Mahotsav\", \"Kabir Dharm Nagar Damakheda\" — used for general reference, cross-checked against primary/government sources where possible.",
      },
      {
        name: "Encyclopaedia Britannica — \"Kabir: Indian mystic and poet\"",
        url: "https://www.britannica.com/biography/Kabir-Indian-mystic-and-poet",
        desc: "An established encyclopedia — general historical reference on Sant Kabir Ji's life and teachings.",
      },
      {
        name: "Wikimedia Commons",
        url: null,
        desc: "For licensed images. See the full image-credit list on the ",
        linkLabel: "Image Sources & Attribution page",
        linkHref: "/media-attribution",
      },
      {
        name: "News coverage (PTI/Business Standard, Amar Ujala, National Herald, and others)",
        url: null,
        desc: "For contemporary events and Mahant Vichar Das Ji's public activities — described generically as \"multiple independent news reports (2018–2025)\" rather than listing every URL inline. A detailed internal source log is maintained by the site administrators.",
      },
    ],
    disputeNoteHeading: "Where Information Is Uncertain or Disputed",
    disputeNoteBody:
      "Where reliable information could not be found, or is actively disputed (for example, exact succession/lineage claims within Kabir Panth institutions), this website avoids asserting it as settled fact.",
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
    title: isHi ? "स्रोत एवं शोध — संत कबीर सेवा समिति" : "Research & Sources — Sant Kabir Sewa Samiti",
    description: isHi
      ? "इस वेबसाइट की सामग्री किन स्रोतों पर आधारित है, इसकी पूरी जानकारी।"
      : "A full account of the sources this website's content is based on.",
    alternates: {
      canonical: `/${locale}/research-sources`,
      languages: { hi: "/hi/research-sources", en: "/en/research-sources" },
    },
  };
}

export default async function ResearchSourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ResearchSources");
  const c = content[locale as "hi" | "en"];

  return (
    <Container className="py-16 max-w-3xl">
      <SectionHeading kicker={c.kicker} title={t("title")} />
      <p className="mt-4 font-body text-ink-soft">{t("subtitle")}</p>

      <div className="motif-divider my-10" />

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-ink">{c.introHeading}</h2>
        {c.introBody.map((p, i) => (
          <p key={i} className="font-body text-ink-soft">
            {p}
          </p>
        ))}
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-1">
        <div className="rounded-sm border border-border-soft bg-paper p-5">
          <h3 className="font-heading text-lg font-semibold text-ink">{c.verifiedTitle}</h3>
          <p className="mt-2 font-body text-ink-soft">{c.verifiedBody}</p>
        </div>
        <div className="rounded-sm border border-border-soft bg-paper p-5">
          <h3 className="font-heading text-lg font-semibold text-ink">{c.traditionalTitle}</h3>
          <p className="mt-2 font-body text-ink-soft">{c.traditionalBody}</p>
        </div>
        <div className="rounded-sm border border-border-soft bg-paper p-5">
          <h3 className="font-heading text-lg font-semibold text-ink">{c.unverifiedTitle}</h3>
          <p className="mt-2 font-body text-ink-soft">{c.unverifiedBody}</p>
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-ink">{c.sourcesHeading}</h2>
        <p className="font-body text-ink-soft">{c.sourcesIntro}</p>

        <div className="overflow-x-auto">
          <table className="mt-4 w-full border-collapse text-left font-body text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-semibold text-ink">{c.tableSourceHeader}</th>
                <th className="py-2 font-semibold text-ink">{c.tableDescHeader}</th>
              </tr>
            </thead>
            <tbody>
              {c.sources.map((s, i) => (
                <tr key={i} className="border-b border-border-soft align-top">
                  <td className="py-3 pr-4 font-medium text-ink">
                    {s.url ? (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-saffron underline underline-offset-2"
                      >
                        {s.name}
                      </a>
                    ) : (
                      s.name
                    )}
                  </td>
                  <td className="py-3 text-ink-soft">
                    {s.desc}
                    {"linkHref" in s && s.linkHref ? (
                      <Link
                        href={s.linkHref}
                        className="text-saffron underline underline-offset-2"
                      >
                        {s.linkLabel}
                      </Link>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-ink">{c.disputeNoteHeading}</h2>
        <p className="font-body text-ink-soft">{c.disputeNoteBody}</p>
      </section>
    </Container>
  );
}
