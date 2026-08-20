"use server";

import { getAdminSession, type AdminRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { dohaInputSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ALLOWED_ROLES: AdminRole[] = ["SUPER_ADMIN", "CONTENT_MANAGER"];

async function requireContentManager() {
  const session = await getAdminSession();
  if (!session || !ALLOWED_ROLES.includes(session.role)) {
    throw new Error("Unauthorized: your role does not have access to the Doha Library.");
  }
  return session;
}

function readDohaForm(formData: FormData) {
  const parsed = dohaInputSchema.parse({
    hindiText: formData.get("hindiText") ?? "",
    meaningHindi: formData.get("meaningHindi") ?? "",
    meaningEnglish: formData.get("meaningEnglish") ?? "",
    theme: formData.get("theme") ?? "",
    audioUrl: formData.get("audioUrl") ?? "",
    published: formData.get("published") === "on",
  });
  const sortOrderRaw = formData.get("sortOrder");
  const sortOrder = sortOrderRaw ? parseInt(sortOrderRaw as string, 10) : 0;
  return { ...parsed, sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder };
}

export async function createDoha(formData: FormData) {
  await requireContentManager();
  const data = readDohaForm(formData);

  await prisma.doha.create({
    data: {
      ...data,
      audioUrl: data.audioUrl || null,
    },
  });

  revalidatePath("/admin/dohas");
  redirect("/admin/dohas");
}

export async function updateDoha(id: string, formData: FormData) {
  await requireContentManager();
  const data = readDohaForm(formData);

  await prisma.doha.update({
    where: { id },
    data: {
      ...data,
      audioUrl: data.audioUrl || null,
    },
  });

  revalidatePath("/admin/dohas");
  redirect("/admin/dohas");
}

export async function deleteDoha(id: string) {
  await requireContentManager();
  await prisma.doha.delete({ where: { id } });
  revalidatePath("/admin/dohas");
}

export async function toggleDohaPublished(id: string) {
  await requireContentManager();
  const row = await prisma.doha.findUnique({ where: { id }, select: { published: true } });
  if (!row) return;
  await prisma.doha.update({ where: { id }, data: { published: !row.published } });
  revalidatePath("/admin/dohas");
}
