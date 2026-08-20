import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { prisma } from "@/lib/db";
import { formatInr } from "@/lib/receipt";
import { getSiteSettings } from "@/lib/settings";
import { formatDate, pick } from "@/lib/utils";
import { PrintButton } from "./PrintButton";

const content = {
  hi: {
    heading: "दान रसीद",
    anonymousDonor: "अनाम दानदाता",
    donorLabel: "दानदाता",
    donationIdLabel: "दान आईडी",
    receiptNumberLabel: "रसीद संख्या",
    amountLabel: "राशि",
    purposeLabel: "उद्देश्य",
    dateLabel: "दिनांक",
    modeLabel: "भुगतान माध्यम",
    modeValue: "ऑनलाइन — Razorpay",
    printLabel: "प्रिंट / PDF के रूप में सहेजें",
    taxLabel: "कर-छूट स्थिति",
    taxEligible: "यह दान आयकर अधिनियम की धारा 80G के अंतर्गत कर-छूट हेतु पात्र हो सकता है।",
    taxNotEligible: "यह दान वर्तमान में धारा 80G के अंतर्गत कर-छूट हेतु पात्र नहीं है।",
    taxNotVerified: "कर-छूट स्थिति: संस्था द्वारा अभी पुष्टि की जानी बाकी है।",
    footerNote:
      "यह एक स्वतः जनरेट रसीद है और डिजिटल रूप से मान्य है। किसी भी प्रश्न के लिए कृपया संस्था से संपर्क करें।",
  },
  en: {
    heading: "Donation Receipt",
    anonymousDonor: "Anonymous Donor",
    donorLabel: "Donor",
    donationIdLabel: "Donation ID",
    receiptNumberLabel: "Receipt Number",
    amountLabel: "Amount",
    purposeLabel: "Purpose",
    dateLabel: "Date",
    modeLabel: "Payment Mode",
    modeValue: "Online — Razorpay",
    printLabel: "Print / Save as PDF",
    taxLabel: "Tax exemption status",
    taxEligible: "This donation may be eligible for tax benefits under Section 80G of the Income Tax Act.",
    taxNotEligible: "This donation is not currently eligible for tax exemption under Section 80G.",
    taxNotVerified: "Tax exemption status: to be confirmed by the organisation.",
    footerNote:
      "This is an automatically generated receipt and is valid in digital form. Please contact the organisation for any questions.",
  },
} as const;

export default async function DonationReceiptPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const donation = await prisma.donation.findUnique({
    where: { id },
    include: { purpose: true },
  });

  if (!donation || donation.paymentStatus !== "SUCCESS") {
    notFound();
  }

  const settings = await getSiteSettings();
  const c = content[locale as "hi" | "en"];

  const orgName = pick(locale, settings.org_name_hi, settings.org_name_en);
  const orgAddress = pick(locale, settings.org_address_hi, settings.org_address_en);
  const donorName = donation.anonymous ? c.anonymousDonor : donation.donorName;
  const purposeLabel = donation.purpose
    ? pick(locale, donation.purpose.labelHi, donation.purpose.labelEn)
    : "—";

  const taxNote =
    settings.org_80g_status === "eligible"
      ? c.taxEligible
      : settings.org_80g_status === "not_eligible"
        ? c.taxNotEligible
        : c.taxNotVerified;

  return (
    <>
      <style>{`
        @media print {
          header, footer { display: none !important; }
          body { background: #fff !important; }
        }
      `}</style>

      <Container className="max-w-2xl py-16">
        <div className="flex justify-end print:hidden">
          <PrintButton label={c.printLabel} />
        </div>

        <div className="mt-4 rounded-sm border border-border bg-paper p-8 print:border-0 print:p-0 sm:p-10">
          <div className="flex items-center justify-between border-b border-border-soft pb-6">
            <Logo size="large" />
            <h1 className="font-heading text-xl font-semibold text-ink">{c.heading}</h1>
          </div>

          <p className="mt-4 font-body text-sm text-ink-soft">{orgAddress}</p>

          <dl className="mt-8 space-y-3 font-body">
            <Row label={c.donorLabel} value={donorName} />
            <Row label={c.donationIdLabel} value={donation.donationId} />
            <Row label={c.receiptNumberLabel} value={donation.receiptNumber ?? "—"} />
            <Row label={c.amountLabel} value={formatInr(donation.amount)} />
            <Row label={c.purposeLabel} value={purposeLabel} />
            <Row label={c.dateLabel} value={formatDate(donation.createdAt, locale)} />
            <Row label={c.modeLabel} value={c.modeValue} last />
          </dl>

          <p className="mt-8 border-t border-border-soft pt-4 font-body text-xs text-ink-faint">
            {c.taxLabel}: {taxNote}
          </p>

          <p className="mt-6 font-body text-xs text-ink-faint">{c.footerNote}</p>

          <p className="mt-2 font-body text-xs text-ink-faint">{orgName}</p>
        </div>
      </Container>
    </>
  );
}

function Row({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div
      className={
        last
          ? "flex items-center justify-between pb-2"
          : "flex items-center justify-between border-b border-border-soft pb-2"
      }
    >
      <dt className="text-sm text-ink-faint">{label}</dt>
      <dd className="font-semibold text-ink">{value}</dd>
    </div>
  );
}
