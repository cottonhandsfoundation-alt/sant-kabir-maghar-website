"use server";

import { getAdminSession, type AdminRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { videoInputSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ALLOWED_ROLES: AdminRole[] = ["SUPER_ADMIN", "CONTENT_MANAGER"];

async function requireContentManager() {
  const session = await getAdminSession();
  if (!session || !ALLOWED_ROLES.includes(session.role)) {
    throw new Error("Unauthorized: your role does not have access to Videos.");
  }
  return session;
}

function readVideoForm(formData: FormData) {
  return videoInputSchema.parse({
    titleEn: formData.get("titleEn") ?? "",
    titleHi: formData.get("titleHi") ?? "",
    youtubeId: formData.get("youtubeId") ?? "",
    category: formData.get("category") ?? "",
    descriptionEn: formData.get("descriptionEn") ?? "",
    descriptionHi: formData.get("descriptionHi") ?? "",
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  });
}

export async function createVideo(formData: FormData) {
  await requireContentManager();
  const data = readVideoForm(formData);

  await prisma.video.create({
    data: {
      ...data,
      descriptionEn: data.descriptionEn || null,
      descriptionHi: data.descriptionHi || null,
    },
  });

  revalidatePath("/admin/videos");
  redirect("/admin/videos");
}

export async function updateVideo(id: string, formData: FormData) {
  await requireContentManager();
  const data = readVideoForm(formData);

  await prisma.video.update({
    where: { id },
    data: {
      ...data,
      descriptionEn: data.descriptionEn || null,
      descriptionHi: data.descriptionHi || null,
    },
  });

  revalidatePath("/admin/videos");
  redirect("/admin/videos");
}

export async function deleteVideo(id: string) {
  await requireContentManager();
  await prisma.video.delete({ where: { id } });
  revalidatePath("/admin/videos");
}

export async function toggleVideoPublished(id: string) {
  await requireContentManager();
  const row = await prisma.video.findUnique({ where: { id }, select: { published: true } });
  if (!row) return;
  await prisma.video.update({ where: { id }, data: { published: !row.published } });
  revalidatePath("/admin/videos");
}
