import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Calendar, MapPin, ImageIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/db";
import { formatDate, pick } from "@/lib/utils";
import { eventCategoryLabel, canUseNextImage } from "./_lib/eventCategories";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Events" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/events`,
      languages: { hi: "/hi/events", en: "/en/events" },
    },
  };
}

type EventListItem = {
  id: string;
  slug: string;
  titleEn: string;
  titleHi: string;
  category: string;
  startDate: Date;
  venueEn: string | null;
  venueHi: string | null;
  bannerImage: string | null;
  featured: boolean;
  isDemo: boolean;
};

function EventCard({ event, locale, demoLabel }: { event: EventListItem; locale: string; demoLabel: string }) {
  const title = pick(locale, event.titleHi, event.titleEn);
  const venue = pick(locale, event.venueHi, event.venueEn);

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-border-soft bg-paper shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-deep">
        {event.bannerImage ? (
          canUseNextImage(event.bannerImage) ? (
            <Image
              src={event.bannerImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.bannerImage}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageIcon className="h-10 w-10 text-ink-faint" aria-hidden="true" />
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-sm bg-saffron px-2.5 py-1 font-body text-xs font-semibold text-cream">
            {eventCategoryLabel(event.category, locale)}
          </span>
          {event.isDemo ? (
            <span className="rounded-sm bg-ink px-2.5 py-1 font-body text-xs font-semibold text-cream">
              {demoLabel}
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-heading text-lg font-semibold leading-snug text-ink group-hover:text-saffron">
          {title}
        </h3>
        <div className="mt-auto flex flex-col gap-1.5 pt-2 font-body text-sm text-ink-soft">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-saffron" aria-hidden="true" />
            {formatDate(event.startDate, locale)}
          </span>
          {venue ? (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-saffron" aria-hidden="true" />
              {venue}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Events");
  const now = new Date();

  const [upcoming, past] = await Promise.all([
    prisma.event.findMany({
      where: { published: true, startDate: { gte: now } },
      orderBy: { startDate: "asc" },
      select: {
        id: true,
        slug: true,
        titleEn: true,
        titleHi: true,
        category: true,
        startDate: true,
        venueEn: true,
        venueHi: true,
        bannerImage: true,
        featured: true,
        isDemo: true,
      },
    }),
    prisma.event.findMany({
      where: { published: true, startDate: { lt: now } },
      orderBy: { startDate: "desc" },
      select: {
        id: true,
        slug: true,
        titleEn: true,
        titleHi: true,
        category: true,
        startDate: true,
        venueEn: true,
        venueHi: true,
        bannerImage: true,
        featured: true,
        isDemo: true,
      },
    }),
  ]);

  const demoLabel = t("demoTag");

  return (
    <>
      <section className="border-b border-border-soft bg-cream-soft py-16 sm:py-20">
        <Container>
          <SectionHeading kicker={t("title")} title={t("subtitle")} />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading title={t("upcomingTitle")} />
          {upcoming.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} locale={locale} demoLabel={demoLabel} />
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-sm border border-dashed border-border bg-cream-soft p-8 text-center font-body text-ink-soft">
              {t("emptyUpcoming")}
            </p>
          )}
        </Container>
      </section>

      <div className="motif-divider" />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading title={t("pastTitle")} />
          {past.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard key={event.id} event={event} locale={locale} demoLabel={demoLabel} />
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-sm border border-dashed border-border bg-cream-soft p-8 text-center font-body text-ink-soft">
              {t("emptyPast")}
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
