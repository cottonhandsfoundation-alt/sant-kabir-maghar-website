"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { Loader2, ShieldCheck, Heart } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { cn, pick } from "@/lib/utils";
import { createDonationOrderSchema, DONATION_PRESET_AMOUNTS } from "@/lib/validation";

// Razorpay Checkout.js is loaded lazily from their CDN and attaches itself
// to `window.Razorpay`. It is a third-party script global, not app logic,
// so `any` is an acceptable (and standard) escape hatch here.
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- third-party script global, not app logic
    Razorpay: any;
  }
}

const CHECKOUT_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CHECKOUT_SCRIPT_SRC}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = CHECKOUT_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const inputClasses =
  "w-full rounded-sm border border-border bg-paper px-4 py-2.5 font-body text-ink placeholder:text-ink-faint focus:border-saffron focus:outline-none";
const labelClasses = "mb-1.5 block font-body text-sm font-medium text-ink";
const errorClasses = "mt-1 text-sm text-maroon";

type Purpose = { key: string; labelEn: string; labelHi: string };

export function DonateForm({
  purposes,
  gatewayConfigured,
  orgName,
}: {
  purposes: Purpose[];
  gatewayConfigured: boolean;
  orgName: string;
}) {
  const t = useTranslations("DonateForm");
  const tc = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [useCustomAmount, setUseCustomAmount] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createDonationOrderSchema),
    defaultValues: {
      donorName: "",
      email: "",
      mobile: "",
      pan: "",
      address: "",
      amount: DONATION_PRESET_AMOUNTS[0],
      purposeKey: purposes[0]?.key ?? "",
      anonymous: false,
      isRecurring: false,
    },
  });

  const currentAmount = watch("amount");

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    setIsPending(true);

    void (async () => {
      try {
        const createRes = await fetch("/api/donations/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (createRes.status === 503) {
          setFormError(t("gatewayNotConfigured"));
          setIsPending(false);
          return;
        }

        if (!createRes.ok) {
          setFormError(tc("error"));
          setIsPending(false);
          return;
        }

        const order = (await createRes.json()) as {
          donationId: string;
          orderId: string;
          amount: number;
          currency: string;
          keyId: string | null;
        };

        if (!order.keyId) {
          setFormError(t("gatewayNotConfigured"));
          setIsPending(false);
          return;
        }

        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded || !window.Razorpay) {
          setFormError(tc("error"));
          setIsPending(false);
          return;
        }

        const razorpay = new window.Razorpay({
          key: order.keyId,
          amount: order.amount,
          currency: order.currency,
          order_id: order.orderId,
          name: orgName,
          description: "Donation",
          prefill: {
            name: values.donorName,
            email: values.email,
            contact: values.mobile,
          },
          notes: {
            donationId: order.donationId,
          },
          theme: {
            color: "#bf4c1f",
          },
          handler: async function handleCheckoutSuccess(response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) {
            // Best-effort fast-path confirmation — if this call fails for any
            // reason (network blip, etc.) the webhook is still the source of
            // truth and will settle the donation shortly. Either way we send
            // the donor to the success page, which handles a not-yet-SUCCESS
            // state gracefully rather than treating it as a hard failure.
            try {
              await fetch("/api/donations/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  donationId: order.donationId,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });
            } finally {
              router.push(`/donate/success?donationId=${encodeURIComponent(order.donationId)}`);
            }
          },
          modal: {
            ondismiss: () => setIsPending(false),
          },
        });

        razorpay.open();
      } catch {
        setFormError(tc("error"));
        setIsPending(false);
      }
    })();
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <span className={labelClasses}>{t("amountLabel")}</span>
        <div className="flex flex-wrap gap-2.5">
          {DONATION_PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                setUseCustomAmount(false);
                setValue("amount", preset, { shouldValidate: true });
              }}
              className={cn(
                "rounded-sm border px-4 py-2.5 font-body text-sm font-semibold transition-colors",
                !useCustomAmount && currentAmount === preset
                  ? "border-saffron bg-saffron text-cream"
                  : "border-border bg-paper text-ink hover:border-saffron"
              )}
              aria-pressed={!useCustomAmount && currentAmount === preset}
            >
              ₹{preset.toLocaleString("en-IN")}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setUseCustomAmount(true)}
            className={cn(
              "rounded-sm border px-4 py-2.5 font-body text-sm font-semibold transition-colors",
              useCustomAmount
                ? "border-saffron bg-saffron text-cream"
                : "border-border bg-paper text-ink hover:border-saffron"
            )}
            aria-pressed={useCustomAmount}
          >
            {t("customAmountLabel")}
          </button>
        </div>

        {useCustomAmount ? (
          <div className="mt-3">
            <label htmlFor="donate-custom-amount" className={labelClasses}>
              {t("customAmountLabel")}
            </label>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <input
                  id="donate-custom-amount"
                  type="number"
                  min={100}
                  inputMode="numeric"
                  placeholder={t("customAmountPlaceholder")}
                  className={inputClasses}
                  aria-invalid={!!errors.amount}
                  value={Number.isNaN(field.value) ? "" : field.value}
                  onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                />
              )}
            />
          </div>
        ) : null}

        {errors.amount ? <p className={errorClasses}>{errors.amount.message}</p> : null}
      </div>

      <div>
        <label htmlFor="donate-purpose" className={labelClasses}>
          {t("purposeLabel")}
        </label>
        <select id="donate-purpose" className={inputClasses} {...register("purposeKey")}>
          {purposes.map((p) => (
            <option key={p.key} value={p.key}>
              {pick(locale, p.labelHi, p.labelEn)}
            </option>
          ))}
        </select>
        {errors.purposeKey ? <p className={errorClasses}>{errors.purposeKey.message}</p> : null}
      </div>

      <div className="motif-divider" />

      <div>
        <h3 className="mb-4 font-heading text-lg font-semibold text-ink">
          {t("donorDetailsTitle")}
        </h3>

        <div className="space-y-5">
          <div>
            <label htmlFor="donate-name" className={labelClasses}>
              {t("name")}
            </label>
            <input
              id="donate-name"
              type="text"
              className={inputClasses}
              aria-required="true"
              aria-invalid={!!errors.donorName}
              {...register("donorName")}
            />
            {errors.donorName ? <p className={errorClasses}>{errors.donorName.message}</p> : null}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="donate-email" className={labelClasses}>
                {t("email")}
              </label>
              <input
                id="donate-email"
                type="email"
                className={inputClasses}
                aria-required="true"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email ? <p className={errorClasses}>{errors.email.message}</p> : null}
            </div>

            <div>
              <label htmlFor="donate-mobile" className={labelClasses}>
                {t("mobile")}
              </label>
              <input
                id="donate-mobile"
                type="tel"
                className={inputClasses}
                aria-required="true"
                aria-invalid={!!errors.mobile}
                {...register("mobile")}
              />
              {errors.mobile ? <p className={errorClasses}>{errors.mobile.message}</p> : null}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="donate-pan" className={labelClasses}>
                {t("pan")}
              </label>
              <input
                id="donate-pan"
                type="text"
                className={cn(inputClasses, "uppercase")}
                aria-invalid={!!errors.pan}
                {...register("pan")}
              />
              {errors.pan ? <p className={errorClasses}>{errors.pan.message}</p> : null}
            </div>

            <div>
              <label htmlFor="donate-address" className={labelClasses}>
                {t("address")}
              </label>
              <input
                id="donate-address"
                type="text"
                className={inputClasses}
                aria-invalid={!!errors.address}
                {...register("address")}
              />
              {errors.address ? <p className={errorClasses}>{errors.address.message}</p> : null}
            </div>
          </div>

          <label className="flex items-start gap-2.5 font-body text-sm text-ink-soft">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded-sm border-border text-saffron focus:outline-saffron"
              {...register("anonymous")}
            />
            {t("anonymousLabel")}
          </label>
        </div>
      </div>

      {!gatewayConfigured ? (
        <p className="rounded-sm border border-gold bg-gold-pale px-4 py-3 font-body text-sm text-ink-soft">
          {t("gatewayNotConfigured")}
        </p>
      ) : null}

      <p className="flex items-start gap-2 font-body text-xs text-ink-faint">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
        {t("sandboxNotice")}
      </p>

      {formError ? <p className={errorClasses}>{formError}</p> : null}

      <Button
        type="submit"
        disabled={isPending || !gatewayConfigured}
        className="w-full sm:w-auto"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {t("processing")}
          </>
        ) : (
          <>
            <Heart className="h-4 w-4" aria-hidden="true" />
            {t("payButton")}
          </>
        )}
      </Button>

      <p className="font-body text-xs text-ink-faint">{t("secureNotice")}</p>
    </form>
  );
}
