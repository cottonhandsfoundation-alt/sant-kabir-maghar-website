import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteSettings } from "@/lib/settings";

const jurisdictionPlaceholder = {
  hi: "प्लेसहोल्डर — क्षेत्राधिकार दर्ज करें",
  en: "PLACEHOLDER — INSERT JURISDICTION",
} as const;

function content(orgName: string, orgEmail: string, hasAnalytics: boolean) {
  return {
    hi: {
      kicker: "नीतियां",
      lastUpdated: "अंतिम अद्यतन: 19 अगस्त 2026",
      sections: [
        {
          heading: "परिचय",
          body: [
            `${orgName} ("हम", "हमारा", "संस्था") इस वेबसाइट के उपयोगकर्ताओं की गोपनीयता का सम्मान करती है। यह गोपनीयता नीति बताती है कि जब आप हमारी वेबसाइट का उपयोग करते हैं, संपर्क फ़ॉर्म भरते हैं, स्वयंसेवक के रूप में पंजीकरण करते हैं, न्यूज़लेटर की सदस्यता लेते हैं, या ऑनलाइन दान करते हैं, तो हम आपकी कौन-सी जानकारी एकत्र करते हैं, उसका उपयोग कैसे करते हैं, और उसकी सुरक्षा कैसे करते हैं।`,
          ],
        },
        {
          heading: "हम कौन-सी जानकारी एकत्र करते हैं",
          body: [
            "हम निम्नलिखित प्रकार की जानकारी एकत्र कर सकते हैं, केवल तभी जब आप स्वेच्छा से उसे हमारे साथ साझा करते हैं:",
          ],
          bullets: [
            "संपर्क फ़ॉर्म: नाम, ईमेल पता, फ़ोन नंबर, संदेश की विषय-वस्तु।",
            "स्वयंसेवक पंजीकरण फ़ॉर्म: नाम, संपर्क विवरण, रुचि का क्षेत्र, उपलब्धता।",
            "न्यूज़लेटर सदस्यता: ईमेल पता।",
            "दान फ़ॉर्म: नाम, ईमेल, फ़ोन, पता (रसीद हेतु), तथा — यदि आप 80G कर-छूट रसीद का अनुरोध करते हैं — पैन (PAN) जैसी अतिरिक्त जानकारी।",
            "भुगतान संबंधी जानकारी: भुगतान हमारे भुगतान गेटवे भागीदार Razorpay द्वारा सीधे संसाधित किया जाता है (नीचे 'भुगतान प्रसंस्करण' अनुभाग देखें); हम आपके कार्ड, यूपीआई या बैंक विवरण को अपने सर्वर पर संग्रहीत नहीं करते।",
          ],
        },
        {
          heading: "हम इस जानकारी का उपयोग कैसे करते हैं",
          body: ["हम एकत्रित जानकारी का उपयोग केवल निम्नलिखित उद्देश्यों के लिए करते हैं:"],
          bullets: [
            "आपके प्रश्नों या अनुरोधों का उत्तर देने हेतु।",
            "स्वयंसेवक अवसरों के समन्वय हेतु।",
            "यदि आपने सदस्यता ली है, तो न्यूज़लेटर एवं अपडेट भेजने हेतु।",
            "दान रसीद जारी करने एवं दान संबंधी अभिलेख बनाए रखने हेतु।",
            "वेबसाइट की सुरक्षा एवं उचित संचालन सुनिश्चित करने हेतु।",
          ],
        },
        {
          heading: "भुगतान प्रसंस्करण",
          body: [
            "इस वेबसाइट के माध्यम से किए गए सभी ऑनलाइन दान भुगतान गेटवे भागीदार Razorpay के माध्यम से संसाधित किए जाते हैं। आपकी भुगतान जानकारी (कार्ड नंबर, यूपीआई आईडी, नेट-बैंकिंग विवरण आदि) सीधे Razorpay की सुरक्षित प्रणाली द्वारा संभाली जाती है — यह जानकारी कभी भी हमारे सर्वर पर संग्रहीत नहीं होती। Razorpay का अपना गोपनीयता नीति एवं सुरक्षा मानक लागू होता है।",
          ],
        },
        {
          heading: "कुकीज़ एवं एनालिटिक्स",
          body: hasAnalytics
            ? [
                "यह वेबसाइट वेबसाइट के उपयोग को समझने और उसमें सुधार करने हेतु विश्लेषण (analytics) उपकरणों का उपयोग करती है। ये उपकरण कुकीज़ अथवा समान तकनीकों के माध्यम से गुमनाम उपयोग-डेटा एकत्र कर सकते हैं। आप अपने ब्राउज़र सेटिंग्स के माध्यम से कुकीज़ को नियंत्रित अथवा अक्षम कर सकते हैं।",
              ]
            : [
                "वर्तमान में यह वेबसाइट किसी तृतीय-पक्ष एनालिटिक्स अथवा ट्रैकिंग उपकरण का उपयोग नहीं करती। यदि भविष्य में ऐसा कोई उपकरण जोड़ा जाता है, तो इस नीति को तदनुसार अद्यतन किया जाएगा।",
              ],
        },
        {
          heading: "जानकारी साझा करना",
          body: [
            "हम आपकी व्यक्तिगत जानकारी किसी तीसरे पक्ष को बेचते नहीं हैं। हम आपकी जानकारी केवल निम्नलिखित परिस्थितियों में साझा कर सकते हैं: भुगतान प्रसंस्करण हेतु Razorpay के साथ; ईमेल/एसएमएस भेजने हेतु हमारी सेवा प्रदाता कंपनियों के साथ; वेबसाइट होस्टिंग हेतु हमारे तकनीकी सेवा प्रदाताओं के साथ; अथवा जहाँ कानून द्वारा आवश्यक हो।",
          ],
        },
        {
          heading: "डेटा प्रतिधारण",
          body: [
            "हम आपकी जानकारी उतने समय तक ही सुरक्षित रखते हैं जितना उस उद्देश्य के लिए आवश्यक हो जिसके लिए वह एकत्र की गई थी, अथवा जब तक कानून द्वारा (जैसे कर/लेखा प्रयोजनों हेतु दान अभिलेख) आवश्यक हो।",
          ],
        },
        {
          heading: "आपके अधिकार",
          body: [
            `आप किसी भी समय हमसे अपनी व्यक्तिगत जानकारी तक पहुँच, उसमें सुधार, अथवा उसे हटाने का अनुरोध कर सकते हैं (कानूनी अभिलेख-रखरखाव आवश्यकताओं के अधीन)। ऐसे अनुरोध हेतु कृपया हमें ${
              orgEmail.includes("PLACEHOLDER") || orgEmail.includes("प्लेसहोल्डर")
                ? "हमारे संपर्क पृष्ठ पर दी गई जानकारी के माध्यम से"
                : orgEmail
            } पर संपर्क करें।`,
          ],
        },
        {
          heading: "बच्चों की गोपनीयता",
          body: [
            "यह वेबसाइट जानबूझकर 18 वर्ष से कम आयु के बच्चों से व्यक्तिगत जानकारी एकत्र नहीं करती। यदि हमें पता चलता है कि हमने अनजाने में ऐसी जानकारी एकत्र कर ली है, तो हम उसे शीघ्र हटा देंगे।",
          ],
        },
        {
          heading: "इस नीति में परिवर्तन",
          body: [
            "हम समय-समय पर इस गोपनीयता नीति को अद्यतन कर सकते हैं। किसी भी महत्वपूर्ण परिवर्तन को इस पृष्ठ पर प्रकाशित किया जाएगा तथा 'अंतिम अद्यतन' तिथि को तदनुसार बदला जाएगा।",
          ],
        },
        {
          heading: "शासकीय कानून एवं क्षेत्राधिकार",
          body: [
            `यह नीति भारत के लागू कानूनों के अनुसार शासित होगी। इससे जुड़े किसी भी विवाद के लिए ${jurisdictionPlaceholder.hi} की अदालतों को विशेष क्षेत्राधिकार प्राप्त होगा।`,
          ],
        },
      ],
    },
    en: {
      kicker: "Policies",
      lastUpdated: "Last updated: 19 August 2026",
      sections: [
        {
          heading: "Introduction",
          body: [
            `${orgName} ("we", "us", "the organisation") respects the privacy of users of this website. This Privacy Policy explains what information we collect, how we use it, and how we protect it, when you use our website, fill in a contact form, register as a volunteer, subscribe to a newsletter, or make an online donation.`,
          ],
        },
        {
          heading: "Information We Collect",
          body: [
            "We may collect the following kinds of information, only where you voluntarily share it with us:",
          ],
          bullets: [
            "Contact form: name, email address, phone number, message content.",
            "Volunteer registration form: name, contact details, area of interest, availability.",
            "Newsletter subscription: email address.",
            "Donation form: name, email, phone, address (for receipts), and — if you request an 80G tax-exemption receipt — additional information such as PAN.",
            "Payment information: payments are processed directly by our payment gateway partner, Razorpay (see \"Payment Processing\" below); we do not store your card, UPI, or bank details on our servers.",
          ],
        },
        {
          heading: "How We Use This Information",
          body: ["We use the information we collect solely for the following purposes:"],
          bullets: [
            "To respond to your questions or requests.",
            "To coordinate volunteer opportunities.",
            "To send newsletters and updates, if you have subscribed.",
            "To issue donation receipts and maintain donation records.",
            "To keep the website secure and functioning properly.",
          ],
        },
        {
          heading: "Payment Processing",
          body: [
            "All online donations made through this website are processed through our payment gateway partner, Razorpay. Your payment information (card number, UPI ID, net-banking details, etc.) is handled directly by Razorpay's secure systems and is never stored on our servers. Razorpay's own privacy policy and security standards apply to this processing.",
          ],
        },
        {
          heading: "Cookies & Analytics",
          body: hasAnalytics
            ? [
                "This website uses analytics tools to understand and improve website usage. These tools may collect anonymised usage data through cookies or similar technologies. You can control or disable cookies through your browser settings.",
              ]
            : [
                "This website does not currently use any third-party analytics or tracking tools. If any such tool is added in future, this policy will be updated accordingly.",
              ],
        },
        {
          heading: "Sharing of Information",
          body: [
            "We do not sell your personal information to any third party. We may share your information only in the following circumstances: with Razorpay for payment processing; with our email/SMS service providers for sending communications; with our technical service providers for website hosting; or where required by law.",
          ],
        },
        {
          heading: "Data Retention",
          body: [
            "We retain your information only for as long as necessary for the purpose it was collected, or as required by law (for example, donation records for tax/accounting purposes).",
          ],
        },
        {
          heading: "Your Rights",
          body: [
            `You may at any time request access to, correction of, or deletion of your personal information (subject to legal record-keeping requirements). To make such a request, please contact us at ${
              orgEmail.includes("PLACEHOLDER") || orgEmail.includes("प्लेसहोल्डर")
                ? "the details on our contact page"
                : orgEmail
            }.`,
          ],
        },
        {
          heading: "Children's Privacy",
          body: [
            "This website does not knowingly collect personal information from children under 18 years of age. If we become aware that we have inadvertently collected such information, we will delete it promptly.",
          ],
        },
        {
          heading: "Changes to This Policy",
          body: [
            "We may update this Privacy Policy from time to time. Any material changes will be posted on this page, and the \"Last updated\" date will be revised accordingly.",
          ],
        },
        {
          heading: "Governing Law & Jurisdiction",
          body: [
            `This policy shall be governed by the applicable laws of India. The courts of ${jurisdictionPlaceholder.en} shall have exclusive jurisdiction over any disputes arising from it.`,
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
    title: isHi ? "गोपनीयता नीति — संत कबीर सेवा समिति" : "Privacy Policy — Sant Kabir Sewa Samiti",
    description: isHi
      ? "इस वेबसाइट पर जानकारी एकत्र करने, उपयोग करने एवं सुरक्षित रखने की नीति।"
      : "Our policy on collecting, using, and protecting information on this website.",
    alternates: {
      canonical: `/${locale}/privacy-policy`,
      languages: { hi: "/hi/privacy-policy", en: "/en/privacy-policy" },
    },
  };
}

export default async function PrivacyPolicyPage({
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
  const orgEmail = settings.org_email;
  const hasAnalytics = Boolean(settings.analytics_ga_id || settings.analytics_meta_pixel_id);
  const c = content(orgName, orgEmail, hasAnalytics)[locale as "hi" | "en"];

  return (
    <Container className="py-16 max-w-3xl">
      <SectionHeading kicker={c.kicker} title={t("privacyPolicy")} />
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
          {"bullets" in s && s.bullets ? (
            <ul className="list-disc space-y-2 pl-6 font-body text-ink-soft">
              {s.bullets.map((b, k) => (
                <li key={k}>{b}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </Container>
  );
}
