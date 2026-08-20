import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortraitPlaceholder } from "@/components/ui/PortraitPlaceholder";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { NAV_ITEMS } from "@/lib/nav";
import { canUseNextImage } from "@/lib/utils";
import { prisma } from "@/lib/db";

const content = {
  hi: {
    kicker: "महंत विचार दास जी · फोटो",
    title: "फोटो",
    lead: "महंत जी से जुड़े प्रकाशित चित्र। शोध के दौरान कोई भी स्पष्ट रूप से उपयोग-अधिकार प्राप्त उच्च-गुणवत्ता चित्र नहीं मिल सका — इसलिए एक सम्मानजनक प्लेसहोल्डर दिखाया गया है।",
    placeholderLabel: "आधिकारिक चित्र उपलब्ध होने पर यहां जोड़ा जाएगा",
  },
  en: {
    kicker: "Mahant Vichar Das Ji · Photos",
    title: "Photos",
    lead: "Published photographs related to Mahant Ji. No clearly rights-cleared, high-quality photograph could be found during research — a dignified placeholder is shown instead.",
    placeholderLabel: "Will be added here once an official portrait is available",
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
      canonical: `/${locale}/mahant-vichar-das-ji/photo`,
      languages: {
        hi: "/hi/mahant-vichar-das-ji/photo",
        en: "/en/mahant-vichar-das-ji/photo",
      },
    },
  };
}

export default async function MahantPhotoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale as "hi" | "en"];
  const children =
    NAV_ITEMS.find((i) => i.href === "/mahant-vichar-das-ji")?.children ?? [];

  const photos = await prisma.mediaAsset.findMany({
    where: { published: true, type: "IMAGE", category: "MAHANT_JI" },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <SectionSubNav items={children} activeHref="/mahant-vichar-das-ji/photo" />
      <Container className="py-14">
        <div className="max-w-2xl">
          <SectionHeading kicker={c.kicker} title={c.title} />
          <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>
        </div>

        {photos.length === 0 ? (
          <div className="mt-10 max-w-xs">
            <PortraitPlaceholder initials="वि. दा." label={c.placeholderLabel} />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo) => (
              <figure
                key={photo.id}
                className="overflow-hidden rounded-sm border border-border-soft bg-paper"
              >
                <div className="relative aspect-square w-full bg-cream-deep">
                  {canUseNextImage(photo.url) ? (
                    <Image
                      src={photo.url}
                      alt={(locale === "hi" ? photo.captionHi : photo.captionEn) ?? ""}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element -- admin-entered URL, host not in next.config remotePatterns
                    <img
                      src={photo.url}
                      alt={(locale === "hi" ? photo.captionHi : photo.captionEn) ?? ""}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>
                {photo.attributionRequired && photo.attributionText ? (
                  <figcaption className="px-2 py-1.5 font-body text-[0.65rem] text-ink-faint">
                    {photo.attributionText}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
