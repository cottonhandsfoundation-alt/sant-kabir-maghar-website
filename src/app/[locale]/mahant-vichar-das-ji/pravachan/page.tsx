import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { NAV_ITEMS } from "@/lib/nav";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

const content = {
  hi: {
    kicker: "महंत विचार दास जी · प्रवचन",
    title: "प्रवचन",
    lead: "महंत जी के प्रवचन एवं संदेश — व्यवस्थापक पैनल के माध्यम से नियमित रूप से जोड़े जाते हैं।",
    empty: "फ़िलहाल कोई प्रवचन प्रकाशित नहीं किया गया है। कृपया बाद में पुनः देखें।",
  },
  en: {
    kicker: "Mahant Vichar Das Ji · Pravachan",
    title: "Pravachan",
    lead: "Mahant Ji's pravachan and messages — added regularly through the admin panel.",
    empty: "No pravachan has been published yet. Please check back soon.",
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
      canonical: `/${locale}/mahant-vichar-das-ji/pravachan`,
      languages: {
        hi: "/hi/mahant-vichar-das-ji/pravachan",
        en: "/en/mahant-vichar-das-ji/pravachan",
      },
    },
  };
}

export default async function PravachanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale as "hi" | "en"];
  const children =
    NAV_ITEMS.find((i) => i.href === "/mahant-vichar-das-ji")?.children ?? [];

  const messages = await prisma.message.findMany({
    where: { published: true, category: { in: ["PRAVACHAN", "MESSAGE"] } },
    orderBy: [{ eventDate: "desc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <SectionSubNav items={children} activeHref="/mahant-vichar-das-ji/pravachan" />
      <Container className="py-14">
        <div className="max-w-2xl">
          <SectionHeading kicker={c.kicker} title={c.title} />
          <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>
        </div>

        {messages.length === 0 ? (
          <p className="mt-14 text-center font-body text-ink-faint">{c.empty}</p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {messages.map((m) => (
              <article key={m.id} className="rounded-sm border border-border-soft bg-paper p-6">
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-saffron">
                  {m.eventDate ? formatDate(m.eventDate, locale) : formatDate(m.createdAt, locale)}
                </p>
                <h2 className="mt-1.5 font-heading text-lg font-semibold text-ink">
                  {locale === "hi" ? m.titleHi : m.titleEn}
                </h2>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                  {(locale === "hi" ? m.bodyHi : m.bodyEn).slice(0, 320)}
                  {(locale === "hi" ? m.bodyHi : m.bodyEn).length > 320 ? "…" : ""}
                </p>
              </article>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
