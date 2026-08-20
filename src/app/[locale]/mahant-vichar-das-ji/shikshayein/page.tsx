import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactBadge } from "@/components/ui/FactBadge";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/nav";

const content = {
  hi: {
    kicker: "महंत विचार दास जी · शिक्षाएँ / संदेश",
    title: "शिक्षाएँ / संदेश",
    lead: "सार्वजनिक अवसरों पर महंत विचार दास जी का संदेश संत कबीर के मूल भाव — मानवता, सद्भाव और सत्य के प्रति समर्पण — को ही आगे बढ़ाता है।",
    quotesTitle: "सार्वजनिक रूप से रिपोर्ट किए गए कथन",
    quotes: [
      {
        text: "कबीर का दर्शन धरती पर शांति ला सकता है।",
        context: "2018 में एक समाचार साक्षात्कार में",
      },
      {
        text: "इस महोत्सव का उद्देश्य संत कबीर के विचारों को हर व्यक्ति तक पहुंचाना है।",
        context: "कबीर मगहर महोत्सव 2025 के समापन समारोह में",
      },
    ],
    noteTitle: "एक टिप्पणी",
    note: "इस पृष्ठ पर केवल वे कथन शामिल हैं जिन्हें समाचार रिपोर्टों में सीधे उद्धृत किया गया है। महंत जी के नए संदेश और प्रवचन नियमित रूप से जोड़े जाते हैं — पूरी सूची के लिए प्रवचन पृष्ठ देखें।",
    cta: "सभी प्रवचन एवं संदेश देखें",
  },
  en: {
    kicker: "Mahant Vichar Das Ji · Teachings / Message",
    title: "Teachings / Message",
    lead: "On public occasions, Mahant Vichar Das Ji's message consistently carries forward Sant Kabir's central spirit — a devotion to humanity, harmony and truth.",
    quotesTitle: "Publicly Reported Statements",
    quotes: [
      {
        text: "Kabir's philosophy can bring peace on the earth.",
        context: "In a 2018 news interview",
      },
      {
        text: "The purpose of this festival is to spread the thoughts of Saint Kabir to every person.",
        context: "At the closing ceremony of the Kabir Maghar Mahotsav, 2025",
      },
    ],
    noteTitle: "A Note",
    note: "This page includes only statements that have been directly quoted in news reports. New messages and pravachan from Mahant Ji are added regularly — see the Pravachan page for the full list.",
    cta: "View all pravachan and messages",
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
      canonical: `/${locale}/mahant-vichar-das-ji/shikshayein`,
      languages: {
        hi: "/hi/mahant-vichar-das-ji/shikshayein",
        en: "/en/mahant-vichar-das-ji/shikshayein",
      },
    },
  };
}

export default async function MahantShikshayeinPage({
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
      <SectionSubNav items={children} activeHref="/mahant-vichar-das-ji/shikshayein" />
      <Container className="py-14">
        <div className="max-w-2xl">
          <SectionHeading kicker={c.kicker} title={c.title} />
          <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>
          <FactBadge kind="verified" className="mt-4" />
        </div>

        <div className="mt-10 max-w-2xl">
          <h2 className="font-heading text-xl font-semibold text-ink">{c.quotesTitle}</h2>
          <div className="motif-divider my-4" />
          <div className="space-y-5">
            {c.quotes.map((q, i) => (
              <blockquote key={i} className="border-l-2 border-saffron/60 py-1 pl-5">
                <p className="font-heading text-lg italic leading-relaxed text-ink">“{q.text}”</p>
                <p className="mt-1.5 font-body text-xs text-ink-faint">{q.context}</p>
              </blockquote>
            ))}
          </div>
        </div>

        <div className="mt-10 max-w-2xl rounded-sm border border-gold/30 bg-gold-pale/40 p-4">
          <p className="font-body text-sm font-semibold text-ink">{c.noteTitle}</p>
          <p className="mt-1 font-body text-sm leading-relaxed text-ink-soft">{c.note}</p>
        </div>

        <div className="mt-8">
          <Link
            href="/mahant-vichar-das-ji/pravachan"
            className="inline-flex items-center gap-2 rounded-sm bg-saffron px-6 py-3 font-body text-sm font-semibold text-cream hover:bg-saffron-dark"
          >
            {c.cta}
          </Link>
        </div>
      </Container>
    </>
  );
}
