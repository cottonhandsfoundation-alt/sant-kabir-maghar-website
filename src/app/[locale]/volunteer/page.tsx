import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VolunteerForm } from "@/components/forms/VolunteerForm";

const content = {
  hi: {
    kicker: "सेवा में सहभागिता",
    intro: [
      "संत कबीर जी ने सिखाया कि सच्ची भक्ति सेवा से ही सार्थक होती है। मगहर में होने वाले सत्संग, अन्नसेवा, आयोजन-प्रबंधन तथा सामाजिक कल्याण कार्यों में यदि आप अपना समय और श्रम देना चाहते हैं, तो हमें अत्यंत प्रसन्नता होगी।",
      "यहाँ किसी विशेष योग्यता की आवश्यकता नहीं — बस सेवा-भाव और थोड़ा सा समय पर्याप्त है। नीचे दिया गया फ़ॉर्म भरें, हमारी टीम शीघ्र ही आपसे संपर्क करेगी।",
    ],
  },
  en: {
    kicker: "Join Us in Seva",
    intro: [
      "Sant Kabir Ji taught that true devotion finds its meaning through service. If you would like to give your time and effort toward the satsang gatherings, community meals (annaseva), event organising, or social-welfare work carried out in Maghar, we would be glad to have you with us.",
      "No special qualification is needed — just a spirit of seva and a little time. Fill in the form below and our team will get in touch with you soon.",
    ],
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHi = locale === "hi";
  return {
    title: isHi ? "स्वयंसेवक बनें — संत कबीर सेवा समिति" : "Become a Volunteer — Sant Kabir Sewa Samiti",
    description: isHi
      ? "मगहर में सेवा, सत्संग एवं सामाजिक कल्याण गतिविधियों में स्वयंसेवक के रूप में जुड़ें।"
      : "Join as a volunteer to support seva, satsang, and social-welfare activities in Maghar.",
    alternates: {
      canonical: `/${locale}/volunteer`,
      languages: {
        hi: "/hi/volunteer",
        en: "/en/volunteer",
      },
    },
  };
}

export default async function VolunteerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("VolunteerForm");
  const c = content[locale as "hi" | "en"];

  return (
    <Container className="max-w-2xl py-16">
      <SectionHeading kicker={c.kicker} title={t("title")} align="center" />
      <p className="mt-4 text-center font-body text-ink-soft">{t("subtitle")}</p>

      <div className="mx-auto mt-8 max-w-xl space-y-3">
        {c.intro.map((p, i) => (
          <p key={i} className="text-center font-body text-sm text-ink-soft">
            {p}
          </p>
        ))}
      </div>

      <div className="motif-divider my-10" />

      <VolunteerForm />
    </Container>
  );
}
