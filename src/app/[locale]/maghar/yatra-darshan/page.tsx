import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { NAV_ITEMS } from "@/lib/nav";
import { getSiteSettings } from "@/lib/settings";

const content = {
  hi: {
    kicker: "मगहर · यात्रा/दर्शन जानकारी",
    title: "यात्रा एवं दर्शन जानकारी",
    lead: "मगहर आने वाले श्रद्धालुओं एवं पर्यटकों के लिए व्यावहारिक जानकारी।",
    nearbyHeading: "आसपास के अन्य स्थल",
    nearby: [
      "तामेश्वर नाथ मंदिर",
      "बखिरा पक्षी विहार (वन्यजीव अभयारण्य)",
      "समय माता मंदिर",
      "काज़ी खलील-उर-रहमान का किला",
      "बरदहिया बाज़ार",
    ],
    nearbyNote:
      "ये स्थल संत कबीर नगर जिले की आधिकारिक वेबसाइट पर सूचीबद्ध जिले के अन्य पर्यटन स्थलों में से हैं।",
    mapHeading: "मानचित्र",
  },
  en: {
    kicker: "Maghar · Visit / Pilgrimage Information",
    title: "Visit & Pilgrimage Information",
    lead: "Practical information for devotees and visitors travelling to Maghar.",
    nearbyHeading: "Other Nearby Places of Interest",
    nearby: [
      "Tameswar Nath Temple",
      "Bakhira Bird Sanctuary (wildlife sanctuary)",
      "Samay Mata Temple",
      "Fort of Qazi Khalil-ur-Rahman",
      "Bardahiya Bazaar",
    ],
    nearbyNote:
      "These sites are among the other tourist places listed on the Sant Kabir Nagar district's official government website.",
    mapHeading: "Map",
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
      canonical: `/${locale}/maghar/yatra-darshan`,
      languages: { hi: "/hi/maghar/yatra-darshan", en: "/en/maghar/yatra-darshan" },
    },
  };
}

export default async function YatraDarshanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale as "hi" | "en"];
  const children = NAV_ITEMS.find((i) => i.href === "/maghar")?.children ?? [];
  const settings = await getSiteSettings();

  return (
    <>
      <SectionSubNav items={children} activeHref="/maghar/yatra-darshan" />
      <Container className="py-14">
        <div className="max-w-2xl">
          <SectionHeading kicker={c.kicker} title={c.title} />
          <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-sm border border-border-soft bg-paper p-5">
            <h2 className="font-heading text-base font-semibold text-ink">{c.nearbyHeading}</h2>
            <ul className="mt-3 space-y-2">
              {c.nearby.map((place) => (
                <li key={place} className="font-body text-sm text-ink-soft">
                  • {place}
                </li>
              ))}
            </ul>
            <p className="mt-3 font-body text-xs text-ink-faint">{c.nearbyNote}</p>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-base font-semibold text-ink">{c.mapHeading}</h2>
            <iframe
              src={settings.maps_embed_url}
              className="h-80 w-full rounded-sm border border-border"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={c.mapHeading}
            />
            <a
              href={settings.maps_place_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-body text-sm text-saffron hover:underline"
            >
              Google Maps →
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
