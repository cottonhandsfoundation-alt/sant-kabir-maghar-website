import Link from "next/link";
import { prisma } from "@/lib/db";

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfMonth() {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatInr(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export default async function AdminDashboardPage() {
  const [
    donationsTotalCount,
    todayAgg,
    monthAgg,
    successCount,
    failedCount,
    pendingCount,
    distinctDonors,
    byPurpose,
    purposes,
    newEnquiries,
    newVolunteers,
    upcomingEvents,
  ] = await Promise.all([
    prisma.donation.count(),
    prisma.donation.aggregate({
      _sum: { amount: true },
      where: { paymentStatus: "SUCCESS", createdAt: { gte: startOfToday() } },
    }),
    prisma.donation.aggregate({
      _sum: { amount: true },
      where: { paymentStatus: "SUCCESS", createdAt: { gte: startOfMonth() } },
    }),
    prisma.donation.count({ where: { paymentStatus: "SUCCESS" } }),
    prisma.donation.count({ where: { paymentStatus: "FAILED" } }),
    prisma.donation.count({ where: { paymentStatus: { in: ["CREATED", "PENDING"] } } }),
    prisma.donation
      .findMany({
        where: { paymentStatus: "SUCCESS" },
        distinct: ["email"],
        select: { email: true },
      })
      .then((r) => r.length),
    prisma.donation.groupBy({
      by: ["purposeId"],
      _sum: { amount: true },
      where: { paymentStatus: "SUCCESS" },
    }),
    prisma.donationPurpose.findMany(),
    prisma.contactEnquiry.count({ where: { status: "NEW" } }),
    prisma.volunteerApplication.count({ where: { status: "NEW" } }),
    prisma.event.count({ where: { published: true, startDate: { gte: new Date() } } }),
  ]);

  const purposeMap = new Map(purposes.map((p) => [p.id, p]));
  const purposeRows = byPurpose
    .map((row) => ({
      label: row.purposeId
        ? (purposeMap.get(row.purposeId)?.labelEn ?? "Unknown purpose")
        : "No purpose specified",
      amount: row._sum.amount ?? 0,
    }))
    .sort((a, b) => b.amount - a.amount);
  const maxPurposeAmount = Math.max(1, ...purposeRows.map((r) => r.amount));

  const statCards: { label: string; value: string; accent?: boolean }[] = [
    { label: "Today's donations", value: formatInr(todayAgg._sum.amount ?? 0), accent: true },
    { label: "This month's donations", value: formatInr(monthAgg._sum.amount ?? 0), accent: true },
    { label: "Total donation records", value: String(donationsTotalCount) },
    { label: "Successful payments", value: String(successCount) },
    { label: "Failed payments", value: String(failedCount) },
    { label: "Pending / created", value: String(pendingCount) },
    { label: "Distinct donors", value: String(distinctDonors) },
    { label: "Upcoming published events", value: String(upcomingEvents) },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-ink">Dashboard</h1>
        <p className="text-sm text-ink-soft">Overview of donations, engagement and content.</p>
      </div>

      {(newEnquiries > 0 || newVolunteers > 0) && (
        <div className="flex flex-wrap gap-3">
          {newEnquiries > 0 && (
            <Link
              href="/admin/enquiries"
              className="rounded-sm border border-saffron bg-saffron-soft px-4 py-2 text-sm font-medium text-saffron-dark hover:bg-saffron-soft/80"
            >
              {newEnquiries} new enquir{newEnquiries === 1 ? "y" : "ies"} awaiting reply →
            </Link>
          )}
          {newVolunteers > 0 && (
            <Link
              href="/admin/volunteers"
              className="rounded-sm border border-saffron bg-saffron-soft px-4 py-2 text-sm font-medium text-saffron-dark hover:bg-saffron-soft/80"
            >
              {newVolunteers} new volunteer application{newVolunteers === 1 ? "" : "s"} →
            </Link>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-sm border border-border bg-paper p-5">
            <p
              className={`text-2xl font-semibold ${
                card.accent ? "text-saffron-dark" : "text-ink"
              }`}
            >
              {card.value}
            </p>
            <p className="mt-1 text-sm text-ink-soft">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-sm border border-border bg-paper p-5">
        <h2 className="mb-4 font-heading text-lg font-semibold text-ink">
          Donations by purpose
        </h2>
        {purposeRows.length === 0 ? (
          <p className="text-sm text-ink-soft">No successful donations yet.</p>
        ) : (
          <div className="space-y-3">
            {purposeRows.map((row) => {
              const pct = Math.round((row.amount / maxPurposeAmount) * 100);
              return (
                <div key={row.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-ink">{row.label}</span>
                    <span className="text-ink-soft">{formatInr(row.amount)}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-cream-soft">
                    <div
                      style={{ width: `${pct}%` }}
                      className="h-2 rounded-full bg-saffron"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
