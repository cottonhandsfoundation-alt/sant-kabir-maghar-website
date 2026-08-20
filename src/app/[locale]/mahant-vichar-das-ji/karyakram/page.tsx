import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";

const content = {
  hi: {
    kicker: "महंत विचार दास जी · कार्यक्रम",
    title: "कार्यक्रम",
    lead: "मगहर में आयोजित होने वाले सत्संग एवं धार्मिक कार्यक्रम, जिनमें महंत जी की उपस्थिति अपेक्षित है। संपूर्ण कार्यक्रम सूची के लिए कार्यक्रम पृष्ठ देखें।",
    empty: "फ़िलहाल कोई आगामी कार्यक्रम सूचीबद्ध नहीं है।",
    viewAll: "सभी कार्यक्रम देखें",
  },
  en: {
    kicker: "Mahant Vichar Das Ji · Events",
    title: "Events",
    lead: "Satsang and religious programmes held at Maghar where Mahant Ji's presence is expected. See the Events page for the complete listing.",
    empty: "No upcoming events are listed at the moment.",
    viewAll: "View all events",
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
      canonical: `/${locale}/mahant-vichar-das-ji/karyakram`,
      languages: {
        hi: "/hi/mahant-vichar-das-ji/karyakram",
        en: "/en/mahant-vichar-das-ji/karyakram",
      },
    },
  };
}

export default async function MahantKaryakramPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale as "hi" | "en"];
  const children =
    NAV_ITEMS.find((i) => i.href === "/mahant-vichar-das-ji")?.children ?? [];

  const events = await prisma.event.findMany({
    where: { published: true, startDate: { gte: new Date() } },
    orderBy: { startDate: "asc" },
    take: 6,
  });

  return (
    <>
      <SectionSubNav items={children} activeHref="/mahant-vichar-das-ji/karyakram" />
      <Container className="py-14">
        <div className="max-w-2xl">
          <SectionHeading kicker={c.kicker} title={c.title} />
          <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>
        </div>

        {events.length === 0 ? (
          <p className="mt-14 text-center font-body text-ink-faint">{c.empty}</p>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="rounded-sm border border-border-soft bg-paper p-5 transition-colors hover:border-saffron"
              >
                <h2 className="font-heading text-base font-semibold text-ink">
                  {locale === "hi" ? event.titleHi : event.titleEn}
                </h2>
                <p className="mt-2 flex items-center gap-1.5 font-body text-xs text-ink-soft">
                  <Calendar className="h-3.5 w-3.5 text-saffron" aria-hidden="true" />
                  {formatDate(event.startDate, locale)}
                </p>
                {event.venueHi || event.venueEn ? (
                  <p className="mt-1 flex items-center gap-1.5 font-body text-xs text-ink-soft">
                    <MapPin className="h-3.5 w-3.5 text-saffron" aria-hidden="true" />
                    {locale === "hi" ? event.venueHi : event.venueEn}
                  </p>
                ) : null}
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-sm border border-ink/30 px-6 py-3 font-body text-sm font-semibold text-ink hover:border-saffron hover:text-saffron"
          >
            {c.viewAll}
          </Link>
        </div>
      </Container>
    </>
  );
}
