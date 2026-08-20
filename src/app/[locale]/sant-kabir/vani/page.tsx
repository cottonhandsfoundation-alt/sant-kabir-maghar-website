import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactBadge } from "@/components/ui/FactBadge";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { DOHAS } from "@/content/dohas";

const content = {
  hi: {
    kicker: "संत कबीर जी · वाणी",
    title: "कबीर की वाणी",
    lead: "कबीर की वाणी मुख्यतः तीन बड़ी ग्रंथ-परंपराओं के माध्यम से हम तक पहुंची है — बीजक (काशी/कबीर चौरा परंपरा), कबीर ग्रंथावली (राजस्थानी परंपरा) और कबीर सागर (धर्मदासी परंपरा)। इन सबका मूल स्वरूप मौखिक था, जिसे बाद में लिपिबद्ध किया गया।",
    aboutTexts: [
      {
        title: "बीजक",
        body: "बीजक को तीन भागों में बांटा गया है — रमैनी, शब्द और साखी। यह ग्रंथ पाठक को भ्रम, पाखंड और रूढ़िवाद त्यागकर सत्य के सीधे अनुभव की ओर प्रेरित करता है।",
      },
      {
        title: "कबीर ग्रंथावली एवं साखी ग्रंथ",
        body: "यह राजस्थानी परंपरा में संकलित कबीर वाणी का संग्रह है, जो साखियों (उपदेशात्मक दोहों) और पदों के रूप में सुरक्षित है।",
      },
      {
        title: "गुरु ग्रंथ साहिब में कबीर वाणी",
        body: "कबीर के अनेक पद सिख धर्मग्रंथ आदि ग्रंथ/गुरु ग्रंथ साहिब में भी संकलित हैं — यह उनकी वाणी की व्यापक, बहु-धार्मिक स्वीकार्यता का प्रमाण है।",
      },
    ],
    clusters: [
      {
        title: "सत्य और आत्मज्ञान पर",
        themes: ["satya", "atmagyan"],
      },
      {
        title: "प्रेम और भक्ति पर",
        themes: ["prem", "bhakti"],
      },
      {
        title: "मानवता और समानता पर",
        themes: ["manavta", "jaati"],
      },
    ],
    fullLibraryCta: "संपूर्ण दोहा संग्रह देखें",
  },
  en: {
    kicker: "Sant Kabir Ji · Vani",
    title: "Kabir Vani",
    lead: "Kabir's verses have reached us primarily through three major textual traditions — the Bijak (Kashi/Kabir Chaura tradition), the Kabir Granthavali (Rajasthani tradition), and the Kabir Sagar (Dharamdasi tradition). All were originally oral, later set down in writing.",
    aboutTexts: [
      {
        title: "The Bijak",
        body: "The Bijak is divided into three sections — Ramaini, Shabda and Sakhi. It urges the reader to shed delusion, pretension and orthodoxy in favour of a direct experience of truth.",
      },
      {
        title: "Kabir Granthavali & Sakhi Granth",
        body: "This is a collection of Kabir's verses compiled within the Rajasthani tradition, preserved as sakhis (didactic couplets) and padas (songs).",
      },
      {
        title: "Kabir's Verses in the Guru Granth Sahib",
        body: "Many of Kabir's verses are also included in the Sikh scripture Adi Granth/Guru Granth Sahib — evidence of the broad, multi-faith acceptance his words have long held.",
      },
    ],
    clusters: [
      {
        title: "On Truth & Self-Knowledge",
        themes: ["satya", "atmagyan"],
      },
      {
        title: "On Love & Devotion",
        themes: ["prem", "bhakti"],
      },
      {
        title: "On Humanity & Equality",
        themes: ["manavta", "jaati"],
      },
    ],
    fullLibraryCta: "Browse the full doha library",
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
      canonical: `/${locale}/sant-kabir/vani`,
      languages: { hi: "/hi/sant-kabir/vani", en: "/en/sant-kabir/vani" },
    },
  };
}

export default async function VaniPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale as "hi" | "en"];
  const children = NAV_ITEMS.find((i) => i.href === "/sant-kabir")?.children ?? [];

  return (
    <>
      <SectionSubNav items={children} activeHref="/sant-kabir/vani" />
      <Container className="py-14">
        <div className="max-w-2xl">
          <SectionHeading kicker={c.kicker} title={c.title} />
          <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>
          <FactBadge kind="verified" className="mt-4" />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {c.aboutTexts.map((item, i) => (
            <div key={i} className="rounded-sm border border-border-soft bg-cream-soft p-5">
              <h2 className="font-heading text-base font-semibold text-ink">{item.title}</h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 space-y-12">
          {c.clusters.map((cluster) => {
            const verses = DOHAS.filter((d) => cluster.themes.includes(d.theme));
            return (
              <section key={cluster.title}>
                <h2 className="font-heading text-2xl font-semibold text-ink">{cluster.title}</h2>
                <div className="motif-divider my-4" />
                <div className="grid gap-5 md:grid-cols-2">
                  {verses.map((verse, i) => (
                    <blockquote
                      key={i}
                      className="border-l-2 border-saffron/60 py-1 pl-5"
                    >
                      <p className="font-heading text-lg leading-relaxed text-ink">
                        {verse.hindiText}
                      </p>
                      <p className="mt-2 font-body text-sm text-ink-soft">
                        {locale === "hi" ? verse.meaningHindi : verse.meaningEnglish}
                      </p>
                    </blockquote>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/sant-kabir/dohe"
            className="inline-flex items-center gap-2 rounded-sm bg-saffron px-6 py-3 font-body text-sm font-semibold text-cream hover:bg-saffron-dark"
          >
            {c.fullLibraryCta}
          </Link>
        </div>
      </Container>
    </>
  );
}
