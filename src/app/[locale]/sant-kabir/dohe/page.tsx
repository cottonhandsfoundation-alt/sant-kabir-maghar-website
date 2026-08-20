import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionSubNav } from "@/components/site/SectionSubNav";
import { NAV_ITEMS } from "@/lib/nav";
import { prisma } from "@/lib/db";
import { DohaLibrary } from "./DohaLibrary";

const content = {
  hi: {
    kicker: "संत कबीर जी · दोहे",
    title: "कबीर के दोहे",
    lead: "कबीर के दोहे सदियों से मौखिक और लिखित परंपरा में सुरक्षित रहे हैं — बीजक, कबीर ग्रंथावली और साखी ग्रंथ जैसे संकलनों के माध्यम से। यहां प्रस्तुत अर्थ इस वेबसाइट के लिए मौलिक रूप से लिखे गए हैं।",
  },
  en: {
    kicker: "Sant Kabir Ji · Dohas",
    title: "Dohas of Kabir",
    lead: "Kabir's dohas have survived for centuries through oral and written tradition — collections such as the Bijak, Kabir Granthavali and Sakhi Granth. The explanatory meanings shown here have been written originally for this website.",
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
      canonical: `/${locale}/sant-kabir/dohe`,
      languages: { hi: "/hi/sant-kabir/dohe", en: "/en/sant-kabir/dohe" },
    },
  };
}

export default async function DohePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale as "hi" | "en"];
  const children = NAV_ITEMS.find((i) => i.href === "/sant-kabir")?.children ?? [];
  const [tCommon, dohas] = await Promise.all([
    getTranslations("Common"),
    prisma.doha.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, hindiText: true, meaningHindi: true, meaningEnglish: true, theme: true },
    }),
  ]);

  return (
    <>
      <SectionSubNav items={children} activeHref="/sant-kabir/dohe" />
      <Container className="py-14">
        <div className="max-w-2xl">
          <SectionHeading kicker={c.kicker} title={c.title} />
          <p className="mt-5 font-body leading-relaxed text-ink-soft">{c.lead}</p>
        </div>

        <div className="mt-10">
          <DohaLibrary
            dohas={dohas}
            locale={locale}
            labels={{
              all: tCommon("all"),
              search: tCommon("search"),
              filterByTheme: tCommon("filterByTheme"),
              noResults: tCommon("noResults"),
            }}
          />
        </div>
      </Container>
    </>
  );
}
