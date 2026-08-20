import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Calendar, HandHeart, PlayCircle, Users, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/utils";

// Local bilingual content for the ten activity types organised by the
// community. Kept general and non-invented — describes the type of
// activity, not specific statistics or claims.
const activities = [
  {
    key: "satsang",
    icon: Users,
    hi: {
      title: "सत्संग",
      desc: "सत्संग के अंतर्गत भक्त और श्रद्धालु मिलकर भजन-कीर्तन, कथा-श्रवण और सामूहिक ध्यान करते हैं। यह नियमित रूप से आयोजित होने वाली एक आध्यात्मिक सभा है, जहाँ संत कबीर की वाणी पर चर्चा की जाती है।",
    },
    en: {
      title: "Satsang",
      desc: "Satsang gatherings bring devotees together for devotional singing (bhajan-kirtan), listening to discourse, and collective reflection. These are regularly held spiritual assemblies centred on the verses of Sant Kabir.",
    },
  },
  {
    key: "pravachan",
    icon: PlayCircle,
    hi: {
      title: "प्रवचन",
      desc: "प्रवचन कार्यक्रमों में महंत जी अथवा आमंत्रित संत, संत कबीर की शिक्षाओं, दोहों और जीवन-दर्शन की व्याख्या करते हैं। श्रद्धालु इन प्रवचनों से मार्गदर्शन एवं आध्यात्मिक ज्ञान प्राप्त करते हैं।",
    },
    en: {
      title: "Pravachan",
      desc: "Pravachan sessions feature Mahant Ji or invited saints expounding on Sant Kabir's teachings, dohas, and philosophy of life. Devotees attend these discourses for guidance and spiritual learning.",
    },
  },
  {
    key: "religious-programmes",
    icon: Calendar,
    hi: {
      title: "धार्मिक कार्यक्रम",
      desc: "समय-समय पर विभिन्न पारंपरिक धार्मिक कार्यक्रम एवं सभाएं आयोजित की जाती हैं, जो समुदाय की आस्था और परंपरा को जीवंत बनाए रखती हैं। इनमें पूजा-अर्चना, विशेष सभाएं और सांस्कृतिक आयोजन सम्मिलित हो सकते हैं।",
    },
    en: {
      title: "Religious Programmes",
      desc: "Various traditional religious programmes and assemblies are organised from time to time, keeping the community's faith and traditions alive. These may include prayer gatherings, special sabhas, and cultural observances.",
    },
  },
  {
    key: "guru-purnima",
    icon: Calendar,
    hi: {
      title: "गुरु पूर्णिमा",
      desc: "गुरु पूर्णिमा के अवसर पर गुरु-परंपरा के प्रति कृतज्ञता व्यक्त करते हुए विशेष सत्संग और सभा का आयोजन किया जाता है। यह दिन गुरुओं के मार्गदर्शन और शिक्षाओं का स्मरण करने के लिए समर्पित है।",
    },
    en: {
      title: "Guru Purnima",
      desc: "Guru Purnima is marked with a special satsang and gathering expressing gratitude to the guru tradition. The day is dedicated to remembering the guidance and teachings of one's spiritual teachers.",
    },
  },
  {
    key: "kabir-jayanti",
    icon: Calendar,
    hi: {
      title: "कबीर जयंती",
      desc: "कबीर जयंती के अवसर पर संत कबीर दास जी के जन्म का स्मरण भजन, प्रवचन और सामूहिक कार्यक्रमों के माध्यम से किया जाता है। यह श्रद्धालुओं के लिए उनकी वाणी और शिक्षाओं को पुनः आत्मसात करने का अवसर होता है।",
    },
    en: {
      title: "Kabir Jayanti",
      desc: "Kabir Jayanti commemorates the birth anniversary of Sant Kabir Das through bhajans, discourses, and community gatherings. It offers devotees an occasion to revisit his verses and teachings.",
    },
  },
  {
    key: "kabir-mahotsav",
    icon: Calendar,
    hi: {
      title: "कबीर महोत्सव",
      desc: "कबीर महोत्सव एक बहु-दिवसीय आयोजन है जिसमें भजन-संध्या, प्रवचन, सांस्कृतिक प्रस्तुतियाँ और सद्भावना से जुड़े कार्यक्रम सम्मिलित होते हैं। यह मगहर की आध्यात्मिक परंपरा को व्यापक स्तर पर मनाने का अवसर है।",
    },
    en: {
      title: "Kabir Mahotsav",
      desc: "Kabir Mahotsav is a multi-day observance featuring devotional evenings, discourses, cultural presentations, and goodwill-oriented programmes. It is an occasion to celebrate Maghar's spiritual tradition on a wider scale.",
    },
  },
  {
    key: "nirvan-diwas",
    icon: Calendar,
    hi: {
      title: "निर्वाण / परिनिर्वाण दिवस",
      desc: "निर्वाण/परिनिर्वाण दिवस पर संत कबीर दास जी द्वारा मगहर में देह त्यागने के स्मरण में विशेष सभा, प्रार्थना और सामूहिक श्रद्धांजलि का आयोजन होता है। यह दिन उनके जीवन-संदेश पर चिंतन का अवसर प्रदान करता है।",
    },
    en: {
      title: "Nirvan / Parinirvan Diwas",
      desc: "Nirvan/Parinirvan Diwas observes the anniversary associated with Sant Kabir Das's passing at Maghar, marked by a special assembly, prayers, and collective tribute. The day offers an occasion for reflection on his life's message.",
    },
  },
  {
    key: "bhandara",
    icon: HandHeart,
    hi: {
      title: "भंडारा / अन्न सेवा",
      desc: "भंडारा एवं अन्न सेवा के अंतर्गत श्रद्धालुओं तथा आगंतुकों के लिए सामूहिक भोजन-सेवा का आयोजन किया जाता है। यह सेवा और समभाव की भावना से प्रेरित एक पारंपरिक गतिविधि है, जो विशेष अवसरों पर आयोजित होती है।",
    },
    en: {
      title: "Bhandara / Annaseva",
      desc: "Bhandara and Annaseva involve organising community food-service for devotees and visitors. Rooted in the spirit of seva and equality, this traditional activity is typically organised on special occasions.",
    },
  },
  {
    key: "samajik-seva",
    icon: HandHeart,
    hi: {
      title: "सामाजिक सेवा",
      desc: "समुदाय समय-समय पर सामाजिक सेवा गतिविधियों में भाग लेता है, जिनका उद्देश्य आवश्यकतामंद व्यक्तियों तक सहायता पहुँचाना और सामाजिक जागरूकता बढ़ाना है। ये गतिविधियाँ संत कबीर की मानवता और समानता की शिक्षाओं से प्रेरित हैं।",
    },
    en: {
      title: "Social Service",
      desc: "The community periodically takes part in social-service activities aimed at supporting those in need and raising social awareness. These efforts draw inspiration from Sant Kabir's teachings on humanity and equality.",
    },
  },
  {
    key: "antardharmik-sadbhav",
    icon: Users,
    hi: {
      title: "अंतरधार्मिक सद्भाव कार्यक्रम",
      desc: "अंतरधार्मिक सद्भाव कार्यक्रमों के माध्यम से विभिन्न धर्मों और परंपराओं के लोगों को साथ लाने का प्रयास किया जाता है, जो मगहर की हिंदू-मुस्लिम एकता की मिसाल से प्रेरित है। इनमें संवाद, सामूहिक सभाएं और सद्भावना से जुड़े आयोजन सम्मिलित होते हैं।",
    },
    en: {
      title: "Interfaith Harmony Programmes",
      desc: "Interfaith harmony programmes seek to bring together people of different faiths and traditions, inspired by Maghar's example of Hindu-Muslim unity. These include dialogue, joint gatherings, and goodwill events.",
    },
  },
];

const viewEventsLabel = { hi: "देखें कार्यक्रम", en: "View events" };
const closingLine = {
  hi: "इनमें से किसी भी गतिविधि के आगामी आयोजन के लिए कार्यक्रम सूची देखें, अथवा सेवा कार्यों में सहयोग हेतु दान पृष्ठ पर जाएं।",
  en: "Check the events page for upcoming dates for any of these activities, or visit the donate page to support our seva work.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Activities" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/activities`,
      languages: { hi: "/hi/activities", en: "/en/activities" },
    },
  };
}

export default async function ActivitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Activities");

  return (
    <>
      <section className="border-b border-border-soft bg-cream-soft py-16 sm:py-20">
        <Container>
          <SectionHeading kicker={t("title")} title={t("subtitle")} />
          <p className="mt-6 max-w-3xl font-body text-ink-soft">{t("intro")}</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => {
              const Icon = activity.icon;
              const content = pick(locale, activity.hi, activity.en);
              return (
                <div
                  key={activity.key}
                  className="flex flex-col rounded-sm border border-border-soft bg-paper p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-saffron-soft text-saffron">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-ink">
                    {content.title}
                  </h3>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
                    {content.desc}
                  </p>
                  <Link
                    href="/events"
                    className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-saffron hover:text-saffron-dark"
                  >
                    {pick(locale, viewEventsLabel.hi, viewEventsLabel.en)}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <div className="motif-divider" />

      <section className="py-16 sm:py-20">
        <Container className="text-center">
          <p className="mx-auto max-w-2xl font-body text-ink-soft">
            {pick(locale, closingLine.hi, closingLine.en)}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button href="/seva" variant="outline">
              {pick(locale, "सेवा कार्य देखें", "View Seva Work")}
            </Button>
            <Button href="/donate" variant="primary">
              {pick(locale, "दान करें", "Donate")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
