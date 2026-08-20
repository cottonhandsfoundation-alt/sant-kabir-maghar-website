"use server";

import { getAdminSession, type AdminRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { messageInputSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ALLOWED_ROLES: AdminRole[] = ["SUPER_ADMIN", "CONTENT_MANAGER"];

async function requireContentManager() {
  const session = await getAdminSession();
  if (!session || !ALLOWED_ROLES.includes(session.role)) {
    throw new Error("Unauthorized: your role does not have access to Messages.");
  }
  return session;
}

function readMessageForm(formData: FormData) {
  const eventDateRaw = (formData.get("eventDate") as string) ?? "";
  return messageInputSchema.parse({
    titleEn: formData.get("titleEn") ?? "",
    titleHi: formData.get("titleHi") ?? "",
    bodyEn: formData.get("bodyEn") ?? "",
    bodyHi: formData.get("bodyHi") ?? "",
    category: formData.get("category") ?? "",
    coverImage: formData.get("coverImage") ?? "",
    videoUrl: formData.get("videoUrl") ?? "",
    eventDate: eventDateRaw === "" ? null : eventDateRaw,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  });
}

export async function createMessage(formData: FormData) {
  const session = await requireContentManager();
  const data = readMessageForm(formData);

  await prisma.message.create({
    data: {
      ...data,
      coverImage: data.coverImage || null,
      videoUrl: data.videoUrl || null,
      createdById: session.sub,
    },
  });

  revalidatePath("/admin/messages");
  redirect("/admin/messages");
}

export async function updateMessage(id: string, formData: FormData) {
  await requireContentManager();
  const data = readMessageForm(formData);

  await prisma.message.update({
    where: { id },
    data: {
      ...data,
      coverImage: data.coverImage || null,
      videoUrl: data.videoUrl || null,
    },
  });

  revalidatePath("/admin/messages");
  redirect("/admin/messages");
}

export async function deleteMessage(id: string) {
  await requireContentManager();
  await prisma.message.delete({ where: { id } });
  revalidatePath("/admin/messages");
}

export async function toggleMessagePublished(id: string) {
  await requireContentManager();
  const row = await prisma.message.findUnique({ where: { id }, select: { published: true } });
  if (!row) return;
  await prisma.message.update({ where: { id }, data: { published: !row.published } });
  revalidatePath("/admin/messages");
}
