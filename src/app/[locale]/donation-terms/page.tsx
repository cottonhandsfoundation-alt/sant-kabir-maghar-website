import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteSettings } from "@/lib/settings";

const jurisdictionPlaceholder = {
  hi: "प्लेसहोल्डर — क्षेत्राधिकार दर्ज करें",
  en: "PLACEHOLDER — INSERT JURISDICTION",
} as const;

function content(orgName: string, is80gEligible: boolean) {
  const taxSectionHi = is80gEligible
    ? "इस संस्था को आयकर अधिनियम की धारा 80G के अंतर्गत पात्रता प्राप्त है। योग्य दानदाताओं को कर-छूट रसीद जारी की जाएगी। कृपया वर्तमान 80G विवरण हेतु संस्था के बारे में पृष्ठ देखें।"
    : "इस संस्था की 80G कर-छूट स्थिति फिलहाल सत्यापित नहीं हुई है / लंबित है। जब तक यह स्थिति आधिकारिक रूप से पुष्टि नहीं होती, तब तक हम किसी दान पर कर-छूट का दावा नहीं करते। कृपया वर्तमान स्थिति हेतु संस्था के बारे में पृष्ठ देखें अथवा हमसे सीधे संपर्क करें।";
  const taxSectionEn = is80gEligible
    ? "This organisation is eligible under Section 80G of the Income Tax Act. Eligible donors will be issued a tax-exemption receipt. Please see the About the Institution page for current 80G details."
    : "This organisation's 80G tax-exemption status is not currently verified / is pending. Until this status is officially confirmed, we do not claim tax-exemption on any donation. Please see the About the Institution page for current status, or contact us directly.";

  return {
    hi: {
      kicker: "दान",
      lastUpdated: "अंतिम अद्यतन: 19 अगस्त 2026",
      sections: [
        {
          heading: "स्वैच्छिक दान",
          body: [
            `${orgName} को किया गया प्रत्येक दान पूर्णतः स्वैच्छिक है। दान देकर आप स्वीकार करते हैं कि यह एक स्वैच्छिक अनुदान है, न कि किसी वस्तु अथवा सेवा के बदले किया गया भुगतान।`,
          ],
        },
        {
          heading: "दान का उपयोग",
          body: [
            "प्राप्त दान का उपयोग इस वेबसाइट पर सूचीबद्ध सेवा, सत्संग एवं धार्मिक-सामाजिक गतिविधियों के संचालन, रखरखाव एवं विस्तार हेतु किया जाता है। हम किसी विशिष्ट मद अथवा प्रतिशत-वार निधि आवंटन की गारंटी नहीं देते; संस्था अपने विवेक से दान राशि का उपयोग अपने घोषित सामान्य उद्देश्यों की पूर्ति हेतु करती है। अधिक जानकारी हेतु संस्था के बारे में पृष्ठ देखें।",
          ],
        },
        {
          heading: "भुगतान प्रसंस्करण",
          body: [
            "सभी ऑनलाइन दान भुगतान गेटवे भागीदार Razorpay के माध्यम से सुरक्षित रूप से संसाधित किए जाते हैं। आपकी भुगतान जानकारी हमारे सर्वर पर संग्रहीत नहीं होती।",
          ],
        },
        {
          heading: "रसीद जारी करना",
          body: [
            "सफल दान के पश्चात एक रसीद आपके पंजीकृत ईमेल पते पर भेजी जाएगी। कृपया दान करते समय सही एवं पूर्ण जानकारी (नाम, पता, ईमेल आदि) प्रदान करें, क्योंकि रसीद में सुधार बाद में कठिन हो सकता है।",
          ],
        },
        {
          heading: "कर-छूट स्थिति",
          body: [taxSectionHi],
        },
        {
          heading: "धनवापसी",
          body: [
            "दान संबंधी धनवापसी नीति हेतु कृपया हमारा धनवापसी / निरस्तीकरण नीति पृष्ठ देखें।",
          ],
        },
        {
          heading: "अंतर्राष्ट्रीय / विदेशी दान",
          body: [
            "विदेशी अंशदान विनियमन अधिनियम (FCRA) के अंतर्गत, विदेश से प्राप्त होने वाले दान पर विशेष कानूनी प्रतिबंध लागू होते हैं। जब तक संस्था के पास वैध FCRA पंजीकरण की पुष्टि न हो, हम विदेश-स्थित दानदाताओं से दान स्वीकार करने में असमर्थ हो सकते हैं। कृपया वर्तमान स्थिति हेतु हमसे संपर्क करें।",
          ],
        },
        {
          heading: "शासकीय कानून एवं क्षेत्राधिकार",
          body: [
            `ये शर्तें भारत के लागू कानूनों के अनुसार शासित होंगी। इनसे जुड़े किसी भी विवाद के लिए ${jurisdictionPlaceholder.hi} की अदालतों को विशेष क्षेत्राधिकार प्राप्त होगा।`,
          ],
        },
      ],
    },
    en: {
      kicker: "Donations",
      lastUpdated: "Last updated: 19 August 2026",
      sections: [
        {
          heading: "Voluntary Donations",
          body: [
            `Every donation made to ${orgName} is entirely voluntary. By donating, you acknowledge that this is a voluntary contribution and not a payment in exchange for any goods or services.`,
          ],
        },
        {
          heading: "Use of Donations",
          body: [
            "Donations received are used towards the operation, maintenance, and expansion of the seva, satsang, and religious-social activities listed on this website. We do not guarantee any specific line-item or percentage-wise fund allocation; the organisation applies donated funds, at its discretion, towards its stated general purposes. See the About the Institution page for more detail.",
          ],
        },
        {
          heading: "Payment Processing",
          body: [
            "All online donations are securely processed through our payment gateway partner, Razorpay. Your payment information is not stored on our servers.",
          ],
        },
        {
          heading: "Issuance of Receipts",
          body: [
            "A receipt will be sent to your registered email address following a successful donation. Please provide accurate and complete information (name, address, email, etc.) at the time of donating, as correcting a receipt afterwards can be difficult.",
          ],
        },
        {
          heading: "Tax-Exemption Status",
          body: [taxSectionEn],
        },
        {
          heading: "Refunds",
          body: [
            "For our policy on donation refunds, please see the Refund / Cancellation Policy page.",
          ],
        },
        {
          heading: "International / Foreign Donations",
          body: [
            "Under the Foreign Contribution (Regulation) Act (FCRA), donations received from abroad are subject to specific legal restrictions. Unless the organisation's valid FCRA registration is confirmed, we may be unable to accept donations from donors located outside India. Please contact us for current status.",
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
    title: isHi
      ? "दान नियम एवं शर्तें — संत कबीर सेवा समिति"
      : "Donation Terms & Conditions — Sant Kabir Sewa Samiti",
    description: isHi
      ? "ऑनलाइन दान से जुड़े नियम, रसीद एवं कर-छूट संबंधी जानकारी।"
      : "Terms governing online donations, receipts, and tax-exemption information.",
    alternates: {
      canonical: `/${locale}/donation-terms`,
      languages: { hi: "/hi/donation-terms", en: "/en/donation-terms" },
    },
  };
}

export default async function DonationTermsPage({
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
  const is80gEligible = settings.org_80g_status === "eligible";
  const c = content(orgName, is80gEligible)[locale as "hi" | "en"];

  return (
    <Container className="py-16 max-w-3xl">
      <SectionHeading kicker={c.kicker} title={t("donationTerms")} />
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
