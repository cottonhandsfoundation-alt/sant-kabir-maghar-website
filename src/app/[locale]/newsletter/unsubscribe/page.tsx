import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CheckCircle2, MailX } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/db";

const content = {
  hi: {
    title: "समाचार पत्र सदस्यता समाप्त करें",
    confirmPrefix: "क्या आप",
    confirmSuffix: "को भेजी जाने वाली सूचनाएं बंद करना चाहते हैं?",
    confirmButton: "हां, सदस्यता समाप्त करें",
    successTitle: "सदस्यता समाप्त कर दी गई",
    successBody: "आपको अब हमारी ओर से समाचार पत्र संबंधी ईमेल प्राप्त नहीं होंगी। यदि आप पुनः सदस्यता लेना चाहें, तो कभी भी हमारी वेबसाइट से जुड़ सकते हैं।",
    invalidTitle: "अमान्य या समाप्त हो चुका लिंक",
    invalidBody: "यह सदस्यता-समाप्ति लिंक अमान्य है या इसकी अवधि समाप्त हो चुकी है। यदि आपको सहायता चाहिए, तो कृपया हमसे संपर्क करें।",
    backHome: "होम पर वापस जाएं",
  },
  en: {
    title: "Unsubscribe from Newsletter",
    confirmPrefix: "Are you sure you want to unsubscribe",
    confirmSuffix: "from our newsletter updates?",
    confirmButton: "Yes, unsubscribe me",
    successTitle: "You have been unsubscribed",
    successBody: "You will no longer receive newsletter emails from us. You're welcome to subscribe again anytime from our website.",
    invalidTitle: "Invalid or Expired Link",
    invalidBody: "This unsubscribe link is invalid or has expired. If you need help, please contact us.",
    backHome: "Back to home",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHi = locale === "hi";
  return {
    title: isHi ? "सदस्यता समाप्त करें — संत कबीर सेवा समिति" : "Unsubscribe — Sant Kabir Sewa Samiti",
    robots: { index: false, follow: false },
  };
}

export default async function UnsubscribePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { token } = await searchParams;
  const c = content[locale as "hi" | "en"];

  const subscriber = token
    ? await prisma.newsletterSubscriber.findUnique({ where: { unsubscribeToken: token } })
    : null;

  async function confirmUnsubscribe() {
    "use server";
    if (!token) return;
    await prisma.newsletterSubscriber.update({
      where: { unsubscribeToken: token },
      data: { status: "UNSUBSCRIBED", unsubscribedAt: new Date() },
    });
  }

  if (!subscriber) {
    return (
      <Container className="max-w-lg py-20 text-center">
        <MailX className="mx-auto mb-4 h-10 w-10 text-ink-faint" aria-hidden="true" />
        <h1 className="font-heading text-2xl font-semibold text-ink">{c.invalidTitle}</h1>
        <p className="mt-3 font-body text-ink-soft">{c.invalidBody}</p>
        <Button href="/" variant="outline" className="mt-6">
          {c.backHome}
        </Button>
      </Container>
    );
  }

  if (subscriber.status === "UNSUBSCRIBED") {
    return (
      <Container className="max-w-lg py-20 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-saffron" aria-hidden="true" />
        <h1 className="font-heading text-2xl font-semibold text-ink">{c.successTitle}</h1>
        <p className="mt-3 font-body text-ink-soft">{c.successBody}</p>
        <Button href="/" variant="outline" className="mt-6">
          {c.backHome}
        </Button>
      </Container>
    );
  }

  return (
    <Container className="max-w-lg py-20 text-center">
      <h1 className="font-heading text-2xl font-semibold text-ink">{c.title}</h1>
      <p className="mt-4 font-body text-ink-soft">
        {c.confirmPrefix} <span className="font-medium text-ink">{subscriber.email}</span>{" "}
        {c.confirmSuffix}
      </p>
      <form action={confirmUnsubscribe} className="mt-6">
        <Button type="submit" variant="secondary">
          {c.confirmButton}
        </Button>
      </form>
    </Container>
  );
}
