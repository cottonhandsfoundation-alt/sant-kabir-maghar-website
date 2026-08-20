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
    kicker: "मगहर · कबीर चौरा",
    title: "कबीर चौरा",
    lead: "कबीर चौरा (मगहर) संत कबीर से जुड़े दो प्रमुख स्थलों में से एक है — दूसरा वाराणसी में स्थित है। मगहर का कबीर चौरा कबीर पंथ की काशी-केंद्रित परंपरा की एक शाखा से जुड़ा माना जाता है।",
    sections: [
      {
        heading: "परिसर",
        badge: "verified" as const,
        body: "मगहर का कबीर चौरा परिसर समाधि, मजार, साधना गुफा और संत कबीर अकादमी को एक साथ समेटे हुए है। यह परिसर 'Wiki Loves Monuments' जैसे सामुदायिक प्रयासों में भी दस्तावेज़ीकृत किया गया है।",
      },
      {
        heading: "वाराणसी के कबीर चौरा से संबंध",
        badge: "traditional" as const,
        body: "परंपरा के अनुसार, कबीर पंथ की काशी/कबीर चौरा शाखा की स्थापना कबीर के शिष्य सूरत गोपाल द्वारा की गई मानी जाती है, जिसकी एक शाखा मगहर में भी विकसित हुई। दोनों स्थलों के बीच सटीक संस्थागत संबंध को लेकर सार्वजनिक रूप से विभिन्न दृष्टिकोण सामने आए हैं, जिसमें कानूनी प्रक्रिया भी शामिल रही है — इस वेबसाइट पर हम इस विषय पर कोई निश्चित पक्ष प्रस्तुत नहीं करते।",
      },
    ],
  },
  en: {
    kicker: "Maghar · Kabir Chaura",
    title: "Kabir Chaura",
    lead: "Kabir Chaura (Maghar) is one of two principal sites associated with Sant Kabir — the other being in Varanasi. The Maghar site is traditionally considered part of a branch of the Kashi-centred Kabir Panth tradition.",
    sections: [
      {
        heading: "The Complex",
        badge: "verified" as const,
        body: "The Kabir Chaura complex at Maghar brings together the Samadhi, Mazar, Sadhna Gupha and the Sant Kabir Academy. The site has also been documented through community efforts such as 'Wiki Loves Monuments'.",
      },
      {
        heading: "Relationship to Kabir Chaura, Varanasi",
        badge: "traditional" as const,
        body: "Tradition holds that the Kashi/Kabir Chaura branch of the Kabir Panth was established by Kabir's disciple Surat Gopal, with a branch presence developing at Maghar as well. The precise institutional relationship between the two sites has been the subject of differing public claims, including legal proceedings — this website does not take a position on that matter.",
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
      canonical: `/${locale}/maghar/kabir-chaura`,
      languages: { hi: "/hi/maghar/kabir-chaura", en: "/en/maghar/kabir-chaura" },
    },
  };
}

export default async function KabirChauraPage({
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
      <SectionSubNav items={children} activeHref="/maghar/kabir-chaura" />
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
            <AttributedImage image={IMAGE_SOURCES.kabirChauraMagharSign} locale={locale} />
          </div>
        </div>
      </Container>
    </>
  );
}
