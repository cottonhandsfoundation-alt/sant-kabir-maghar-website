"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { adminLoginSchema } from "@/lib/validation";
import {
  checkLoginRateLimit,
  createAdminSession,
  verifyPassword,
} from "@/lib/auth";

export type AdminLoginState = { error: string } | undefined;

export async function adminLogin(
  prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const raw = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  const parsed = adminLoginSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: "Enter a valid email and password." };
  }
  const { email, password } = parsed.data;

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const userAgent = headersList.get("user-agent");

  // Rate-limit both by the submitted email and by IP so an attacker can't
  // dodge the limit just by rotating the email field (or vice versa).
  const emailLimit = checkLoginRateLimit(`login:${email}`);
  const ipLimit = checkLoginRateLimit(`login-ip:${ip}`);
  if (!emailLimit.allowed || !ipLimit.allowed) {
    return { error: "Too many login attempts. Please try again later." };
  }

  const genericError = { error: "Invalid email or password." };

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user || !user.active) {
    return genericError;
  }

  const validPassword = await verifyPassword(password, user.passwordHash);
  if (!validPassword) {
    return genericError;
  }

  await createAdminSession(
    { id: user.id, email: user.email, role: user.role },
    { userAgent, ipAddress: ip }
  );

  await prisma.adminUser.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  redirect("/admin");
}
