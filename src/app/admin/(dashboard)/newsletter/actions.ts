"use server";

import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

const CONTENT_ROLES = ["SUPER_ADMIN", "CONTENT_MANAGER"];

/**
 * Manual unsubscribe — for handling e.g. a phone/email opt-out request that
 * didn't come through the self-serve unsubscribe link.
 */
export async function manuallyUnsubscribe(formData: FormData) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");
  if (!CONTENT_ROLES.includes(session.role)) {
    throw new Error("Forbidden: your role does not have access to this action.");
  }

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing subscriber id.");

  await prisma.newsletterSubscriber.update({
    where: { id },
    data: { status: "UNSUBSCRIBED", unsubscribedAt: new Date() },
  });

  revalidatePath("/admin/newsletter");
}
