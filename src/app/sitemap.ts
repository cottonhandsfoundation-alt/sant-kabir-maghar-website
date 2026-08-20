import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { routing } from "@/i18n/routing";

const STATIC_PATHS = [
  "",
  "/sant-kabir",
  "/sant-kabir/jivan-parichay",
  "/sant-kabir/shikshayein",
  "/sant-kabir/dohe",
  "/sant-kabir/vani",
  "/sant-kabir/samanta-manavta",
  "/sant-kabir/dharmik-sadbhav",
  "/sant-kabir/maghar-sambandh",
  "/sant-kabir/kabir-panth",
  "/mahant-vichar-das-ji",
  "/mahant-vichar-das-ji/parichay",
  "/mahant-vichar-das-ji/jivan-yatra",
  "/mahant-vichar-das-ji/shikshayein",
  "/mahant-vichar-das-ji/pravachan",
  "/mahant-vichar-das-ji/karyakram",
  "/mahant-vichar-das-ji/photo",
  "/mahant-vichar-das-ji/video",
  "/maghar",
  "/maghar/mahatva",
  "/maghar/nirvan-sthali",
  "/maghar/kabir-chaura",
  "/maghar/samadhi",
  "/maghar/mazar",
  "/maghar/parampara",
  "/maghar/kaise-pahunche",
  "/maghar/yatra-darshan",
  "/activities",
  "/events",
  "/gallery",
  "/seva",
  "/donate",
  "/contact",
  "/volunteer",
  "/about-institution",
  "/research-sources",
  "/privacy-policy",
  "/terms",
  "/donation-terms",
  "/refund-policy",
  "/disclaimer",
  "/media-attribution",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const events = await prisma.event.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${siteUrl}/${l}${path}`])
          ),
        },
      });
    }
  }

  for (const event of events) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}/events/${event.slug}`,
        lastModified: event.updatedAt,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
