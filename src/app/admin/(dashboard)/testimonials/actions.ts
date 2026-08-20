"use server";

import { getAdminSession, type AdminRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { testimonialInputSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ALLOWED_ROLES: AdminRole[] = ["SUPER_ADMIN", "CONTENT_MANAGER"];

async function requireContentManager() {
  const session = await getAdminSession();
  if (!session || !ALLOWED_ROLES.includes(session.role)) {
    throw new Error("Unauthorized: your role does not have access to Testimonials.");
  }
  return session;
}

function readTestimonialForm(formData: FormData) {
  const sortOrderRaw = formData.get("sortOrder");
  const sortOrder = sortOrderRaw ? parseInt(sortOrderRaw as string, 10) : 0;
  return testimonialInputSchema.parse({
    name: formData.get("name") ?? "",
    roleEn: formData.get("roleEn") ?? "",
    roleHi: formData.get("roleHi") ?? "",
    messageEn: formData.get("messageEn") ?? "",
    messageHi: formData.get("messageHi") ?? "",
    published: formData.get("published") === "on",
    sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder,
  });
}

export async function createTestimonial(formData: FormData) {
  await requireContentManager();
  const data = readTestimonialForm(formData);

  await prisma.testimonial.create({
    data: {
      ...data,
      roleEn: data.roleEn || null,
      roleHi: data.roleHi || null,
    },
  });

  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireContentManager();
  const data = readTestimonialForm(formData);

  await prisma.testimonial.update({
    where: { id },
    data: {
      ...data,
      roleEn: data.roleEn || null,
      roleHi: data.roleHi || null,
    },
  });

  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await requireContentManager();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
}

export async function toggleTestimonialPublished(id: string) {
  await requireContentManager();
  const row = await prisma.testimonial.findUnique({ where: { id }, select: { published: true } });
  if (!row) return;
  await prisma.testimonial.update({ where: { id }, data: { published: !row.published } });
  revalidatePath("/admin/testimonials");
}
