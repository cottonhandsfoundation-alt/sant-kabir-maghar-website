import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactBadge } from "@/components/ui/FactBadge";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { AttributedImage } from "@/components/ui/AttributedImage";
import { NAV_ITEMS } from "@/lib/nav";
import { IMAGE_SOURCES } from "@/content/image-sources";

const content = {
  hi: {
    kicker: "मगहर · संत कबीर निर्वाण स्थली",
    title: "संत कबीर निर्वाण स्थली",
    lead: "संत कबीर निर्वाण स्थली — जिसे संत कबीर चौरा भी कहा जाता है — संत कबीर नगर जिले का वह परिसर है जहां संत कबीर दास जी ने अपना जीवन पूर्ण किया। यहां समाधि, मजार, साधना गुफा और संत कबीर अकादमी सम्मिलित रूप से स्थित हैं।",
    sections: [
      {
        heading: "साधना गुफा",
        badge: "verified" as const,
        body: "परिसर में एक साधना गुफा भी स्थित है, जिसे परंपरागत रूप से कबीर से जोड़ा जाता है। 2018 में प्रधानमंत्री नरेंद्र मोदी की मगहर यात्रा के दौरान उन्होंने इस गुफा का भी अवलोकन किया था। यहां उत्तर प्रदेश राज्य पुरातत्व विभाग द्वारा स्थापित एक सूचना पट्ट भी लगा है।",
      },
      {
        heading: "संत कबीर अकादमी",
        badge: "verified" as const,
        body: "मगहर में ही उत्तर प्रदेश सरकार के संस्कृति विभाग के अंतर्गत 'संत कबीर अकादमी' की स्थापना की गई है, जिसकी आधारशिला प्रधानमंत्री मोदी ने 28 जून 2018 को रखी थी। यह संस्था कबीर के जीवन, साहित्य और दर्शन पर शोध, प्रकाशन एवं शैक्षणिक गतिविधियों हेतु समर्पित है।",
      },
      {
        heading: "प्रबंधन",
        badge: "traditional" as const,
        body: "स्थल का प्रबंधन परंपरागत रूप से हिंदू-मुस्लिम साझी व्यवस्था पर आधारित बताया जाता है — समाधि की देखरेख कबीरपंथी परंपरा के अनुसार होती है, जबकि मजार की देखरेख एक मुतवल्ली द्वारा। सटीक संस्थागत/न्यासिक व्यवस्था का विवरण स्रोत के अनुसार भिन्न हो सकता है।",
      },
    ],
  },
  en: {
    kicker: "Maghar · Sant Kabir Nirvan Sthali",
    title: "Sant Kabir Nirvan Sthali",
    lead: "The Sant Kabir Nirvan Sthali — also referred to as Sant Kabir Chaura — is the complex within Sant Kabir Nagar district where Sant Kabir Das Ji's life came to its end. The Samadhi, Mazar, Sadhna Gupha and Sant Kabir Academy are all situated together here.",
    sections: [
      {
        heading: "The Sadhna Gupha",
        badge: "verified" as const,
        body: "The complex also includes a Sadhna Gupha (meditation cave), traditionally associated with Kabir. During his 2018 visit to Maghar, Prime Minister Narendra Modi also visited this cave. An information board installed by the Uttar Pradesh State Archaeology Department stands at the site.",
      },
      {
        heading: "Sant Kabir Academy",
        badge: "verified" as const,
        body: "The 'Sant Kabir Academy' has been established at Maghar under the Uttar Pradesh government's Department of Culture, with its foundation stone laid by PM Modi on 28 June 2018. The institution is dedicated to research, publishing and educational activity around Kabir's life, literature and philosophy.",
      },
      {
        heading: "Site Management",
        badge: "traditional" as const,
        body: "The site's management is traditionally described as a shared Hindu-Muslim arrangement — the Samadhi cared for within Kabirpanthi tradition, and the Mazar cared for by a Mutwalli (Muslim custodian). The precise institutional/trust arrangement may be described differently across sources.",
      },
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
      canonical: `/${locale}/maghar/nirvan-sthali`,
      languages: { hi: "/hi/maghar/nirvan-sthali", en: "/en/maghar/nirvan-sthali" },
    },
  };
}

export default async function NirvanSthaliPage({
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
      <SectionSubNav items={children} activeHref="/maghar/nirvan-sthali" />
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="max-w-2xl">
            <SectionHeading kicker={c.kicker} title={c.title} />
            <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>

            <div className="mt-10 space-y-8">
              {c.sections.map((s, i) => (
                <section key={i}>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h2 className="font-heading text-xl font-semibold text-ink">{s.heading}</h2>
                    <FactBadge kind={s.badge} />
                  </div>
                  <p className="font-body leading-relaxed text-ink-soft">{s.body}</p>
                </section>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <AttributedImage image={IMAGE_SOURCES.sadhanaGupha1} locale={locale} />
            <AttributedImage image={IMAGE_SOURCES.sadhanaGuphaInfoBoard} locale={locale} />
          </div>
        </div>
      </Container>
    </>
  );
}
