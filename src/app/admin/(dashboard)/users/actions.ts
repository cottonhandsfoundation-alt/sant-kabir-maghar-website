"use server";

import { revalidatePath } from "next/cache";
import { hashPassword, requireAdmin } from "@/lib/auth";
import type { AdminRole } from "@/lib/auth";
import { prisma } from "@/lib/db";

export type CreateAdminUserState = { success?: boolean; error?: string } | undefined;

const VALID_ROLES: AdminRole[] = [
  "SUPER_ADMIN",
  "CONTENT_MANAGER",
  "DONATION_MANAGER",
  "EVENT_MANAGER",
];

export async function createAdminUser(
  prevState: CreateAdminUserState,
  formData: FormData
): Promise<CreateAdminUserState> {
  const session = await requireAdmin(["SUPER_ADMIN"]);
  if (!session) {
    return { error: "You do not have permission to create admin users." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "CONTENT_MANAGER") as AdminRole;

  if (!name || name.length < 2) return { error: "Enter a valid name." };
  if (!email || !email.includes("@")) return { error: "Enter a valid email address." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (!VALID_ROLES.includes(role)) return { error: "Invalid role." };

  try {
    const passwordHash = await hashPassword(password);
    await prisma.adminUser.create({ data: { name, email, passwordHash, role } });
  } catch (err: unknown) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "P2002") {
      return { error: "An admin user with this email already exists." };
    }
    return { error: "Could not create admin user." };
  }

  revalidatePath("/admin/users");
  return { success: true };
}

/** Toggles an admin user's active flag. Called directly (not via a <form>)
 * from the client UserRowActions component, so errors are surfaced to the
 * caller via a thrown Error rather than a return value. */
export async function toggleUserActive(userId: string) {
  const session = await requireAdmin(["SUPER_ADMIN"]);
  if (!session) throw new Error("You do not have permission to do this.");

  const user = await prisma.adminUser.findUnique({ where: { id: userId } });
  if (!user) throw new Error("Admin user not found.");

  if (userId === session.sub && user.active) {
    throw new Error("You cannot deactivate your own account.");
  }

  await prisma.adminUser.update({ where: { id: userId }, data: { active: !user.active } });
  revalidatePath("/admin/users");
}

/** Changes an admin user's role. Same direct-call pattern as toggleUserActive. */
export async function updateUserRole(userId: string, role: string) {
  const session = await requireAdmin(["SUPER_ADMIN"]);
  if (!session) throw new Error("You do not have permission to do this.");
  if (!VALID_ROLES.includes(role as AdminRole)) throw new Error("Invalid role.");

  await prisma.adminUser.update({ where: { id: userId }, data: { role } });
  revalidatePath("/admin/users");
}
