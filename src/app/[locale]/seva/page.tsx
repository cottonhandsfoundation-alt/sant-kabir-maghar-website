import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HandHeart, Users, Calendar, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { pick } from "@/lib/utils";

// General, dignified description of the categories of seva / social work a
// Kabir-tradition community organisation would plausibly undertake. No
// specific unverified statistics or named programmes are claimed here.
const categories = [
  {
    key: "annadaan",
    icon: HandHeart,
    hi: {
      title: "अन्नदान / भोजन सेवा",
      desc: "भंडारे और विशेष अवसरों पर श्रद्धालुओं तथा आगंतुकों के लिए सामूहिक भोजन-सेवा (अन्नदान) का आयोजन किया जाता है। यह सेवा, समभाव और आतिथ्य की भावना से प्रेरित एक पारंपरिक कार्य है।",
    },
    en: {
      title: "Annadaan / Food Service",
      desc: "On bhandaras and special occasions, community food-service (annadaan) is organised for devotees and visitors alike. This work is rooted in the traditional spirit of service, equality, and hospitality.",
    },
  },
  {
    key: "gathering-support",
    icon: Users,
    hi: {
      title: "धार्मिक आयोजनों में सहयोग",
      desc: "सत्संग, प्रवचन और अन्य धार्मिक सभाओं के सुचारु आयोजन के लिए स्वयंसेवक व्यवस्था, आगंतुक सहायता और स्थल-प्रबंधन जैसी सेवाओं में योगदान देते हैं, जिससे श्रद्धालुओं को सुगमता से भाग लेने का अवसर मिल सके।",
    },
    en: {
      title: "Support During Religious Gatherings",
      desc: "Volunteers help with arrangements, visitor assistance, and venue management during satsang, pravachan, and other religious gatherings, so that devotees can take part with ease and comfort.",
    },
  },
  {
    key: "harmony",
    icon: Calendar,
    hi: {
      title: "सामाजिक सद्भाव कार्यक्रम",
      desc: "मगहर की हिंदू-मुस्लिम एकता की परंपरा से प्रेरित होकर, विभिन्न समुदायों के बीच संवाद और सद्भावना को बढ़ावा देने वाले कार्यक्रम आयोजित किए जाते हैं, ताकि परस्पर सम्मान और समझ की भावना सुदृढ़ हो।",
    },
    en: {
      title: "Promoting Communal Harmony",
      desc: "Inspired by Maghar's tradition of Hindu-Muslim unity, programmes are organised to foster dialogue and goodwill between communities, strengthening mutual respect and understanding.",
    },
  },
  {
    key: "education",
    icon: PlayCircle,
    hi: {
      title: "शैक्षिक एवं सांस्कृतिक जागरूकता",
      desc: "प्रवचन, प्रकाशन और सार्वजनिक कार्यक्रमों के माध्यम से संत कबीर की शिक्षाओं — सत्य, प्रेम, समानता और मानवता — के प्रति जागरूकता फैलाने का प्रयास किया जाता है, जिससे नई पीढ़ी भी इस परंपरा से जुड़ सके।",
    },
    en: {
      title: "Educational & Cultural Awareness",
      desc: "Through discourses, publications, and public programmes, efforts are made to spread awareness of Sant Kabir's teachings — truth, love, equality, and humanity — helping newer generations connect with this tradition.",
    },
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seva" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/seva`,
      languages: { hi: "/hi/seva", en: "/en/seva" },
    },
  };
}

export default async function SevaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Seva");

  return (
    <>
      <section className="border-b border-border-soft bg-cream-soft py-16 sm:py-20">
        <Container>
          <SectionHeading kicker={t("title")} title={t("subtitle")} />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const content = pick(locale, category.hi, category.en);
              return (
                <div
                  key={category.key}
                  className="flex gap-4 rounded-sm border border-border-soft bg-paper p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-pale text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-ink">
                      {content.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                      {content.desc}
                    </p>
                  </div>
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
            {pick(
              locale,
              "आपका सहयोग इन सेवा कार्यों को निरंतर आगे बढ़ाने में सहायक होता है।",
              "Your support helps sustain and continue these seva initiatives."
            )}
          </p>
          <div className="mt-6">
            <Button href="/donate" variant="primary">
              {t("donateCta")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
