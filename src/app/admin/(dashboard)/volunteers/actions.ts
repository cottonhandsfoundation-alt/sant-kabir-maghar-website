"use server";

import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

const CONTENT_ROLES = ["SUPER_ADMIN", "CONTENT_MANAGER"];
const VOLUNTEER_STATUSES = ["NEW", "CONTACTED", "ACTIVE", "INACTIVE"];

export async function updateVolunteerStatus(formData: FormData) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");
  if (!CONTENT_ROLES.includes(session.role)) {
    throw new Error("Forbidden: your role does not have access to this action.");
  }

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !VOLUNTEER_STATUSES.includes(status)) {
    throw new Error("Invalid volunteer status update.");
  }

  await prisma.volunteerApplication.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/volunteers");
}
