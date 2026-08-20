"use server";

import { getAdminSession, type AdminRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { donationPurposeInputSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ALLOWED_ROLES: AdminRole[] = ["SUPER_ADMIN", "DONATION_MANAGER"];

async function requireDonationManager() {
  const session = await getAdminSession();
  if (!session || !ALLOWED_ROLES.includes(session.role)) {
    throw new Error("Unauthorized: your role does not have access to Donation Purposes.");
  }
  return session;
}

function readDonationPurposeForm(formData: FormData) {
  const sortOrderRaw = formData.get("sortOrder");
  const sortOrder = sortOrderRaw ? parseInt(sortOrderRaw as string, 10) : 0;
  return donationPurposeInputSchema.parse({
    key: formData.get("key") ?? "",
    labelEn: formData.get("labelEn") ?? "",
    labelHi: formData.get("labelHi") ?? "",
    active: formData.get("active") === "on",
    sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder,
  });
}

export async function createDonationPurpose(formData: FormData) {
  await requireDonationManager();
  const data = readDonationPurposeForm(formData);

  await prisma.donationPurpose.create({ data });

  revalidatePath("/admin/donation-purposes");
  redirect("/admin/donation-purposes");
}

export async function updateDonationPurpose(id: string, formData: FormData) {
  await requireDonationManager();
  const data = readDonationPurposeForm(formData);

  // key is not editable after creation (see form: disabled on edit) — never
  // trust that client-side disabled attribute alone, so ignore any posted
  // key change here and keep the existing one.
  const existing = await prisma.donationPurpose.findUnique({ where: { id }, select: { key: true } });
  if (!existing) throw new Error("Donation purpose not found.");

  await prisma.donationPurpose.update({
    where: { id },
    data: {
      labelEn: data.labelEn,
      labelHi: data.labelHi,
      active: data.active,
      sortOrder: data.sortOrder,
    },
  });

  revalidatePath("/admin/donation-purposes");
  redirect("/admin/donation-purposes");
}

export async function deleteDonationPurpose(id: string) {
  await requireDonationManager();
  await prisma.donationPurpose.delete({ where: { id } });
  revalidatePath("/admin/donation-purposes");
}

export async function toggleDonationPurposeActive(id: string) {
  await requireDonationManager();
  const row = await prisma.donationPurpose.findUnique({ where: { id }, select: { active: true } });
  if (!row) return;
  await prisma.donationPurpose.update({ where: { id }, data: { active: !row.active } });
  revalidatePath("/admin/donation-purposes");
}
