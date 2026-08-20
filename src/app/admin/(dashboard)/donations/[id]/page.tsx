import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatInr } from "@/lib/receipt";
import { formatDateTime } from "@/lib/utils";
import { StatusPill } from "../../_shared/StatusPill";
import { resendReceiptEmail, overrideDonationStatus } from "../actions";

const PAYMENT_STATUSES = ["CREATED", "PENDING", "SUCCESS", "FAILED", "REFUNDED"] as const;

function statusTone(status: string) {
  if (status === "SUCCESS") return "green" as const;
  if (status === "FAILED" || status === "REFUNDED") return "maroon" as const;
  return "gold" as const;
}

export default async function DonationDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ resent?: string; statusUpdated?: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const allowed = ["SUPER_ADMIN", "DONATION_MANAGER"];
  if (!allowed.includes(session.role)) {
    return (
      <div className="p-8">
        <p className="text-lg font-semibold">Access denied</p>
        <p className="text-sm text-ink-soft">
          Your role ({session.role}) does not have access to this section.
        </p>
      </div>
    );
  }

  const { id } = await params;
  const sp = await searchParams;

  const donation = await prisma.donation.findUnique({
    where: { id },
    include: { purpose: true, webhookEvents: true },
  });
  if (!donation) notFound();

  const donationId = donation.id;
  const resendReceiptEmailBound = resendReceiptEmail.bind(null, donationId);

  // overrideDonationStatus takes (donationId, newStatus) — newStatus comes
  // from the form's <select>, so it's read out of the submitted FormData
  // here rather than bound ahead of time. This inline closure is itself a
  // server action; the real role re-check happens inside
  // overrideDonationStatus, which independently re-verifies SUPER_ADMIN.
  async function handleOverrideStatus(formData: FormData) {
    "use server";
    const newStatus = String(formData.get("newStatus") ?? "");
    await overrideDonationStatus(donationId, newStatus);
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/admin/donations" className="text-sm text-ink-soft hover:text-ink">
            ← Back to Donations
          </Link>
          <h1 className="mt-2 text-xl font-semibold">{donation.donationId}</h1>
        </div>
        <StatusPill label={donation.paymentStatus} tone={statusTone(donation.paymentStatus)} />
      </div>

      {sp.resent === "1" && (
        <div className="mb-4 rounded border border-green bg-cream-soft px-4 py-2 text-sm text-green">
          Receipt email resent successfully.
        </div>
      )}
      {sp.statusUpdated === "1" && (
        <div className="mb-4 rounded border border-green bg-cream-soft px-4 py-2 text-sm text-green">
          Donation status updated.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-lg border border-border-soft bg-paper p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase text-ink-soft">Donor</h2>
          <dl className="grid grid-cols-[180px_1fr] gap-y-2 text-sm">
            <dt className="text-ink-soft">Name</dt>
            <dd>{donation.donorName}</dd>
            <dt className="text-ink-soft">Email</dt>
            <dd>{donation.email}</dd>
            <dt className="text-ink-soft">Mobile</dt>
            <dd>{donation.mobile}</dd>
            <dt className="text-ink-soft">PAN</dt>
            <dd>{donation.pan ?? "—"}</dd>
            <dt className="text-ink-soft">Address</dt>
            <dd>{donation.address ?? "—"}</dd>
            <dt className="text-ink-soft">Anonymous</dt>
            <dd>{donation.anonymous ? "Yes" : "No"}</dd>
          </dl>
        </section>

        <section className="rounded-lg border border-border-soft bg-paper p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase text-ink-soft">Donation</h2>
          <dl className="grid grid-cols-[180px_1fr] gap-y-2 text-sm">
            <dt className="text-ink-soft">Amount</dt>
            <dd>{formatInr(donation.amount)}</dd>
            <dt className="text-ink-soft">Currency</dt>
            <dd>{donation.currency}</dd>
            <dt className="text-ink-soft">Purpose</dt>
            <dd>{donation.purpose?.labelEn ?? "—"}</dd>
            <dt className="text-ink-soft">Recurring</dt>
            <dd>{donation.isRecurring ? "Yes" : "No"}</dd>
            <dt className="text-ink-soft">Receipt Number</dt>
            <dd>{donation.receiptNumber ?? "—"}</dd>
            <dt className="text-ink-soft">Notes</dt>
            <dd>{donation.notes ?? "—"}</dd>
            <dt className="text-ink-soft">Created</dt>
            <dd>{formatDateTime(donation.createdAt, "en")}</dd>
            <dt className="text-ink-soft">Updated</dt>
            <dd>{formatDateTime(donation.updatedAt, "en")}</dd>
          </dl>
        </section>

        <section className="rounded-lg border border-border-soft bg-paper p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase text-ink-soft">Gateway</h2>
          <dl className="grid grid-cols-[180px_1fr] gap-y-2 text-sm">
            <dt className="text-ink-soft">Gateway</dt>
            <dd>{donation.paymentGateway}</dd>
            <dt className="text-ink-soft">Order ID</dt>
            <dd className="break-all font-mono text-xs">{donation.gatewayOrderId ?? "—"}</dd>
            <dt className="text-ink-soft">Payment ID</dt>
            <dd className="break-all font-mono text-xs">{donation.gatewayPaymentId ?? "—"}</dd>
            <dt className="text-ink-soft">Signature</dt>
            <dd className="break-all font-mono text-xs">{donation.gatewaySignature ?? "—"}</dd>
            <dt className="text-ink-soft">IP Address</dt>
            <dd>{donation.ipAddress ?? "—"}</dd>
          </dl>
        </section>

        <section className="rounded-lg border border-border-soft bg-paper p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase text-ink-soft">
            Webhook Events ({donation.webhookEvents.length})
          </h2>
          {donation.webhookEvents.length === 0 ? (
            <p className="text-sm text-ink-soft">No webhook events recorded.</p>
          ) : (
            <details>
              <summary className="cursor-pointer text-sm text-saffron">
                Show {donation.webhookEvents.length} event
                {donation.webhookEvents.length === 1 ? "" : "s"}
              </summary>
              <ul className="mt-2 space-y-1 text-xs text-ink-soft">
                {donation.webhookEvents.map((ev) => (
                  <li key={ev.id} className="border-b border-border-soft py-1 last:border-0">
                    {ev.eventType} — {formatDateTime(ev.processedAt, "en")}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </section>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <section className="rounded-lg border border-border-soft bg-paper p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase text-ink-soft">Receipt Email</h2>
          <form action={resendReceiptEmailBound}>
            <button
              type="submit"
              disabled={donation.paymentStatus !== "SUCCESS"}
              className="rounded bg-saffron px-4 py-2 text-sm font-medium text-white hover:bg-saffron-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              Resend receipt email
            </button>
            {donation.paymentStatus !== "SUCCESS" && (
              <p className="mt-2 text-xs text-ink-soft">
                Only available once the payment status is SUCCESS.
              </p>
            )}
          </form>
        </section>

        {session.role === "SUPER_ADMIN" && (
          <section className="rounded-lg border border-border-soft bg-paper p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase text-ink-soft">
              Manual Status Override
            </h2>
            <form action={handleOverrideStatus} className="flex items-end gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-ink-soft" htmlFor="newStatus">
                  New status
                </label>
                <select
                  id="newStatus"
                  name="newStatus"
                  defaultValue={donation.paymentStatus}
                  className="rounded border border-border bg-cream px-2 py-1.5 text-sm text-ink"
                >
                  {PAYMENT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="rounded bg-maroon px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Override status
              </button>
            </form>
            <p className="mt-2 text-xs text-ink-soft">
              For rare manual corrections only (e.g. bank-confirmed payment whose webhook
              never arrived). Logged to the audit trail.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
