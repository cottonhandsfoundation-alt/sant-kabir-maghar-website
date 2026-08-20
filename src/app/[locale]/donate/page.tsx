import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DonateForm } from "@/components/forms/DonateForm";
import { prisma } from "@/lib/db";
import { isPaymentGatewayConfigured } from "@/lib/payments";
import { getSiteSettings } from "@/lib/settings";
import { pick } from "@/lib/utils";

const content = {
  hi: {
    kicker: "सेवा में सहभागिता",
    intro:
      "आपका दान संत कबीर जी की शिक्षाओं से प्रेरित सत्संग, अन्नसेवा, धार्मिक कार्यों और सामाजिक सेवा गतिविधियों को आगे बढ़ाने में सहायक होता है। यह किसी दबाव या अपेक्षा से नहीं, बल्कि सेवा में सहभागिता के एक अवसर के रूप में प्रस्तुत है — जो भी राशि आप सहज रूप से दे सकें, वह हमारे लिए मूल्यवान है।",
    purposesHeading: "दान के उद्देश्य",
    receiptNote:
      "प्रत्येक सफल दान के लिए एक दान आईडी और रसीद स्वतः जनरेट होकर आपके ईमेल पर भेज दी जाती है, तथा पुष्टि पृष्ठ से भी डाउनलोड की जा सकती है।",
  },
  en: {
    kicker: "A Chance to Serve",
    intro:
      "Your contribution helps sustain satsang, annaseva, religious activities, and social-service work inspired by Sant Kabir Ji's teachings. This is offered as an opportunity to participate in seva — not as pressured fundraising. Whatever amount you can comfortably give is valued.",
    purposesHeading: "Donation purposes",
    receiptNote:
      "A donation ID and receipt are generated automatically for every successful donation, emailed to you, and can also be downloaded from the confirmation page.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DonateForm" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/donate`,
      languages: { hi: "/hi/donate", en: "/en/donate" },
    },
  };
}

export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("DonateForm");
  const c = content[locale as "hi" | "en"];

  const [purposeRows, gatewayConfigured, settings] = await Promise.all([
    prisma.donationPurpose.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    }),
    Promise.resolve(isPaymentGatewayConfigured()),
    getSiteSettings(),
  ]);

  const purposes = purposeRows.map((p) => ({
    key: p.key,
    labelEn: p.labelEn,
    labelHi: p.labelHi,
  }));

  const orgName = pick(locale, settings.org_name_hi, settings.org_name_en);

  return (
    <Container className="max-w-3xl py-16">
      <SectionHeading kicker={c.kicker} title={t("title")} />
      <p className="mt-4 font-body text-ink-soft">{c.intro}</p>

      {purposes.length ? (
        <div className="mt-6">
          <h2 className="mb-2 font-body text-sm font-semibold uppercase tracking-wide text-ink-faint">
            {c.purposesHeading}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {purposes.map((p) => (
              <li
                key={p.key}
                className="rounded-sm border border-border-soft bg-cream-soft px-3 py-1 font-body text-sm text-ink-soft"
              >
                {pick(locale, p.labelHi, p.labelEn)}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-6 font-body text-sm text-ink-faint">{c.receiptNote}</p>

      <div className="motif-divider my-10" />

      <div className="rounded-sm border border-border bg-paper p-6 sm:p-8">
        <DonateForm purposes={purposes} gatewayConfigured={gatewayConfigured} orgName={orgName} />
      </div>
    </Container>
  );
}
