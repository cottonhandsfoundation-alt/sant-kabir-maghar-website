import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AttributedImage } from "@/components/ui/AttributedImage";
import { FactBadge } from "@/components/ui/FactBadge";
import { PortraitPlaceholder } from "@/components/ui/PortraitPlaceholder";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { IMAGE_SOURCES } from "@/content/image-sources";
import { DOHAS } from "@/content/dohas";
import {
  Calendar,
  MapPin,
  HandHeart,
  Users,
  Sparkles,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    alternates: {
      canonical: `/${locale}`,
      languages: { hi: "/hi", en: "/en" },
    },
  };
}

const activityIcons = [Sparkles, BookOpen, Users, HandHeart];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tCommon, upcomingEvents, latestMessage] = await Promise.all([
    getTranslations("Home"),
    getTranslations("Common"),
    prisma.event.findMany({
      where: { published: true, startDate: { gte: new Date() } },
      orderBy: { startDate: "asc" },
      take: 3,
    }),
    prisma.message.findFirst({
      where: { published: true },
      orderBy: [{ eventDate: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  const highlightDohas = DOHAS.filter((d) =>
    ["manavta", "prem", "satya", "bhakti"].includes(d.theme)
  ).slice(0, 4);

  const activityLabels =
    locale === "hi"
      ? ["सत्संग", "गुरु पूर्णिमा", "भंडारा / अन्न सेवा", "अंतरधार्मिक सद्भाव"]
      : ["Satsang", "Guru Purnima", "Bhandara / Annaseva", "Interfaith Harmony"];

  const galleryImages = [
    IMAGE_SOURCES.magharSamadhiMazar1,
    IMAGE_SOURCES.sadhanaGupha1,
    IMAGE_SOURCES.kabirWithSuratGopalDharamdas,
    IMAGE_SOURCES.aamiRiver,
    IMAGE_SOURCES.kabirModernIllustration,
    IMAGE_SOURCES.kabirChauraMagharSign,
  ];

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-border-soft">
        <div className="absolute inset-0">
          <Image
            src={IMAGE_SOURCES.magharSamadhiMazar1.url}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.45]"
          />
        </div>
        <p className="absolute bottom-2 right-3 z-10 font-body text-[0.65rem] text-cream/70">
          {IMAGE_SOURCES.magharSamadhiMazar1.creator},{" "}
          {IMAGE_SOURCES.magharSamadhiMazar1.license}
        </p>
        <Container className="relative py-24 sm:py-32">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">
            {t("heroKicker")}
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-tight text-cream sm:text-5xl">
            {t("heroHeadline")}
          </h1>
          <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-cream/85">
            {t("heroSubtext")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/sant-kabir" variant="primary">
              {t("heroCtaKabir")}
            </Button>
            <Button href="/mahant-vichar-das-ji" variant="outline" className="border-cream/40 text-cream hover:border-cream hover:text-cream">
              {t("heroCtaMahant")}
            </Button>
            <Button href="/maghar" variant="outline" className="border-cream/40 text-cream hover:border-cream hover:text-cream">
              {t("heroCtaMaghar")}
            </Button>
            <Button href="/donate" variant="gold">
              {t("heroCtaDonate")}
            </Button>
          </div>
        </Container>
      </section>

      {/* 2. Sant Kabir introduction */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading kicker={t("introKicker")} title={t("introTitle")} />
            <p className="mt-5 max-w-xl font-body leading-relaxed text-ink-soft">
              {t("introBody")}
            </p>
            <FactBadge kind="traditional" className="mt-4" />
            <div className="mt-6">
              <Link
                href="/sant-kabir/jivan-parichay"
                className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-saffron hover:underline"
              >
                {tCommon("readMore")}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <AttributedImage image={IMAGE_SOURCES.kabirModernIllustration} locale={locale} />
        </Container>
      </section>

      <div className="motif-divider" />

      {/* 3. Teaching highlights */}
      <section className="bg-cream-soft py-16 sm:py-20">
        <Container>
          <SectionHeading kicker={t("teachingsKicker")} title={t("teachingsTitle")} align="center" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlightDohas.map((doha, i) => (
              <blockquote
                key={i}
                className="rounded-sm border border-border-soft bg-paper p-5"
              >
                <p className="font-heading text-base leading-relaxed text-ink">
                  {doha.hindiText}
                </p>
                <p className="mt-3 font-body text-xs leading-relaxed text-ink-soft">
                  {locale === "hi" ? doha.meaningHindi : doha.meaningEnglish}
                </p>
              </blockquote>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/sant-kabir/dohe"
              className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-saffron hover:underline"
            >
              {tCommon("viewAll")}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* 4. Maghar significance */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <AttributedImage image={IMAGE_SOURCES.sadhanaGupha1} locale={locale} className="lg:order-2" />
          <div className="lg:order-1">
            <SectionHeading kicker={t("magharKicker")} title={t("magharTitle")} />
            <p className="mt-5 max-w-xl font-body leading-relaxed text-ink-soft">
              {t("magharBody")}
            </p>
            <FactBadge kind="verified" className="mt-4" />
            <div className="mt-6">
              <Button href="/maghar" variant="outline">
                {t("visitCta")}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <div className="motif-divider" />

      {/* 5. Mahant Vichar Das Ji feature */}
      <section className="bg-cream-soft py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[280px_1fr] lg:items-center">
          <PortraitPlaceholder
            initials="वि. दा."
            label={
              locale === "hi"
                ? "आधिकारिक चित्र उपलब्ध होने पर अद्यतन किया जाएगा"
                : "Will be updated once an official portrait is available"
            }
          />
          <div>
            <SectionHeading kicker={t("mahantKicker")} title={t("mahantTitle")} />
            <p className="mt-5 max-w-xl font-body leading-relaxed text-ink-soft">
              {t("mahantBody")}
            </p>
            <FactBadge kind="verified" className="mt-4" />
            <div className="mt-6">
              <Button href="/mahant-vichar-das-ji" variant="primary">
                {tCommon("learnMore")}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Upcoming events */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading kicker={t("eventsKicker")} title={t("eventsTitle")} />
          {upcomingEvents.length === 0 ? (
            <p className="mt-8 font-body text-ink-faint">{t("eventsEmpty")}</p>
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="rounded-sm border border-border-soft bg-paper p-5 transition-colors hover:border-saffron"
                >
                  {event.isDemo ? (
                    <span className="mb-2 inline-block rounded-full bg-gold-pale px-2.5 py-0.5 font-body text-[0.65rem] font-semibold text-gold">
                      DEMO
                    </span>
                  ) : null}
                  <h3 className="font-heading text-base font-semibold text-ink">
                    {locale === "hi" ? event.titleHi : event.titleEn}
                  </h3>
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
          <div className="mt-8">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-saffron hover:underline"
            >
              {tCommon("viewAll")}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* 7. Latest Mahant Ji message */}
      {latestMessage ? (
        <>
          <div className="motif-divider" />
          <section className="bg-cream-soft py-16 sm:py-20">
            <Container className="max-w-2xl">
              <SectionHeading kicker={t("messageKicker")} title={t("messageTitle")} />
              <blockquote className="mt-8 border-l-2 border-saffron/60 pl-6">
                <h3 className="font-heading text-lg font-semibold text-ink">
                  {locale === "hi" ? latestMessage.titleHi : latestMessage.titleEn}
                </h3>
                <p className="mt-3 font-body leading-relaxed text-ink-soft">
                  {(locale === "hi" ? latestMessage.bodyHi : latestMessage.bodyEn).slice(0, 400)}
                  {(locale === "hi" ? latestMessage.bodyHi : latestMessage.bodyEn).length > 400
                    ? "…"
                    : ""}
                </p>
              </blockquote>
              <div className="mt-6">
                <Link
                  href="/mahant-vichar-das-ji/pravachan"
                  className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-saffron hover:underline"
                >
                  {tCommon("readMore")}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </Container>
          </section>
        </>
      ) : null}

      {/* 8. Community activities */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading kicker={t("activitiesKicker")} title={t("activitiesTitle")} align="center" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {activityLabels.map((label, i) => {
              const Icon = activityIcons[i];
              return (
                <div
                  key={label}
                  className="flex flex-col items-center rounded-sm border border-border-soft bg-paper p-6 text-center"
                >
                  <Icon className="h-6 w-6 text-saffron" aria-hidden="true" />
                  <p className="mt-3 font-heading text-sm font-semibold text-ink">{label}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/activities"
              className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-saffron hover:underline"
            >
              {tCommon("viewAll")}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <div className="motif-divider" />

      {/* 9. Social harmony */}
      <section className="bg-cream-soft py-16 sm:py-20">
        <Container className="max-w-2xl text-center">
          <SectionHeading kicker={t("sadbhavKicker")} title={t("sadbhavTitle")} align="center" />
          <p className="mt-5 font-body leading-relaxed text-ink-soft">{t("sadbhavBody")}</p>
          <FactBadge kind="verified" className="mt-4" />
        </Container>
      </section>

      {/* 10. Photo gallery */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading kicker={t("galleryKicker")} title={t("galleryTitle")} align="center" />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {galleryImages.map((img) => (
              <AttributedImage key={img.id} image={img} locale={locale} className="rounded-sm" />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-saffron hover:underline"
            >
              {tCommon("viewAll")}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <div className="motif-divider" />

      {/* 12. Donation CTA */}
      <section className="bg-maroon py-16 sm:py-20">
        <Container className="max-w-xl text-center">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">
            {t("donateKicker")}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-cream sm:text-4xl">
            {t("donateTitle")}
          </h2>
          <p className="mt-4 font-body leading-relaxed text-cream/85">{t("donateBody")}</p>
          <div className="mt-7">
            <Button href="/donate" variant="gold">
              {t("donateCta")}
            </Button>
          </div>
        </Container>
      </section>

      {/* 13. Visit Maghar */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading kicker={t("visitKicker")} title={t("visitTitle")} />
            <div className="mt-6">
              <Button href="/maghar/kaise-pahunche" variant="outline">
                {t("visitCta")}
              </Button>
            </div>
          </div>
          <AttributedImage image={IMAGE_SOURCES.aamiRiver} locale={locale} />
        </Container>
      </section>

      <div className="motif-divider" />

      {/* 14. Newsletter */}
      <section className="bg-cream-soft py-16 sm:py-20">
        <Container className="max-w-xl text-center">
          <SectionHeading kicker={t("newsletterKicker")} title={t("newsletterTitle")} align="center" />
          <p className="mt-4 font-body leading-relaxed text-ink-soft">{t("newsletterBody")}</p>
          <div className="mt-7">
            <NewsletterForm />
          </div>
        </Container>
      </section>
    </>
  );
}
