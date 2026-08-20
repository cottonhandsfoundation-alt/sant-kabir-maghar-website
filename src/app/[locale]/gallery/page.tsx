import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prisma } from "@/lib/db";
import { GalleryGrid } from "./_components/GalleryGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Gallery" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/gallery`,
      languages: { hi: "/hi/gallery", en: "/en/gallery" },
    },
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Gallery");

  const [images, videos] = await Promise.all([
    prisma.mediaAsset.findMany({
      where: { published: true, type: "IMAGE" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        url: true,
        captionEn: true,
        captionHi: true,
        category: true,
        attributionRequired: true,
        attributionText: true,
      },
    }),
    prisma.video.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      select: {
        id: true,
        titleEn: true,
        titleHi: true,
        youtubeId: true,
        category: true,
      },
    }),
  ]);

  return (
    <>
      <section className="border-b border-border-soft bg-cream-soft py-16 sm:py-20">
        <Container>
          <SectionHeading kicker={t("title")} title={t("subtitle")} />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <GalleryGrid images={images} videos={videos} locale={locale} />
        </Container>
      </section>
    </>
  );
}
