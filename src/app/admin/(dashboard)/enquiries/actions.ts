"use server";

import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

const CONTENT_ROLES = ["SUPER_ADMIN", "CONTENT_MANAGER"];
const ENQUIRY_STATUSES = ["NEW", "IN_PROGRESS", "RESOLVED"];

export async function updateEnquiryStatus(formData: FormData) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");
  if (!CONTENT_ROLES.includes(session.role)) {
    throw new Error("Forbidden: your role does not have access to this action.");
  }

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !ENQUIRY_STATUSES.includes(status)) {
    throw new Error("Invalid enquiry status update.");
  }

  await prisma.contactEnquiry.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/enquiries");
}
