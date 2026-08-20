import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DonationPurposeForm } from "../DonationPurposeForm";
import { createDonationPurpose } from "../actions";

const ALLOWED_ROLES = ["SUPER_ADMIN", "DONATION_MANAGER"];

export default async function NewDonationPurposePage() {
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

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-ink">New Donation Purpose</h1>
      <DonationPurposeForm action={createDonationPurpose} />
    </div>
  );
}
