import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AttributedImage } from "@/components/ui/AttributedImage";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { IMAGE_SOURCES } from "@/content/image-sources";
import { ArrowRight } from "lucide-react";

const content = {
  hi: {
    kicker: "संत कबीर जी",
    title: "संत कबीर दास जी",
    lead: "पंद्रहवीं-सोलहवीं शताब्दी के महान संत, कवि और समाज-सुधारक — जिन्होंने अपनी वाणी से जाति, धर्म और कर्मकांड की सीमाओं से ऊपर उठकर सत्य, प्रेम और मानवता का शाश्वत संदेश दिया।",
    body: [
      "संत कबीर दास जी भारत की भक्ति परंपरा के सबसे प्रभावशाली संत-कवियों में गिने जाते हैं। परंपरा के अनुसार वाराणसी में जन्मे और मगहर में देह त्यागने वाले कबीर ने अपने दोहों और पदों के माध्यम से हिंदू और मुस्लिम — दोनों समुदायों के भीतर व्याप्त बाहरी आडंबर और कर्मकांड की आलोचना की।",
      "उनकी वाणी आज भी उतनी ही प्रासंगिक है, क्योंकि वे जाति व्यवस्था, धार्मिक भेदभाव और आडंबरपूर्ण पूजा-पद्धति से ऊपर उठकर एक ऐसे सत्य की बात करते हैं जो हर मनुष्य के भीतर विद्यमान है।",
    ],
    exploreLabel: "आगे जानें",
  },
  en: {
    kicker: "Sant Kabir Ji",
    title: "Sant Kabir Das Ji",
    lead: "A saint, poet and social reformer of the 15th–16th century, whose verses rose above the boundaries of caste, religion and ritual to carry an enduring message of truth, love and humanity.",
    body: [
      "Sant Kabir Das Ji is counted among the most influential saint-poets of India's Bhakti tradition. Traditionally said to have been born in Varanasi and to have left his body in Maghar, Kabir used his dohas and verses to critique the empty ritualism he saw within both Hindu and Muslim religious practice of his time.",
      "His words remain relevant today, speaking to a truth that transcends caste, religious division and ostentatious ritual — a truth he held to reside within every human being.",
    ],
    exploreLabel: "Explore further",
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
      canonical: `/${locale}/sant-kabir`,
      languages: { hi: "/hi/sant-kabir", en: "/en/sant-kabir" },
    },
  };
}

export default async function SantKabirHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale as "hi" | "en"];
  const t = await getTranslations("Nav");
  const children = NAV_ITEMS.find((i) => i.href === "/sant-kabir")?.children ?? [];

  return (
    <>
      <SectionSubNav items={children} activeHref="/sant-kabir" />
      <Container className="grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <SectionHeading kicker={c.kicker} title={c.title} />
          <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">{c.lead}</p>
          {c.body.map((para, i) => (
            <p key={i} className="mt-4 font-body leading-relaxed text-ink-soft">
              {para}
            </p>
          ))}
        </div>
        <AttributedImage image={IMAGE_SOURCES.kabirModernIllustration} locale={locale} priority />
      </Container>

      <div className="motif-divider" />

      <Container className="py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="group flex items-center justify-between rounded-sm border border-border-soft bg-paper px-5 py-4 transition-colors hover:border-saffron"
            >
              <span className="font-heading text-base text-ink group-hover:text-saffron">
                {t(child.labelKey)}
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-1 group-hover:text-saffron"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
