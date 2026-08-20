import { getAdminSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { DonationPurposeForm } from "../DonationPurposeForm";
import { updateDonationPurpose } from "../actions";

const ALLOWED_ROLES = ["SUPER_ADMIN", "DONATION_MANAGER"];

export default async function EditDonationPurposePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (!ALLOWED_ROLES.includes(session.role)) {
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
  const purpose = await prisma.donationPurpose.findUnique({ where: { id } });
  if (!purpose) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-ink">Edit Donation Purpose</h1>
      <DonationPurposeForm action={updateDonationPurpose.bind(null, id)} defaultValues={purpose} />
    </div>
  );
}
