"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useTranslations } from "next-intl";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactEnquirySchema, type ContactEnquiryInput } from "@/lib/validation";
import { submitContactEnquiry } from "@/app/actions/forms";

type ContactType = ContactEnquiryInput["type"];
// Use the schema's *input* type (pre-default-application) so it matches what
// zodResolver expects for react-hook-form's generic — the `type` field is
// optional on input because the schema applies a default for it.
type ContactFormValues = z.input<typeof contactEnquirySchema>;

const inputClasses =
  "w-full rounded-sm border border-border bg-paper px-4 py-2.5 font-body text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none";
const labelClasses = "mb-1.5 block font-body text-sm font-medium text-ink";
const errorClasses = "mt-1 text-sm text-maroon";

export function ContactForm({ defaultType = "GENERAL" }: { defaultType?: ContactType }) {
  const t = useTranslations("ContactForm");
  const tp = useTranslations("ContactPage");
  const tc = useTranslations("Common");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactEnquirySchema),
    defaultValues: {
      type: defaultType,
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    const fd = new FormData();
    fd.set("type", values.type ?? "GENERAL");
    fd.set("name", values.name);
    fd.set("email", values.email);
    fd.set("phone", values.phone ?? "");
    fd.set("subject", values.subject ?? "");
    fd.set("message", values.message);
    fd.set("website", values.website ?? "");

    startTransition(async () => {
      const result = await submitContactEnquiry(fd);
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
      <div className="rounded-sm border border-border bg-cream-soft p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-saffron" aria-hidden="true" />
        <h3 className="font-heading text-xl font-semibold text-ink">{t("successTitle")}</h3>
        <p className="mt-2 font-body text-ink-soft">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot field — invisible to humans, often filled by bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div>
        <label htmlFor="contact-type" className={labelClasses}>
          {tp("enquiryTypesTitle")}
        </label>
        <select id="contact-type" className={inputClasses} {...register("type")}>
          <option value="GENERAL">{t("typeGeneral")}</option>
          <option value="VISIT">{t("typeVisit")}</option>
          <option value="DONATION">{t("typeDonation")}</option>
          <option value="VOLUNTEER">{t("typeVolunteer")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-name" className={labelClasses}>
          {t("name")}
        </label>
        <input
          id="contact-name"
          type="text"
          className={inputClasses}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          {...register("name")}
        />
        {errors.name ? (
          <p id="contact-name-error" className={errorClasses}>
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            {t("email")}
          </label>
          <input
            id="contact-email"
            type="email"
            className={inputClasses}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p id="contact-email-error" className={errorClasses}>
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-phone" className={labelClasses}>
            {t("phone")} <span className="text-ink-faint">({tc("optional")})</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            className={inputClasses}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone ? (
            <p id="contact-phone-error" className={errorClasses}>
              {errors.phone.message}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClasses}>
          {t("subject")} <span className="text-ink-faint">({tc("optional")})</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          className={inputClasses}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          {...register("subject")}
        />
        {errors.subject ? (
          <p id="contact-subject-error" className={errorClasses}>
            {errors.subject.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClasses}>
          {t("message")}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          className={inputClasses}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p id="contact-message-error" className={errorClasses}>
            {errors.message.message}
          </p>
        ) : null}
      </div>

      {formError ? <p className={errorClasses}>{formError}</p> : null}

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {tc("submitting")}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            {tc("submit")}
          </>
        )}
      </Button>
    </form>
  );
}
