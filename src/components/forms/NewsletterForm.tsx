"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { newsletterSubscribeSchema, type NewsletterSubscribeInput } from "@/lib/validation";
import { subscribeNewsletter } from "@/app/actions/forms";

/**
 * Compact, self-contained newsletter signup — email + consent + subscribe
 * button in a single row on wider screens. Designed to be embeddable
 * anywhere (e.g. the homepage) without extra layout wrappers.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const t = useTranslations("NewsletterForm");
  const tc = useTranslations("Common");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterSubscribeInput>({
    resolver: zodResolver(newsletterSubscribeSchema),
    defaultValues: {
      name: "",
      email: "",
      consent: false,
      website: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    const fd = new FormData();
    fd.set("email", values.email);
    fd.set("name", values.name ?? "");
    fd.set("consent", values.consent ? "on" : "");
    fd.set("website", values.website ?? "");

    startTransition(async () => {
      const result = await subscribeNewsletter(fd);
      if (result.ok) {
        setSuccess(true);
        return;
      }
      const errs = result.errors as
        | { _form?: string[] }
        | { formErrors?: string[]; fieldErrors?: Record<string, string[] | undefined> }
        | undefined;
      const message =
        (errs && "_form" in errs && errs._form?.[0]) ||
        (errs && "formErrors" in errs && errs.formErrors?.[0]) ||
        tc("error");
      setFormError(message);
    });
  });

  if (success) {
    return (
      <div className={cn("flex items-center gap-3 rounded-sm border border-border bg-cream-soft px-5 py-4", className)}>
        <CheckCircle2 className="h-6 w-6 shrink-0 text-saffron" aria-hidden="true" />
        <p className="font-body text-sm text-ink">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("w-full max-w-xl", className)}>
      {/* Honeypot field — invisible to humans, often filled by bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="newsletter-website">Website</label>
        <input
          id="newsletter-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <p className="mb-3 font-heading text-lg font-semibold text-ink">{t("title")}</p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            {t("emailPlaceholder")}
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder={t("emailPlaceholder")}
            className="w-full rounded-sm border border-border bg-paper px-4 py-2.5 font-body text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "newsletter-email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p id="newsletter-email-error" className="mt-1 text-sm text-maroon">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <Button type="submit" disabled={isPending} className="shrink-0">
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {tc("submitting")}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              {t("subscribe")}
            </>
          )}
        </Button>
      </div>

      <div className="mt-3 flex items-start gap-2">
        <input
          id="newsletter-consent"
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border border-border accent-saffron"
          aria-required="true"
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "newsletter-consent-error" : undefined}
          {...register("consent")}
        />
        <label htmlFor="newsletter-consent" className="font-body text-sm text-ink-soft">
          {t("consent")}
        </label>
      </div>
      {errors.consent ? (
        <p id="newsletter-consent-error" className="mt-1 text-sm text-maroon">
          {errors.consent.message}
        </p>
      ) : null}

      {formError ? <p className="mt-2 text-sm text-maroon">{formError}</p> : null}
    </form>
  );
}
