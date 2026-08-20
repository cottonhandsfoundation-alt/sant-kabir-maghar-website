// Bilingual display labels for the Event.category enum values (stored as
// plain strings in the DB — see prisma/schema.prisma comment on Event).
// Shared between the events list page and the event detail page.
export const EVENT_CATEGORY_LABELS: Record<string, { hi: string; en: string }> = {
  SATSANG: { hi: "सत्संग", en: "Satsang" },
  PRAVACHAN: { hi: "प्रवचन", en: "Pravachan" },
  GURU_PURNIMA: { hi: "गुरु पूर्णिमा", en: "Guru Purnima" },
  KABIR_JAYANTI: { hi: "कबीर जयंती", en: "Kabir Jayanti" },
  KABIR_MAHOTSAV: { hi: "कबीर महोत्सव", en: "Kabir Mahotsav" },
  NIRVAN_DIWAS: { hi: "निर्वाण दिवस", en: "Nirvan Diwas" },
  BHANDARA: { hi: "भंडारा", en: "Bhandara" },
  SAMAJIK_SEVA: { hi: "सामाजिक सेवा", en: "Social Service" },
  ANTARDHARMIK_SADBHAV: { hi: "अंतरधार्मिक सद्भाव", en: "Interfaith Harmony" },
  OTHER: { hi: "अन्य", en: "Other" },
};

export function eventCategoryLabel(category: string, locale: string): string {
  const entry = EVENT_CATEGORY_LABELS[category] ?? EVENT_CATEGORY_LABELS.OTHER;
  return locale === "hi" ? entry.hi : entry.en;
}

// Only the two hosts configured in next.config.ts remote patterns can use
// next/image; anything else falls back to a plain <img> tag.
const NEXT_IMAGE_HOSTS = new Set(["upload.wikimedia.org", "i.ytimg.com"]);

export function canUseNextImage(url: string): boolean {
  try {
    return NEXT_IMAGE_HOSTS.has(new URL(url).hostname);
  } catch {
    return false;
  }
}
