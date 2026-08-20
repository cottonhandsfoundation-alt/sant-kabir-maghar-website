import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { NAV_ITEMS } from "@/lib/nav";
import { prisma } from "@/lib/db";
import { PlayCircle } from "lucide-react";

const content = {
  hi: {
    kicker: "महंत विचार दास जी · वीडियो",
    title: "वीडियो",
    lead: "महंत जी के प्रवचन एवं संदेशों से जुड़े यूट्यूब वीडियो।",
    empty: "फ़िलहाल कोई वीडियो प्रकाशित नहीं किया गया है।",
  },
  en: {
    kicker: "Mahant Vichar Das Ji · Videos",
    title: "Videos",
    lead: "YouTube videos of Mahant Ji's pravachan and messages.",
    empty: "No videos have been published yet.",
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
      canonical: `/${locale}/mahant-vichar-das-ji/video`,
      languages: {
        hi: "/hi/mahant-vichar-das-ji/video",
        en: "/en/mahant-vichar-das-ji/video",
      },
    },
  };
}

export default async function MahantVideoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale as "hi" | "en"];
  const children =
    NAV_ITEMS.find((i) => i.href === "/mahant-vichar-das-ji")?.children ?? [];
  const [tCommon, videos] = await Promise.all([
    getTranslations("Common"),
    prisma.video.findMany({
      where: { published: true, category: { in: ["PRAVACHAN", "MESSAGE"] } },
      orderBy: { publishedAt: "desc" },
    }),
  ]);

  return (
    <>
      <SectionSubNav items={children} activeHref="/mahant-vichar-das-ji/video" />
      <Container className="py-14">
        <div className="max-w-2xl">
          <SectionHeading kicker={c.kicker} title={c.title} />
          <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>
        </div>

        {videos.length === 0 ? (
          <p className="mt-14 text-center font-body text-ink-faint">{c.empty}</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-sm border border-border-soft bg-paper"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-cream-deep">
                  {/* eslint-disable-next-line @next/next/no-img-element -- YouTube thumbnail CDN, allowlisted host */}
                  <img
                    src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={locale === "hi" ? video.titleHi : video.titleEn}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <PlayCircle className="h-12 w-12 text-cream" aria-hidden="true" />
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="font-heading text-sm font-semibold text-ink">
                    {locale === "hi" ? video.titleHi : video.titleEn}
                  </h2>
                  <span className="mt-1 inline-block font-body text-xs text-saffron">
                    {tCommon("watchOnYoutube")}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
