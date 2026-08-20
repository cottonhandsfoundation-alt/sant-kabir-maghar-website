import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactBadge } from "@/components/ui/FactBadge";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { NAV_ITEMS } from "@/lib/nav";

const content = {
  hi: {
    kicker: "मगहर · परंपरा",
    title: "कबीर से जुड़ी परंपरा",
    lead: "मगहर से जुड़ी कुछ कथाएं और मान्यताएं सदियों से मौखिक परंपरा में सुरक्षित रही हैं। यहां हम इन्हें स्पष्ट रूप से परंपरा के रूप में प्रस्तुत करते हैं — ऐतिहासिक तथ्य के रूप में नहीं।",
    sections: [
      {
        heading: "मगहर में मृत्यु की लोक-मान्यता",
        badge: "traditional" as const,
        body: "कबीर के युग में यह व्यापक लोक-मान्यता प्रचलित थी कि काशी (वाराणसी) में देह त्यागने से मोक्ष मिलता है, जबकि मगहर में मृत्यु से अगले जन्म में गधे की योनि प्राप्त होती है। कहा जाता है कि कबीर ने स्वयं मगहर को चुनकर इस अंधविश्वास को चुनौती दी।",
      },
      {
        heading: "फूलों की कथा",
        badge: "traditional" as const,
        body: "परंपरा के अनुसार, कबीर के निर्वाण के बाद उनके हिंदू और मुस्लिम अनुयायियों के बीच अंतिम संस्कार को लेकर विवाद खड़ा हुआ — हिंदू दाह-संस्कार चाहते थे, मुस्लिम दफन। जब चादर हटाई गई, तो वहां शरीर के स्थान पर केवल सुगंधित फूल पाए गए। इन फूलों को दोनों समुदायों में बांट दिया गया — हिंदुओं ने अपने हिस्से का दाह-संस्कार किया, मुसलमानों ने अपने हिस्से को दफनाया। इसी कथा के आधार पर समाधि और मजार, दोनों का निर्माण हुआ।",
      },
      {
        heading: "मगहर महोत्सव की ऐतिहासिक जड़ें",
        badge: "verified" as const,
        body: "वर्तमान मगहर महोत्सव/कबीर महोत्सव की जड़ें 1937 में आयोजित 'कबीर निर्वाण मेला' तक जाती हैं। 1955-56 से यह स्थानीय व्यापारियों द्वारा आयोजित एक दो-दिवसीय मेले के रूप में विकसित हुआ, और 1987 के बाद जिला प्रशासन के सहयोग से इसे औपचारिक रूप से 'कबीर महोत्सव' नाम दिया गया। यह उत्सव उत्तर प्रदेश पर्यटन विभाग, संस्कृति विभाग और जिला प्रशासन द्वारा संयुक्त रूप से आयोजित किया जाता है।",
      },
      {
        heading: "एक स्पष्टीकरण",
        badge: "verified" as const,
        body: "'कबीर निर्वाण दिवस' नाम से कुछ विशिष्ट संप्रदायों (जैसे संत रामपाल जी से जुड़ा समुदाय) द्वारा भी एक पृथक धार्मिक आयोजन मनाया जाता है, जो माघ शुक्ल एकादशी को केंद्रित है। यह एक विशिष्ट संप्रदाय की मान्यता है और इसे मगहर के सरकारी/सामुदायिक कबीर महोत्सव से अलग समझा जाना चाहिए।",
      },
    ],
  },
  en: {
    kicker: "Maghar · Tradition",
    title: "Traditions of Kabir",
    lead: "Several stories and beliefs connected to Maghar have been preserved through oral tradition for centuries. Here they are presented explicitly as tradition — not as historical fact.",
    sections: [
      {
        heading: "The Popular Belief About Death at Maghar",
        badge: "traditional" as const,
        body: "In Kabir's era, a widespread popular belief held that dying in Kashi (Varanasi) guaranteed salvation, while death in Maghar led to rebirth as a donkey. Kabir is said to have deliberately chosen Maghar to challenge this superstition.",
      },
      {
        heading: "The Legend of the Flowers",
        badge: "traditional" as const,
        body: "Tradition holds that after Kabir's passing, a dispute arose between his Hindu and Muslim followers over his funeral rites — Hindus wishing to cremate him, Muslims to bury him. When the shroud was lifted, only fragrant flowers were found in place of a body. These flowers were divided between the two communities — the Hindus cremating their share, the Muslims burying theirs. Both the Samadhi and the Mazar are said to have been built on this basis.",
      },
      {
        heading: "The Historical Roots of the Maghar Mahotsav",
        badge: "verified" as const,
        body: "The present-day Maghar Mahotsav/Kabir Mahotsav traces its roots to the 'Kabir Nirvan Mela' held in 1937. From 1955-56 it developed into a two-day fair organised by local merchants, and after 1987 it was formally renamed 'Kabir Mahotsav' with district administration involvement. It is organised jointly by the Uttar Pradesh Department of Tourism, Department of Culture and the district administration.",
      },
      {
        heading: "A Clarification",
        badge: "verified" as const,
        body: "A separate religious observance also called 'Kabir Nirvan Diwas', centred on Magh Shukla Ekadashi, is marked by certain specific sects (such as the community associated with Sant Rampal Ji). This is a particular sect's belief and should be understood as distinct from the government/community Kabir Mahotsav held at Maghar.",
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
      canonical: `/${locale}/maghar/parampara`,
      languages: { hi: "/hi/maghar/parampara", en: "/en/maghar/parampara" },
    },
  };
}

export default async function ParamparaPage({
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
      <SectionSubNav items={children} activeHref="/maghar/parampara" />
      <Container className="py-14">
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
      </Container>
    </>
  );
}
