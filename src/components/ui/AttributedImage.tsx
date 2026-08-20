import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ImageSource } from "@/content/image-sources";

/**
 * Renders an externally-sourced (Wikimedia Commons) image with its
 * required attribution shown as a small caption, per this project's
 * image-licensing discipline — see IMAGE_SOURCES.md and
 * /media-attribution. Never use a raw <Image> for a Commons asset; always
 * go through this component so attribution can never be silently dropped.
 */
export function AttributedImage({
  image,
  locale,
  className,
  imageClassName,
  priority,
  sizes,
}: {
  image: ImageSource;
  locale: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const title = locale === "hi" ? image.titleHi : image.titleEn;

  return (
    <figure className={cn("overflow-hidden rounded-sm border border-border-soft bg-paper", className)}>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-deep">
        <Image
          src={image.url}
          alt={title}
          fill
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"}
          className={cn("object-cover", imageClassName)}
        />
      </div>
      {image.attributionRequired ? (
        <figcaption className="px-3 py-2 font-body text-[0.7rem] leading-snug text-ink-faint">
          {title} ·{" "}
          <a
            href={image.source}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-saffron"
          >
            {image.creator}
          </a>
          , {image.license}
        </figcaption>
      ) : null}
    </figure>
  );
}
