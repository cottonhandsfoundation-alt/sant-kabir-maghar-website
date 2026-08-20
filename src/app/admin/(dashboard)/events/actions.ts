"use server";

import { getAdminSession, type AdminRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { eventInputSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ALLOWED_ROLES: AdminRole[] = ["SUPER_ADMIN", "EVENT_MANAGER"];

async function requireEventManager() {
  const session = await getAdminSession();
  if (!session || !ALLOWED_ROLES.includes(session.role)) {
    throw new Error("Unauthorized: your role does not have access to Events.");
  }
  return session;
}

function readEventForm(formData: FormData) {
  const endDateRaw = (formData.get("endDate") as string) ?? "";
  return eventInputSchema.parse({
    slug: formData.get("slug") ?? "",
    titleEn: formData.get("titleEn") ?? "",
    titleHi: formData.get("titleHi") ?? "",
    descriptionEn: formData.get("descriptionEn") ?? "",
    descriptionHi: formData.get("descriptionHi") ?? "",
    category: formData.get("category") ?? "",
    startDate: formData.get("startDate") ?? "",
    endDate: endDateRaw === "" ? null : endDateRaw,
    venueEn: formData.get("venueEn") ?? "",
    venueHi: formData.get("venueHi") ?? "",
    bannerImage: formData.get("bannerImage") ?? "",
    registrationUrl: formData.get("registrationUrl") ?? "",
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    isDemo: formData.get("isDemo") === "on",
  });
}

export async function createEvent(formData: FormData) {
  const session = await requireEventManager();
  const data = readEventForm(formData);

  await prisma.event.create({
    data: {
      ...data,
      venueEn: data.venueEn || null,
      venueHi: data.venueHi || null,
      bannerImage: data.bannerImage || null,
      registrationUrl: data.registrationUrl || null,
      createdById: session.sub,
    },
  });

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function updateEvent(id: string, formData: FormData) {
  await requireEventManager();
  const data = readEventForm(formData);

  await prisma.event.update({
    where: { id },
    data: {
      ...data,
      venueEn: data.venueEn || null,
      venueHi: data.venueHi || null,
      bannerImage: data.bannerImage || null,
      registrationUrl: data.registrationUrl || null,
    },
  });

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  await requireEventManager();
  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/events");
}

export async function toggleEventPublished(id: string) {
  await requireEventManager();
  const event = await prisma.event.findUnique({ where: { id }, select: { published: true } });
  if (!event) return;
  await prisma.event.update({ where: { id }, data: { published: !event.published } });
  revalidatePath("/admin/events");
}
