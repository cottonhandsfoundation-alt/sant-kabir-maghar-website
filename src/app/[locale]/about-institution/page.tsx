import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { getSiteSettings } from "@/lib/settings";

const content = {
  hi: {
    kicker: "पारदर्शिता",
    legalNameHeading: "पंजीकृत नाम",
    legalNameNote:
      "नीचे दिया गया नाम संस्था की वेबसाइट सेटिंग्स से लिया गया है। जहाँ जानकारी अभी सत्यापित नहीं हुई है, वहाँ यह स्पष्ट रूप से दर्शाया गया है।",
    addressHeading: "पंजीकृत पता",
    leadershipHeading: "नेतृत्व एवं संबद्धता",
    leadershipBody: [
      "महंत विचार दास जी को समाचार माध्यमों में सार्वजनिक रूप से मगहर स्थित कबीर चौरा से जुड़े धर्मगुरु के रूप में संदर्भित किया जाता रहा है। कबीर पंथ की विभिन्न शाखाओं और संस्थानों के भीतर औपचारिक उत्तराधिकार, पदनाम अथवा पंजीकृत ट्रस्ट के सटीक नाम को लेकर सार्वजनिक रूप से उपलब्ध जानकारी में स्पष्टता एवं एकरूपता का अभाव है।",
      "इस वेबसाइट की नीति यह है कि जब तक किसी तथ्य की स्वतंत्र रूप से पुष्टि न हो जाए, तब तक उसे निश्चित सत्य के रूप में प्रस्तुत नहीं किया जाएगा। अतः हम यहाँ किसी एक विशिष्ट पंजीकृत संस्थागत नाम या औपचारिक उत्तराधिकार-दावे का दावा नहीं करते, बल्कि उपलब्ध सार्वजनिक समाचार कवरेज के अनुसार संबद्धता का उल्लेख करते हैं। अधिक जानकारी के लिए कृपया हमारा",
      null,
    ],
    researchLinkText: "स्रोत एवं शोध पृष्ठ",
    leadershipAfterLink: "देखें।",
    missionHeading: "उद्देश्य / मिशन",
    missionBody: [
      "संत कबीर जी की वाणी मानवता, समानता, सत्य और सद्भाव का संदेश देती है — जाति, धर्म और सम्प्रदाय के भेद से ऊपर उठकर मनुष्यता की सेवा। इस भावना से प्रेरित होकर यह संस्था मगहर में सेवा, सत्संग एवं सामाजिक कल्याण से जुड़ी गतिविधियों में सहभागी है।",
      "हम यह स्पष्ट करना चाहते हैं कि यह वेबसाइट संत कबीर जी की शिक्षाओं की व्यापक भावना को सामान्य रूप में प्रस्तुत करती है; यह किसी एक सम्प्रदाय, शाखा या व्याख्या को अंतिम अथवा एकमात्र प्रामाणिक व्याख्या होने का दावा नहीं करती।",
    ],
    activitiesHeading: "गतिविधियाँ",
    activitiesBody:
      "संस्था से जुड़ी सेवा एवं आयोजन गतिविधियों का विस्तृत विवरण नीचे दिए गए पृष्ठों पर उपलब्ध है।",
    activitiesLinkLabel: "गतिविधियाँ देखें",
    sevaLinkLabel: "सेवा कार्य देखें",
    contactHeading: "संपर्क जानकारी",
    contactAddressLabel: "पता",
    contactPhoneLabel: "फ़ोन",
    contactEmailLabel: "ईमेल",
    donationHeading: "दान की पारदर्शिता",
    donationBody: [
      "इस वेबसाइट के माध्यम से प्राप्त दान का उपयोग इस साइट पर सूचीबद्ध सेवा, सत्संग एवं धार्मिक-सामाजिक गतिविधियों के संचालन एवं रखरखाव हेतु किया जाता है। हम यह स्पष्ट करते हैं कि वर्तमान में हम किसी विशिष्ट प्रतिशत या मद-वार निधि आवंटन (fund allocation) का दावा नहीं कर रहे — यह एक सामान्य उद्देश्य-कथन है, विस्तृत लेखा-विवरण नहीं।",
      "दान संबंधी नियम एवं शर्तों के लिए कृपया हमारा दान नियम एवं शर्तें पृष्ठ देखें।",
    ],
    financialHeading: "वित्तीय पारदर्शिता",
    financialBody: [
      "संस्था अपनी ऑनलाइन पारदर्शिता प्रक्रियाओं को क्रमशः औपचारिक रूप दे रही है। विस्तृत वित्तीय विवरण (आय-व्यय विवरण, ऑडिट रिपोर्ट आदि) फिलहाल अनुरोध पर उपलब्ध कराए जा सकते हैं, और भविष्य में इन्हें इस वेबसाइट पर प्रकाशित करने की योजना है।",
      "यदि आप विस्तृत वित्तीय जानकारी चाहते हैं, तो कृपया ऊपर दी गई संपर्क जानकारी के माध्यम से हमसे संपर्क करें।",
    ],
    registrationHeading: "पंजीकरण एवं कर-छूट स्थिति",
    registrationNumberLabel: "पंजीकरण क्रमांक",
    panLabel: "पैन (PAN)",
    status80gLabel: "80G स्थिति",
    status80gEligible: "80G के अंतर्गत पात्र (सत्यापित)",
    status80gPending: "सत्यापन लंबित / अभी पुष्टि नहीं हुई",
    number80gLabel: "80G क्रमांक",
    number12aLabel: "12A क्रमांक",
    fcraLabel: "FCRA क्रमांक",
    notAvailable: "उपलब्ध नहीं / अभी दर्ज नहीं किया गया",
  },
  en: {
    kicker: "Transparency",
    legalNameHeading: "Registered Name",
    legalNameNote:
      "The name below is drawn from the organisation's site settings. Where information has not yet been verified, this is clearly marked.",
    addressHeading: "Registered Address",
    leadershipHeading: "Leadership & Affiliation",
    leadershipBody: [
      "Mahant Vichar Das Ji has been publicly referred to in press coverage as a spiritual figure associated with Kabir Chaura, Maghar. Publicly available information about formal succession, designations, or the precise name of any registered trust within the various branches and institutions of the Kabir Panth is not fully clear or consistent.",
      "This website's policy is not to present a fact as settled unless it can be independently confirmed. We therefore do not assert a single specific registered institutional name or a formal succession claim here, and instead describe the affiliation as reported in available public news coverage. For more detail, please see our",
      null,
    ],
    researchLinkText: "Research & Sources page",
    leadershipAfterLink: ".",
    missionHeading: "Mission",
    missionBody: [
      "Sant Kabir Ji's teachings speak of humanity, equality, truth, and harmony — service to humankind that rises above distinctions of caste, religion, and sect. Inspired by this spirit, this institution participates in seva, satsang, and social-welfare activities in Maghar.",
      "We want to be clear that this website presents the broad spirit of Sant Kabir Ji's teachings in general terms; it does not claim that any single sect, branch, or interpretation is the final or sole authoritative one.",
    ],
    activitiesHeading: "Activities",
    activitiesBody:
      "A detailed account of the institution's seva and event activities is available on the pages below.",
    activitiesLinkLabel: "View Activities",
    sevaLinkLabel: "View Seva Work",
    contactHeading: "Contact Information",
    contactAddressLabel: "Address",
    contactPhoneLabel: "Phone",
    contactEmailLabel: "Email",
    donationHeading: "Donation Transparency",
    donationBody: [
      "Donations received through this website support the seva, satsang, and religious-social activities listed on this site, including their ongoing operation and upkeep. We are clear that we are not currently claiming any specific percentage or line-item fund allocation — this is a general purpose statement, not a detailed financial breakdown.",
      "For donation-related terms, please see our Donation Terms & Conditions page.",
    ],
    financialHeading: "Financial Transparency",
    financialBody: [
      "The organisation is in the process of formalising its online transparency practices. Detailed financial statements (income-expenditure statements, audit reports, etc.) can currently be made available on request, and there are plans to publish these on this website in future.",
      "If you would like detailed financial information, please contact us using the contact information above.",
    ],
    registrationHeading: "Registration & Tax-Exemption Status",
    registrationNumberLabel: "Registration Number",
    panLabel: "PAN",
    status80gLabel: "80G Status",
    status80gEligible: "Eligible under 80G (verified)",
    status80gPending: "Verification pending / not yet confirmed",
    number80gLabel: "80G Number",
    number12aLabel: "12A Number",
    fcraLabel: "FCRA Number",
    notAvailable: "Not available / not yet recorded",
  },
} as const;

const placeholder = {
  hi: "प्लेसहोल्डर — सत्यापित संस्था की जानकारी से बदलें",
  en: "PLACEHOLDER — REPLACE WITH VERIFIED ORGANISATION INFORMATION",
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
      ? "संस्था के बारे में — संत कबीर सेवा समिति"
      : "About the Institution — Sant Kabir Sewa Samiti",
    description: isHi
      ? "संस्था का पंजीकृत नाम, पता, नेतृत्व, उद्देश्य एवं वित्तीय पारदर्शिता से जुड़ी जानकारी।"
      : "The institution's registered name, address, leadership, mission, and financial transparency information.",
    alternates: {
      canonical: `/${locale}/about-institution`,
      languages: {
        hi: "/hi/about-institution",
        en: "/en/about-institution",
      },
    },
  };
}

export default async function AboutInstitutionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutInstitution");
  const settings = await getSiteSettings();
  const c = content[locale as "hi" | "en"];
  const ph = placeholder[locale as "hi" | "en"];
  const isHi = locale === "hi";

  const orgName = isHi ? settings.org_name_hi : settings.org_name_en;
  const orgAddress = isHi ? settings.org_address_hi : settings.org_address_en;
  const orgPhone = settings.org_phone;
  const orgEmail = settings.org_email;

  const isPlaceholder = (v: string) => v.includes("PLACEHOLDER") || v.includes("प्लेसहोल्डर");

  return (
    <Container className="py-16 max-w-3xl">
      <SectionHeading kicker={c.kicker} title={t("title")} />
      <p className="mt-4 font-body text-ink-soft">{t("subtitle")}</p>

      <div className="motif-divider my-10" />

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-ink">{c.legalNameHeading}</h2>
        <p className="font-body text-ink-soft">{c.legalNameNote}</p>
        <p className="font-heading text-xl text-ink">
          {isPlaceholder(orgName) ? (
            <span className="italic text-ink-faint">{ph}</span>
          ) : (
            orgName
          )}
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-ink">{c.addressHeading}</h2>
        <p className="font-body text-ink-soft">
          {isPlaceholder(orgAddress) ? (
            <span className="italic text-ink-faint">{ph}</span>
          ) : (
            orgAddress
          )}
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-ink">{c.leadershipHeading}</h2>
        <p className="font-body text-ink-soft">{c.leadershipBody[0]}</p>
        <p className="font-body text-ink-soft">
          {c.leadershipBody[1]}{" "}
          <Link href="/research-sources" className="text-saffron underline underline-offset-2">
            {c.researchLinkText}
          </Link>
          {c.leadershipAfterLink}
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-ink">{c.missionHeading}</h2>
        {c.missionBody.map((p, i) => (
          <p key={i} className="font-body text-ink-soft">
            {p}
          </p>
        ))}
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-ink">{c.activitiesHeading}</h2>
        <p className="font-body text-ink-soft">{c.activitiesBody}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button href="/activities" variant="outline">
            {c.activitiesLinkLabel}
          </Button>
          <Button href="/seva" variant="outline">
            {c.sevaLinkLabel}
          </Button>
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-ink">{c.contactHeading}</h2>
        <ul className="space-y-2 font-body text-ink-soft">
          <li>
            <span className="font-semibold text-ink">{c.contactAddressLabel}: </span>
            {isPlaceholder(orgAddress) ? (
              <span className="italic text-ink-faint">{ph}</span>
            ) : (
              orgAddress
            )}
          </li>
          <li>
            <span className="font-semibold text-ink">{c.contactPhoneLabel}: </span>
            {isPlaceholder(orgPhone) ? (
              <span className="italic text-ink-faint">{ph}</span>
            ) : (
              orgPhone
            )}
          </li>
          <li>
            <span className="font-semibold text-ink">{c.contactEmailLabel}: </span>
            {isPlaceholder(orgEmail) ? (
              <span className="italic text-ink-faint">{ph}</span>
            ) : (
              orgEmail
            )}
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-ink">{c.donationHeading}</h2>
        {c.donationBody.map((p, i) => (
          <p key={i} className="font-body text-ink-soft">
            {p}
          </p>
        ))}
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-ink">{c.financialHeading}</h2>
        {c.financialBody.map((p, i) => (
          <p key={i} className="font-body text-ink-soft">
            {p}
          </p>
        ))}
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-ink">{c.registrationHeading}</h2>
        <ul className="space-y-2 font-body text-ink-soft">
          <li>
            <span className="font-semibold text-ink">{c.registrationNumberLabel}: </span>
            {settings.org_registration_number || (
              <span className="italic text-ink-faint">{c.notAvailable}</span>
            )}
          </li>
          <li>
            <span className="font-semibold text-ink">{c.panLabel}: </span>
            {settings.org_pan || <span className="italic text-ink-faint">{c.notAvailable}</span>}
          </li>
          <li>
            <span className="font-semibold text-ink">{c.status80gLabel}: </span>
            {settings.org_80g_status === "eligible" ? c.status80gEligible : c.status80gPending}
          </li>
          <li>
            <span className="font-semibold text-ink">{c.number80gLabel}: </span>
            {settings.org_80g_number || (
              <span className="italic text-ink-faint">{c.notAvailable}</span>
            )}
          </li>
          <li>
            <span className="font-semibold text-ink">{c.number12aLabel}: </span>
            {settings.org_12a_number || (
              <span className="italic text-ink-faint">{c.notAvailable}</span>
            )}
          </li>
          <li>
            <span className="font-semibold text-ink">{c.fcraLabel}: </span>
            {settings.org_fcra_number || (
              <span className="italic text-ink-faint">{c.notAvailable}</span>
            )}
          </li>
        </ul>
      </section>
    </Container>
  );
}
