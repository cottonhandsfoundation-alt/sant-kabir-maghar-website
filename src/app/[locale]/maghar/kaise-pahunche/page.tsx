import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactBadge } from "@/components/ui/FactBadge";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { NAV_ITEMS } from "@/lib/nav";
import { TrainFront, Plane, Car } from "lucide-react";

const content = {
  hi: {
    kicker: "मगहर · कैसे पहुंचें",
    title: "मगहर कैसे पहुंचें",
    lead: "मगहर, उत्तर प्रदेश के प्रमुख शहरों से रेल और सड़क मार्ग द्वारा भली-भांति जुड़ा है। नीचे दी गई जानकारी उपलब्ध विश्वसनीय स्रोतों पर आधारित है।",
    modes: [
      {
        icon: "train" as const,
        heading: "रेल मार्ग",
        points: [
          "मगहर का अपना रेलवे स्टेशन है — मगहर रेलवे स्टेशन (कोड: MHH), जो लखनऊ-गोरखपुर रेलमार्ग (उत्तर पूर्व रेलवे) पर एनएच-28 के निकट स्थित है।",
          "गोरखपुर से मगहर की रेल दूरी लगभग 25 किलोमीटर है।",
          "वाराणसी से मगहर की रेल-मार्ग दूरी लगभग 252 किलोमीटर है (गोरखपुर होते हुए)।",
        ],
      },
      {
        icon: "plane" as const,
        heading: "वायु मार्ग",
        points: [
          "निकटतम हवाई अड्डा गोरखपुर हवाई अड्डा है।",
          "लखनऊ का चौधरी चरण सिंह अंतरराष्ट्रीय हवाई अड्डा मगहर से लगभग 265 किलोमीटर दूर है, जहां घरेलू एवं सीमित अंतरराष्ट्रीय उड़ानें उपलब्ध हैं।",
        ],
      },
      {
        icon: "car" as const,
        heading: "सड़क मार्ग",
        points: [
          "मगहर राष्ट्रीय राजमार्ग एनएच-28 पर स्थित है, जो इसे गोरखपुर (पूर्व) और बस्ती/फैज़ाबाद (अयोध्या)/बाराबंकी होते हुए लखनऊ से जोड़ता है।",
          "जिला मुख्यालय खलीलाबाद से मगहर की दूरी लगभग 5-9 किलोमीटर है।",
          "लखनऊ से मगहर तक सड़क मार्ग से लगभग 6 घंटे का समय लगता है (लगभग 265 किलोमीटर)।",
        ],
      },
    ],
    note: "दूरियां अनुमानित हैं और स्रोत के अनुसार थोड़ा भिन्न हो सकती हैं। यात्रा से पहले वर्तमान परिवहन जानकारी की पुष्टि कर लें।",
  },
  en: {
    kicker: "Maghar · How to Reach",
    title: "How to Reach Maghar",
    lead: "Maghar is well connected to major cities in Uttar Pradesh by rail and road. The information below is based on the most reliable sources available.",
    modes: [
      {
        icon: "train" as const,
        heading: "By Rail",
        points: [
          "Maghar has its own railway station — Maghar railway station (code: MHH) — on the Lucknow-Gorakhpur line (North Eastern Railway), located beside NH-28.",
          "The rail distance from Gorakhpur to Maghar is approximately 25 km.",
          "The rail-route distance from Varanasi to Maghar is approximately 252 km (via Gorakhpur).",
        ],
      },
      {
        icon: "plane" as const,
        heading: "By Air",
        points: [
          "The nearest airport is Gorakhpur Airport.",
          "Lucknow's Chaudhary Charan Singh International Airport is about 265 km from Maghar, offering domestic and limited international flights.",
        ],
      },
      {
        icon: "car" as const,
        heading: "By Road",
        points: [
          "Maghar lies on National Highway 28, connecting it to Gorakhpur (east) and, via Basti/Faizabad (Ayodhya)/Barabanki, to Lucknow.",
          "Maghar is roughly 5-9 km from the district headquarters, Khalilabad.",
          "The road journey from Lucknow to Maghar takes approximately 6 hours (about 265 km).",
        ],
      },
    ],
    note: "Distances are approximate and may vary slightly by source. Please confirm current transport information before travelling.",
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
      canonical: `/${locale}/maghar/kaise-pahunche`,
      languages: { hi: "/hi/maghar/kaise-pahunche", en: "/en/maghar/kaise-pahunche" },
    },
  };
}

const ICONS = { train: TrainFront, plane: Plane, car: Car };

export default async function KaisePahunchePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale as "hi" | "en"];
  const children = NAV_ITEMS.find((i) => i.href === "/maghar")?.children ?? [];

  return (
    <>
      <SectionSubNav items={children} activeHref="/maghar/kaise-pahunche" />
      <Container className="py-14">
        <div className="max-w-2xl">
          <SectionHeading kicker={c.kicker} title={c.title} />
          <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>
          <FactBadge kind="verified" className="mt-4" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {c.modes.map((mode) => {
            const Icon = ICONS[mode.icon];
            return (
              <div key={mode.heading} className="rounded-sm border border-border-soft bg-paper p-6">
                <Icon className="h-6 w-6 text-saffron" aria-hidden="true" />
                <h2 className="mt-3 font-heading text-lg font-semibold text-ink">{mode.heading}</h2>
                <ul className="mt-3 space-y-2.5">
                  {mode.points.map((point, i) => (
                    <li key={i} className="font-body text-sm leading-relaxed text-ink-soft">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-8 max-w-2xl font-body text-sm italic text-ink-faint">{c.note}</p>
      </Container>
    </>
  );
}
