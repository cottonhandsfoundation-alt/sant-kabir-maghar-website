import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteSettings } from "@/lib/settings";

function content(orgName: string, orgEmail: string, orgPhone: string) {
  const isPh = (v: string) => v.includes("PLACEHOLDER") || v.includes("प्लेसहोल्डर");
  const contactHi = `${isPh(orgEmail) ? "हमारे संपर्क पृष्ठ पर दिए गए ईमेल" : orgEmail}${
    isPh(orgPhone) ? "" : ` अथवा ${orgPhone} पर फ़ोन`
  }`;
  const contactEn = `${isPh(orgEmail) ? "the email listed on our contact page" : orgEmail}${
    isPh(orgPhone) ? "" : ` or by phone at ${orgPhone}`
  }`;

  return {
    hi: {
      kicker: "दान",
      lastUpdated: "अंतिम अद्यतन: 19 अगस्त 2026",
      sections: [
        {
          heading: "सामान्य नीति",
          body: [
            `${orgName} को किया गया दान स्वैच्छिक एवं धर्मार्थ प्रकृति का होता है। चूँकि दान की गई राशि सेवा एवं धार्मिक-सामाजिक गतिविधियों की योजना एवं संचालन में तुरंत उपयोग की जाने लगती है, इसलिए सामान्यतः दान की गई राशि वापस नहीं की जाती।`,
          ],
        },
        {
          heading: "अपवाद: वास्तविक तकनीकी त्रुटि",
          body: [
            "यदि किसी तकनीकी गड़बड़ी के कारण आपसे गलत राशि काटी गई है, आपका भुगतान एक ही लेन-देन के लिए एक से अधिक बार (डुप्लिकेट चार्ज) संसाधित हो गया है, अथवा भुगतान असफल होने के बावजूद राशि काट ली गई है, तो हम ऐसे मामलों की जाँच कर उचित धनवापसी की व्यवस्था करेंगे।",
          ],
        },
        {
          heading: "धनवापसी हेतु अनुरोध प्रक्रिया",
          body: [
            `यदि आपको उपरोक्त जैसी कोई वास्तविक तकनीकी त्रुटि दिखाई देती है, तो कृपया लेन-देन की तिथि से 7 दिनों के भीतर हमें ${contactHi} के माध्यम से संपर्क करें, तथा लेन-देन आईडी, तिथि, राशि एवं भुगतान की पावती (screenshot/receipt) साझा करें। हम आपके अनुरोध की समीक्षा कर उचित निर्णय लेंगे तथा प्रक्रिया की जानकारी आपको सूचित करेंगे।`,
          ],
        },
        {
          heading: "धनवापसी की समय-सीमा",
          body: [
            "स्वीकृत होने पर, धनवापसी सामान्यतः उसी भुगतान माध्यम में की जाएगी जिससे मूल भुगतान किया गया था, तथा Razorpay एवं संबंधित बैंक की प्रक्रिया अनुसार इसमें कुछ कार्य-दिवस लग सकते हैं। यह समय-सीमा हमारे नियंत्रण से बाहर हो सकती है।",
          ],
        },
        {
          heading: "निरस्तीकरण",
          body: [
            "चूँकि दान तत्काल संसाधित हो जाता है, इसलिए भुगतान पूर्ण होने के बाद उसे 'निरस्त' करना संभव नहीं है — ऐसे मामलों में उपरोक्त धनवापसी प्रक्रिया लागू होगी, जो केवल वास्तविक तकनीकी त्रुटियों पर लागू है।",
          ],
        },
      ],
    },
    en: {
      kicker: "Donations",
      lastUpdated: "Last updated: 19 August 2026",
      sections: [
        {
          heading: "General Policy",
          body: [
            `Donations made to ${orgName} are voluntary and charitable in nature. Because donated funds begin to be applied towards planning and running seva and religious-social activities promptly, donations are, as a general rule, non-refundable.`,
          ],
        },
        {
          heading: "Exception: Genuine Technical Error",
          body: [
            "If an incorrect amount was deducted due to a technical glitch, your payment was processed more than once for a single transaction (a duplicate charge), or an amount was deducted despite the payment failing, we will look into such cases and arrange an appropriate refund.",
          ],
        },
        {
          heading: "Refund Request Process",
          body: [
            `If you notice a genuine technical error of the kind described above, please contact us within 7 days of the transaction via ${contactEn}, sharing the transaction ID, date, amount, and payment acknowledgement (screenshot/receipt). We will review your request and inform you of the outcome.`,
          ],
        },
        {
          heading: "Refund Timeline",
          body: [
            "Where approved, a refund will generally be issued to the same payment method used for the original payment, and may take a few business days depending on Razorpay's and the relevant bank's processes. This timeline may be outside our control.",
          ],
        },
        {
          heading: "Cancellations",
          body: [
            "Because donations are processed instantly, a completed payment cannot be \"cancelled\" after the fact — such cases fall under the refund process above, which applies only to genuine technical errors.",
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
      ? "धनवापसी / निरस्तीकरण नीति — संत कबीर सेवा समिति"
      : "Refund / Cancellation Policy — Sant Kabir Sewa Samiti",
    description: isHi
      ? "दान की धनवापसी एवं निरस्तीकरण से जुड़ी नीति।"
      : "Our policy on refunds and cancellations of donations.",
    alternates: {
      canonical: `/${locale}/refund-policy`,
      languages: { hi: "/hi/refund-policy", en: "/en/refund-policy" },
    },
  };
}

export default async function RefundPolicyPage({
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
  const c = content(orgName, settings.org_email, settings.org_phone)[locale as "hi" | "en"];

  return (
    <Container className="py-16 max-w-3xl">
      <SectionHeading kicker={c.kicker} title={t("refundPolicy")} />
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
