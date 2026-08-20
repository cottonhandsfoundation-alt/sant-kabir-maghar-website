"use server";

import { getAdminSession, type AdminRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { mediaAssetInputSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ALLOWED_ROLES: AdminRole[] = ["SUPER_ADMIN", "CONTENT_MANAGER"];

async function requireContentManager() {
  const session = await getAdminSession();
  if (!session || !ALLOWED_ROLES.includes(session.role)) {
    throw new Error("Unauthorized: your role does not have access to Gallery.");
  }
  return session;
}

function readMediaForm(formData: FormData) {
  return mediaAssetInputSchema.parse({
    type: formData.get("type") ?? "",
    url: formData.get("url") ?? "",
    thumbnailUrl: formData.get("thumbnailUrl") ?? "",
    captionEn: formData.get("captionEn") ?? "",
    captionHi: formData.get("captionHi") ?? "",
    category: formData.get("category") ?? "",
    eventId: formData.get("eventId") ?? "",
    sourceUrl: formData.get("sourceUrl") ?? "",
    creator: formData.get("creator") ?? "",
    license: formData.get("license") ?? "",
    attributionRequired: formData.get("attributionRequired") === "on",
    attributionText: formData.get("attributionText") ?? "",
    published: formData.get("published") === "on",
  });
}

export async function createMediaAsset(formData: FormData) {
  await requireContentManager();
  const data = readMediaForm(formData);

  await prisma.mediaAsset.create({
    data: {
      ...data,
      thumbnailUrl: data.thumbnailUrl || null,
      captionEn: data.captionEn || null,
      captionHi: data.captionHi || null,
      eventId: data.eventId || null,
      sourceUrl: data.sourceUrl || null,
      creator: data.creator || null,
      license: data.license || null,
      attributionText: data.attributionText || null,
    },
  });

  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function updateMediaAsset(id: string, formData: FormData) {
  await requireContentManager();
  const data = readMediaForm(formData);

  await prisma.mediaAsset.update({
    where: { id },
    data: {
      ...data,
      thumbnailUrl: data.thumbnailUrl || null,
      captionEn: data.captionEn || null,
      captionHi: data.captionHi || null,
      eventId: data.eventId || null,
      sourceUrl: data.sourceUrl || null,
      creator: data.creator || null,
      license: data.license || null,
      attributionText: data.attributionText || null,
    },
  });

  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function deleteMediaAsset(id: string) {
  await requireContentManager();
  await prisma.mediaAsset.delete({ where: { id } });
  revalidatePath("/admin/gallery");
}

export async function toggleMediaAssetPublished(id: string) {
  await requireContentManager();
  const row = await prisma.mediaAsset.findUnique({ where: { id }, select: { published: true } });
  if (!row) return;
  await prisma.mediaAsset.update({ where: { id }, data: { published: !row.published } });
  revalidatePath("/admin/gallery");
}
