"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { volunteerApplicationSchema, type VolunteerApplicationInput } from "@/lib/validation";
import { submitVolunteerApplication } from "@/app/actions/forms";

const inputClasses =
  "w-full rounded-sm border border-border bg-paper px-4 py-2.5 font-body text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none";
const labelClasses = "mb-1.5 block font-body text-sm font-medium text-ink";
const errorClasses = "mt-1 text-sm text-maroon";

export function VolunteerForm() {
  const t = useTranslations("VolunteerForm");
  const tc = useTranslations("Common");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VolunteerApplicationInput>({
    resolver: zodResolver(volunteerApplicationSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      city: "",
      areaOfInterest: "",
      availability: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    const fd = new FormData();
    fd.set("name", values.name);
    fd.set("mobile", values.mobile);
    fd.set("email", values.email);
    fd.set("city", values.city);
    fd.set("areaOfInterest", values.areaOfInterest);
    fd.set("availability", values.availability ?? "");
    fd.set("message", values.message ?? "");
    fd.set("website", values.website ?? "");

    startTransition(async () => {
      const result = await submitVolunteerApplication(fd);
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
        <label htmlFor="volunteer-website">Website</label>
        <input
          id="volunteer-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div>
        <label htmlFor="volunteer-name" className={labelClasses}>
          {t("name")}
        </label>
        <input
          id="volunteer-name"
          type="text"
          className={inputClasses}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "volunteer-name-error" : undefined}
          {...register("name")}
        />
        {errors.name ? (
          <p id="volunteer-name-error" className={errorClasses}>
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="volunteer-mobile" className={labelClasses}>
            {t("mobile")}
          </label>
          <input
            id="volunteer-mobile"
            type="tel"
            className={inputClasses}
            aria-required="true"
            aria-invalid={!!errors.mobile}
            aria-describedby={errors.mobile ? "volunteer-mobile-error" : undefined}
            {...register("mobile")}
          />
          {errors.mobile ? (
            <p id="volunteer-mobile-error" className={errorClasses}>
              {errors.mobile.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="volunteer-email" className={labelClasses}>
            {t("email")}
          </label>
          <input
            id="volunteer-email"
            type="email"
            className={inputClasses}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "volunteer-email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p id="volunteer-email-error" className={errorClasses}>
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="volunteer-city" className={labelClasses}>
          {t("city")}
        </label>
        <input
          id="volunteer-city"
          type="text"
          className={inputClasses}
          aria-required="true"
          aria-invalid={!!errors.city}
          aria-describedby={errors.city ? "volunteer-city-error" : undefined}
          {...register("city")}
        />
        {errors.city ? (
          <p id="volunteer-city-error" className={errorClasses}>
            {errors.city.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="volunteer-area" className={labelClasses}>
          {t("areaOfInterest")}
        </label>
        <input
          id="volunteer-area"
          type="text"
          placeholder={t("areaOfInterestPlaceholder")}
          className={inputClasses}
          aria-required="true"
          aria-invalid={!!errors.areaOfInterest}
          aria-describedby={errors.areaOfInterest ? "volunteer-area-error" : undefined}
          {...register("areaOfInterest")}
        />
        {errors.areaOfInterest ? (
          <p id="volunteer-area-error" className={errorClasses}>
            {errors.areaOfInterest.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="volunteer-availability" className={labelClasses}>
          {t("availability")} <span className="text-ink-faint">({tc("optional")})</span>
        </label>
        <input
          id="volunteer-availability"
          type="text"
          className={inputClasses}
          aria-invalid={!!errors.availability}
          aria-describedby={errors.availability ? "volunteer-availability-error" : undefined}
          {...register("availability")}
        />
        {errors.availability ? (
          <p id="volunteer-availability-error" className={errorClasses}>
            {errors.availability.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="volunteer-message" className={labelClasses}>
          {t("message")}
        </label>
        <textarea
          id="volunteer-message"
          rows={4}
          className={inputClasses}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "volunteer-message-error" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p id="volunteer-message-error" className={errorClasses}>
            {errors.message.message}
          </p>
        ) : null}
      </div>

      {formError ? <p className={errorClasses}>{formError}</p> : null}

      <Button type="submit" disabled={isPending} className="w-full">
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
