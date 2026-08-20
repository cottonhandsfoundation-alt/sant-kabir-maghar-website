import { setRequestLocale, getTranslations } from "next-intl/server";
import { CheckCircle2, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/db";
import { formatInr } from "@/lib/receipt";
import { pick } from "@/lib/utils";

const content = {
  hi: {
    pendingTitle: "आपके भुगतान की पुष्टि की जा रही है",
    pendingBody:
      "आपका भुगतान प्राप्त हो चुका है और उसकी पुष्टि की प्रक्रिया चल रही है — इसमें कभी-कभी एक मिनट तक का समय लग सकता है। कृपया इस पृष्ठ को रीफ्रेश करें या अपना ईमेल जाँचें। यदि कुछ समय बाद भी पुष्टि नहीं मिलती, तो कृपया हमसे संपर्क करें।",
    notFoundBody:
      "हमें इस दान आईडी के लिए कोई रिकॉर्ड नहीं मिला। यदि आपने अभी भुगतान किया है, तो कृपया कुछ क्षण बाद पुनः जाँचें या अपना ईमेल देखें।",
  },
  en: {
    pendingTitle: "Confirming your payment",
    pendingBody:
      "Your payment has been received and is being confirmed — this can occasionally take a minute. Please refresh this page or check your email. If it's still not confirmed after a little while, please get in touch with us.",
    notFoundBody:
      "We couldn't find a record for this donation ID. If you just completed a payment, please check again in a moment or look for the confirmation email.",
  },
} as const;

export default async function DonateSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ donationId?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("DonateForm");
  const c = content[locale as "hi" | "en"];
  const { donationId } = await searchParams;

  const donation = donationId
    ? await prisma.donation.findUnique({
        where: { donationId },
        include: { purpose: true },
      })
    : null;

  const isSuccess = donation?.paymentStatus === "SUCCESS";

  return (
    <Container className="max-w-2xl py-20 text-center">
      {isSuccess && donation ? (
        <div className="rounded-sm border border-border bg-paper p-8 sm:p-10">
          <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-saffron" aria-hidden="true" />
          <h1 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
            {t("successTitle")}
          </h1>
          <p className="mt-3 font-body text-ink-soft">{t("successBody")}</p>

          <dl className="mx-auto mt-8 max-w-sm space-y-3 text-left font-body">
            <div className="flex items-center justify-between border-b border-border-soft pb-2">
              <dt className="text-sm text-ink-faint">{t("donationId")}</dt>
              <dd className="font-semibold text-ink">{donation.donationId}</dd>
            </div>
            {donation.receiptNumber ? (
              <div className="flex items-center justify-between border-b border-border-soft pb-2">
                <dt className="text-sm text-ink-faint">{t("receiptNumber")}</dt>
                <dd className="font-semibold text-ink">{donation.receiptNumber}</dd>
              </div>
            ) : null}
            <div className="flex items-center justify-between border-b border-border-soft pb-2">
              <dt className="text-sm text-ink-faint">{t("amountLabel")}</dt>
              <dd className="font-semibold text-ink">{formatInr(donation.amount)}</dd>
            </div>
            {donation.purpose ? (
              <div className="flex items-center justify-between pb-2">
                <dt className="text-sm text-ink-faint">{t("purposeLabel")}</dt>
                <dd className="font-semibold text-ink">
                  {pick(locale, donation.purpose.labelHi, donation.purpose.labelEn)}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-8">
            <Button href={`/donate/receipt/${donation.id}`} variant="primary">
              {t("downloadReceipt")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-sm border border-border bg-cream-soft p-8 sm:p-10">
          <Clock className="mx-auto mb-4 h-12 w-12 text-gold" aria-hidden="true" />
          <h1 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
            {c.pendingTitle}
          </h1>
          <p className="mt-3 font-body text-ink-soft">
            {donation ? c.pendingBody : c.notFoundBody}
          </p>
        </div>
      )}
    </Container>
  );
}
