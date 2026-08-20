import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactBadge } from "@/components/ui/FactBadge";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { NAV_ITEMS } from "@/lib/nav";

type TimelineEvent = {
  date: string;
  location: string;
  role: string;
  description: string;
  source: string;
};

const content = {
  hi: {
    kicker: "महंत विचार दास जी · जीवन एवं आध्यात्मिक यात्रा",
    title: "जीवन एवं आध्यात्मिक यात्रा",
    lead: "इस पृष्ठ पर केवल वे घटनाएं दर्ज हैं जिनकी पुष्टि विश्वसनीय, स्वतंत्र समाचार स्रोतों से हो सकी है। जन्म-तिथि, गुरु-वंश-परंपरा, पूर्ववर्ती महंतों या अनुयायियों की संख्या जैसी कोई जानकारी उपलब्ध न होने के कारण इसे शामिल नहीं किया गया है।",
    notFoundNote:
      "जन्म-तिथि, गुरु-दीक्षा का विवरण, पूर्ववर्ती महंतों की सूची और अनुयायियों/शिष्यों की संख्या — इनमें से कोई भी जानकारी किसी विश्वसनीय स्रोत से सत्यापित नहीं हो सकी, इसलिए इन्हें यहां शामिल नहीं किया गया है। पुष्टि होने पर प्रशासन इन्हें जोड़ सकता है।",
    timelineTitle: "समयरेखा",
    sourceLabel: "स्रोत",
    events: [
      {
        date: "जून 2018",
        location: "मगहर, संत कबीर नगर",
        role: "प्रतिक्रिया एवं भागीदारी",
        description:
          "प्रधानमंत्री नरेंद्र मोदी की मगहर यात्रा (संत कबीर की 500वीं निर्वाण-वर्षगांठ के अवसर पर आयोजित कबीर महोत्सव) के बाद महंत विचार दास जी ने, समाधि स्थल की देखभाल करने वाले न्यास के प्रमुख के रूप में, इस यात्रा पर प्रतिक्रिया दी और सरकारी सहयोग से क्षेत्र के विकास की आशा व्यक्त की।",
        source: "पीटीआई समाचार एजेंसी, जून 2018",
      },
      {
        date: "23 फरवरी 2021",
        location: "कबीर चौरा, मगहर",
        role: "नेतृत्व",
        description:
          "संत कबीर के 503वें परिनिर्वाण दिवस के अवसर पर आयोजित समारोह में महंत विचार दास जी ने ध्वजारोहण, महा बीजक पाठ, हवन और कबीर आरती का नेतृत्व किया।",
        source: "अमर उजाला, फरवरी 2021",
      },
      {
        date: "3 फरवरी 2025",
        location: "मगहर, संत कबीर नगर",
        role: "अध्यक्षता",
        description:
          "सात-दिवसीय कबीर मगहर महोत्सव के समापन समारोह की अध्यक्षता महंत विचार दास जी ने की, जिसमें उन्होंने स्थानीय विधायक को सम्मानित किया।",
        source: "अमर उजाला, फरवरी 2025",
      },
    ] satisfies TimelineEvent[],
  },
  en: {
    kicker: "Mahant Vichar Das Ji · Life & Spiritual Journey",
    title: "Life & Spiritual Journey",
    lead: "This page records only events that could be confirmed from reliable, independent news sources. Details such as birth date, guru lineage, predecessor mahants, or follower counts are not included because they could not be verified.",
    notFoundNote:
      "Birth date, details of guru-diksha (spiritual initiation), a list of predecessor mahants, and the number of followers/disciples could not be verified from any reliable source, and are therefore not included here. The administration may add these once confirmed.",
    timelineTitle: "Timeline",
    sourceLabel: "Source",
    events: [
      {
        date: "June 2018",
        location: "Maghar, Sant Kabir Nagar",
        role: "Public response and participation",
        description:
          "Following Prime Minister Narendra Modi's visit to Maghar (for the Kabir Mahotsav marking the 500th death anniversary of Sant Kabir), Mahant Vichar Das Ji, as head of the trust caring for the Samadhi site, responded to the visit and expressed hope for government-supported development of the area.",
        source: "PTI news agency, June 2018",
      },
      {
        date: "23 February 2021",
        location: "Kabir Chaura, Maghar",
        role: "Leadership",
        description:
          "At the observance marking Sant Kabir's 503rd Parinirvan Divas, Mahant Vichar Das Ji led the flag-hoisting, Maha Bijak Path recitation, havan, and Kabir Aarti.",
        source: "Amar Ujala, February 2021",
      },
      {
        date: "3 February 2025",
        location: "Maghar, Sant Kabir Nagar",
        role: "Presiding",
        description:
          "Mahant Vichar Das Ji presided over the closing ceremony of the seven-day Kabir Maghar Mahotsav, where he honoured a local MLA in attendance.",
        source: "Amar Ujala, February 2025",
      },
    ] satisfies TimelineEvent[],
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
      canonical: `/${locale}/mahant-vichar-das-ji/jivan-yatra`,
      languages: {
        hi: "/hi/mahant-vichar-das-ji/jivan-yatra",
        en: "/en/mahant-vichar-das-ji/jivan-yatra",
      },
    },
  };
}

export default async function JivanYatraPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale as "hi" | "en"];
  const children =
    NAV_ITEMS.find((i) => i.href === "/mahant-vichar-das-ji")?.children ?? [];

  return (
    <>
      <SectionSubNav items={children} activeHref="/mahant-vichar-das-ji/jivan-yatra" />
      <Container className="py-14">
        <div className="max-w-2xl">
          <SectionHeading kicker={c.kicker} title={c.title} />
          <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>
          <FactBadge kind="verified" className="mt-4" />
        </div>

        <div className="mt-12 max-w-3xl">
          <h2 className="font-heading text-xl font-semibold text-ink">{c.timelineTitle}</h2>
          <div className="motif-divider my-4" />
          <ol className="relative space-y-8 border-l border-border pl-8">
            {c.events.map((event, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-saffron"
                  aria-hidden="true"
                />
                <p className="font-body text-sm font-semibold uppercase tracking-wide text-saffron">
                  {event.date}
                </p>
                <h3 className="mt-1 font-heading text-lg font-semibold text-ink">
                  {event.role} — {event.location}
                </h3>
                <p className="mt-1.5 font-body leading-relaxed text-ink-soft">
                  {event.description}
                </p>
                <p className="mt-2 font-body text-xs text-ink-faint">
                  {c.sourceLabel}: {event.source}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 max-w-2xl rounded-sm border border-gold/30 bg-gold-pale/40 p-4">
          <p className="font-body text-sm leading-relaxed text-ink-soft">{c.notFoundNote}</p>
        </div>
      </Container>
    </>
  );
}
