"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PlayCircle, X } from "lucide-react";
import { cn, pick } from "@/lib/utils";

type GalleryImage = {
  id: string;
  url: string;
  captionEn: string | null;
  captionHi: string | null;
  category: string;
  attributionRequired: boolean;
  attributionText: string | null;
};

type GalleryVideo = {
  id: string;
  titleEn: string;
  titleHi: string;
  youtubeId: string;
  category: string;
};

// Only these two remote hosts are configured in next.config.ts for
// next/image; any other image URL falls back to a plain <img> tag.
const NEXT_IMAGE_HOSTS = new Set(["upload.wikimedia.org", "i.ytimg.com"]);
function canUseNextImage(url: string): boolean {
  try {
    return NEXT_IMAGE_HOSTS.has(new URL(url).hostname);
  } catch {
    return false;
  }
}

const CATEGORY_LABELS: Record<string, { hi: string; en: string }> = {
  EVENTS: { hi: "कार्यक्रम", en: "Events" },
  MAHANT_JI: { hi: "महंत जी", en: "Mahant Ji" },
  MAGHAR: { hi: "मगहर", en: "Maghar" },
  SANT_KABIR: { hi: "संत कबीर", en: "Sant Kabir" },
  GENERAL: { hi: "सामान्य", en: "General" },
};
const CATEGORY_ORDER = ["EVENTS", "MAHANT_JI", "MAGHAR", "SANT_KABIR", "GENERAL"];

type TypeFilter = "all" | "photos" | "videos";

export function GalleryGrid({
  images,
  videos,
  locale,
}: {
  images: GalleryImage[];
  videos: GalleryVideo[];
  locale: string;
}) {
  const t = useTranslations("Gallery");
  const tCommon = useTranslations("Common");

  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  const filteredImages = useMemo(() => {
    if (typeFilter === "videos") return [];
    if (categoryFilter === "all") return images;
    return images.filter((img) => img.category === categoryFilter);
  }, [images, typeFilter, categoryFilter]);

  const filteredVideos = useMemo(() => {
    if (typeFilter === "photos") return [];
    // Video.category (SATSANG/PRAVACHAN/EVENT/MESSAGE) does not map onto
    // MediaAsset's photo categories, so the category filter only narrows
    // photos — videos remain visible whenever the "videos" type is shown.
    return videos;
  }, [videos, typeFilter]);

  const activeVideo = videos.find((v) => v.id === lightboxId) ?? null;

  useEffect(() => {
    if (!activeVideo) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxId(null);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  const isEmptyOverall = images.length === 0 && videos.length === 0;
  const isEmptyFiltered = filteredImages.length === 0 && filteredVideos.length === 0;

  if (isEmptyOverall) {
    return (
      <p className="rounded-sm border border-dashed border-border bg-cream-soft p-10 text-center font-body text-ink-soft">
        {t("empty")}
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {["all", ...CATEGORY_ORDER].map((cat) => {
            const label =
              cat === "all"
                ? tCommon("all")
                : pick(locale, CATEGORY_LABELS[cat].hi, CATEGORY_LABELS[cat].en);
            const active = categoryFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                disabled={typeFilter === "videos"}
                className={cn(
                  "rounded-sm border px-3 py-1.5 font-body text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                  active
                    ? "border-saffron bg-saffron text-cream"
                    : "border-border-soft bg-paper text-ink-soft hover:border-saffron hover:text-saffron"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex shrink-0 gap-2 rounded-sm border border-border-soft bg-paper p-1">
          {(
            [
              ["all", tCommon("all")],
              ["photos", t("filterPhotos")],
              ["videos", t("filterVideos")],
            ] as [TypeFilter, string][]
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setTypeFilter(value)}
              className={cn(
                "rounded-sm px-3 py-1.5 font-body text-sm transition-colors",
                typeFilter === value
                  ? "bg-saffron text-cream"
                  : "text-ink-soft hover:text-saffron"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {isEmptyFiltered ? (
        <p className="mt-8 rounded-sm border border-dashed border-border bg-cream-soft p-10 text-center font-body text-ink-soft">
          {t("empty")}
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((img) => {
            const caption = pick(locale, img.captionHi, img.captionEn);
            return (
              <figure
                key={img.id}
                className="overflow-hidden rounded-sm border border-border-soft bg-paper"
              >
                <div className="relative aspect-square w-full bg-cream-deep">
                  {canUseNextImage(img.url) ? (
                    <Image
                      src={img.url}
                      alt={caption ?? ""}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 240px, (min-width: 640px) 33vw, 50vw"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img.url}
                      alt={caption ?? ""}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                {caption || (img.attributionRequired && img.attributionText) ? (
                  <figcaption className="p-2 font-body text-xs text-ink-faint">
                    {caption ? <span className="block">{caption}</span> : null}
                    {img.attributionRequired && img.attributionText ? (
                      <span className="mt-0.5 block italic">{img.attributionText}</span>
                    ) : null}
                  </figcaption>
                ) : null}
              </figure>
            );
          })}

          {filteredVideos.map((video) => {
            const title = pick(locale, video.titleHi, video.titleEn);
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => setLightboxId(video.id)}
                className="group relative overflow-hidden rounded-sm border border-border-soft bg-cream-deep text-left"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 240px, (min-width: 640px) 33vw, 50vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/25 transition-colors group-hover:bg-ink/40">
                    <PlayCircle className="h-10 w-10 text-cream" aria-hidden="true" />
                  </div>
                </div>
                <span className="sr-only">{title}</span>
                <figcaption className="p-2 font-body text-xs text-ink-faint">{title}</figcaption>
              </button>
            );
          })}
        </div>
      )}

      {activeVideo ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={pick(locale, activeVideo.titleHi, activeVideo.titleEn)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4"
        >
          <button
            type="button"
            aria-label={pick(locale, "बंद करें", "Close")}
            className="absolute inset-0 h-full w-full cursor-default"
            onClick={() => setLightboxId(null)}
          />
          <div className="relative z-10 w-full max-w-3xl">
            <button
              type="button"
              onClick={() => setLightboxId(null)}
              aria-label={pick(locale, "बंद करें", "Close")}
              className="absolute -top-11 right-0 rounded-sm p-2 text-cream hover:text-saffron"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-sm bg-ink shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={pick(locale, activeVideo.titleHi, activeVideo.titleEn)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
