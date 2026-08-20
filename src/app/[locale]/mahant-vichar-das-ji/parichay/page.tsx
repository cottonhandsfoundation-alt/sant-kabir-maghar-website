import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactBadge } from "@/components/ui/FactBadge";
import { PortraitPlaceholder } from "@/components/ui/PortraitPlaceholder";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { NAV_ITEMS } from "@/lib/nav";

const content = {
  hi: {
    kicker: "महंत विचार दास जी · परिचय",
    title: "परिचय",
    lead: "महंत विचार दास जी को अनेक स्वतंत्र समाचार स्रोतों में वर्षों से मगहर स्थित कबीर चौरा/समाधि स्थल से जुड़े एक मगहर मठ के महंत के रूप में उल्लेखित किया गया है।",
    body: [
      "समाचार रिपोर्टों में उन्हें 2018, 2021 और 2025 सहित विभिन्न अवसरों पर मगहर में आयोजित धार्मिक कार्यक्रमों का नेतृत्व करते हुए दर्शाया गया है — जिनमें संत कबीर परिनिर्वाण दिवस समारोह और कबीर महोत्सव जैसे आयोजन शामिल हैं।",
      "विभिन्न स्रोतों में उनकी संस्थागत उपाधि और मठ का औपचारिक नाम भिन्न-भिन्न रूप से उल्लेखित हुआ है — जैसे 'कबीर चौरा, मगहर के महंत', 'संत कबीर साहेब शोध संस्थान' से संबद्ध, या 'मगहर मठ' के महंत। चूंकि किसी एक आधिकारिक, सर्वसम्मत नाम की पुष्टि नहीं हो पाई है, इसलिए इस वेबसाइट पर हम जानबूझकर किसी एक विशिष्ट संस्थागत नाम का दावा नहीं करते — इसके बजाय सामान्य, सम्मानजनक विवरण का प्रयोग करते हैं।",
      "यह भी उल्लेखनीय है कि कबीर पंथ की व्यापक संस्थागत परंपरा के भीतर उत्तराधिकार व वैधता से जुड़े कुछ विषय समय-समय पर सार्वजनिक चर्चा और कानूनी प्रक्रिया का हिस्सा रहे हैं। यह वेबसाइट किसी भी पक्ष के दावे को अंतिम सत्य के रूप में प्रस्तुत नहीं करती, और न ही किसी विवाद में पक्ष लेती है — हमारा उद्देश्य केवल संत कबीर की शिक्षाओं और मगहर से जुड़ी सुस्थापित जानकारी साझा करना है।",
    ],
  },
  en: {
    kicker: "Mahant Vichar Das Ji · Introduction",
    title: "Introduction",
    lead: "Mahant Vichar Das Ji has been referred to across multiple independent news sources over the years as a mahant associated with the Kabir Chaura/Samadhi site at Maghar.",
    body: [
      "News reports describe him leading religious observances at Maghar on various occasions — including in 2018, 2021 and 2025 — such as Sant Kabir Parinirvan Divas commemorations and the Kabir Mahotsav.",
      "His institutional title and the formal name of the associated math have been reported differently across sources — variously as 'Mahant of Kabir Chaura, Maghar', associated with the 'Sant Kabir Sahib Shodh Sansthan', or as mahant of the 'Maghar Math'. Since no single, universally confirmed official name could be established, this website deliberately avoids asserting one specific institutional name — using general, respectful description instead.",
      "It should also be noted that questions of succession and legitimacy within the wider institutional tradition of the Kabir Panth have, at times, been the subject of public discussion and legal process. This website does not present any single party's claim as settled fact, nor does it take a position in any such matter — our purpose here is only to share well-established information about Sant Kabir's teachings and Maghar.",
    ],
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
      canonical: `/${locale}/mahant-vichar-das-ji/parichay`,
      languages: {
        hi: "/hi/mahant-vichar-das-ji/parichay",
        en: "/en/mahant-vichar-das-ji/parichay",
      },
    },
  };
}

export default async function ParichayPage({
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
      <SectionSubNav items={children} activeHref="/mahant-vichar-das-ji/parichay" />
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="max-w-2xl">
            <SectionHeading kicker={c.kicker} title={c.title} />
            <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>
            <FactBadge kind="verified" className="mt-4" />
            {c.body.map((p, i) => (
              <p key={i} className="mt-4 font-body leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
          <PortraitPlaceholder
            initials="वि. दा."
            label={
              locale === "hi"
                ? "आधिकारिक चित्र उपलब्ध होने पर अद्यतन किया जाएगा"
                : "Will be updated once an official portrait is available"
            }
          />
        </div>
      </Container>
    </>
  );
}
