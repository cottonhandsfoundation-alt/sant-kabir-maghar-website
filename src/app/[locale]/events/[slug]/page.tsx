import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Calendar, MapPin, ImageIcon, ExternalLink, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/site/JsonLd";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/db";
import { formatDate, pick } from "@/lib/utils";
import { eventCategoryLabel, canUseNextImage } from "../_lib/eventCategories";

async function getEvent(slug: string) {
  return prisma.event.findFirst({
    where: { slug, published: true },
    include: {
      media: {
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return { title: "Event not found" };
  }

  const title = event.seoTitle ?? pick(locale, event.titleHi, event.titleEn);
  const description =
    event.seoDescription ?? pick(locale, event.descriptionHi, event.descriptionEn).slice(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/events/${slug}`,
      languages: { hi: `/hi/events/${slug}`, en: `/en/events/${slug}` },
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Events");
  const tCommon = await getTranslations("Common");

  const event = await getEvent(slug);
  if (!event) {
    notFound();
  }

  const title = pick(locale, event.titleHi, event.titleEn);
  const description = pick(locale, event.descriptionHi, event.descriptionEn);
  const venue = pick(locale, event.venueHi, event.venueEn);

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: title,
    description: description.slice(0, 500),
    startDate: event.startDate.toISOString(),
    ...(event.endDate ? { endDate: event.endDate.toISOString() } : {}),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: venue || "Maghar, Sant Kabir Nagar, Uttar Pradesh",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Maghar",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
    },
    ...(event.bannerImage ? { image: [event.bannerImage] } : {}),
  };

  return (
    <>
      <JsonLd data={eventJsonLd} />
      <section className="border-b border-border-soft bg-cream-soft py-12 sm:py-16">
        <Container>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm bg-saffron px-2.5 py-1 font-body text-xs font-semibold text-cream">
              {eventCategoryLabel(event.category, locale)}
            </span>
            {event.isDemo ? (
              <span className="rounded-sm bg-ink px-2.5 py-1 font-body text-xs font-semibold text-cream">
                {t("demoTag")}
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 font-heading text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-ink-soft">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-saffron" aria-hidden="true" />
              {formatDate(event.startDate, locale)}
              {event.endDate ? ` – ${formatDate(event.endDate, locale)}` : ""}
            </span>
            {venue ? (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-saffron" aria-hidden="true" />
                {venue}
              </span>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-sm bg-cream-deep">
            {event.bannerImage ? (
              canUseNextImage(event.bannerImage) ? (
                <Image
                  src={event.bannerImage}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 900px, 100vw"
                  priority
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={event.bannerImage} alt={title} loading="lazy" className="h-full w-full object-cover" />
              )
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ImageIcon className="h-14 w-14 text-ink-faint" aria-hidden="true" />
              </div>
            )}
          </div>

          <div className="max-w-3xl">
            <p className="whitespace-pre-line font-body leading-relaxed text-ink-soft">{description}</p>

            {event.registrationUrl ? (
              <div className="mt-8">
                <Button href={event.registrationUrl} external variant="primary">
                  {t("registerCta")}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            ) : null}
          </div>

          {event.media.length > 0 ? (
            <div className="mt-14">
              <h2 className="font-heading text-2xl font-semibold text-ink">
                {pick(locale, "संबंधित चित्र एवं वीडियो", "Related Media")}
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {event.media.map((asset) => {
                  const caption = pick(locale, asset.captionHi, asset.captionEn);
                  return (
                    <figure key={asset.id} className="overflow-hidden rounded-sm border border-border-soft bg-paper">
                      <div className="relative aspect-square w-full bg-cream-deep">
                        {asset.type === "VIDEO" ? (
                          <div className="flex h-full w-full items-center justify-center">
                            <PlayCircle className="h-10 w-10 text-ink-faint" aria-hidden="true" />
                          </div>
                        ) : canUseNextImage(asset.url) ? (
                          <Image
                            src={asset.url}
                            alt={caption ?? title}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={asset.thumbnailUrl ?? asset.url}
                            alt={caption ?? title}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      {caption || (asset.attributionRequired && asset.attributionText) ? (
                        <figcaption className="p-2 font-body text-xs text-ink-faint">
                          {caption ? <span className="block">{caption}</span> : null}
                          {asset.attributionRequired && asset.attributionText ? (
                            <span className="mt-0.5 block italic">{asset.attributionText}</span>
                          ) : null}
                        </figcaption>
                      ) : null}
                    </figure>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="mt-12">
            <Link href="/events" className="font-body text-sm font-semibold text-saffron hover:text-saffron-dark">
              {`← ${tCommon("viewAll")}`}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
