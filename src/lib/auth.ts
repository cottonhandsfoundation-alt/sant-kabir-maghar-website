import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { randomBytes, createHash } from "node:crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export const ADMIN_SESSION_COOKIE = "sk_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

export type AdminRole =
  | "SUPER_ADMIN"
  | "CONTENT_MANAGER"
  | "DONATION_MANAGER"
  | "EVENT_MANAGER";

export type AdminSessionPayload = {
  sub: string; // AdminUser.id
  email: string;
  role: AdminRole;
  sid: string; // AdminSession.id, for revocation checks
};

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "AUTH_SECRET is not set or too short. Set a long random value in .env (see .env.example)."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Creates a DB-backed session (so it can be revoked) plus a signed JWT
 * that references it. The JWT alone proves possession; the DB row lets an
 * admin be force-logged-out (e.g. account disabled) without waiting for
 * token expiry.
 */
export async function createAdminSession(
  user: { id: string; email: string; role: string },
  meta: { userAgent?: string | null; ipAddress?: string | null }
) {
  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000);

  const session = await prisma.adminSession.create({
    data: {
      userId: user.id,
      tokenHash,
      userAgent: meta.userAgent ?? undefined,
      ipAddress: meta.ipAddress ?? undefined,
      expiresAt,
    },
  });

  const jwt = await new SignJWT({
    email: user.email,
    role: user.role,
    sid: session.id,
    tok: tokenHash,
  } satisfies Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });

  return session;
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  cookieStore.delete(ADMIN_SESSION_COOKIE);

  if (!token) return;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    const sid = payload.sid as string | undefined;
    if (sid) {
      await prisma.adminSession.delete({ where: { id: sid } }).catch(() => {});
    }
  } catch {
    // token already invalid — nothing to clean up
  }
}

/**
 * Verifies the session cookie's signature/expiry AND that the referenced
 * session row still exists and hasn't expired server-side. Returns null for
 * any failure — callers must treat null as "not authenticated".
 */
export async function getAdminSession(): Promise<
  (AdminSessionPayload & { userActive: boolean }) | null
> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    const sid = payload.sid as string;
    const session = await prisma.adminSession.findUnique({
      where: { id: sid },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) return null;
    if (session.tokenHash !== payload.tok) return null;
    if (!session.user.active) return null;

    return {
      sub: session.user.id,
      email: session.user.email,
      role: session.user.role as AdminRole,
      sid: session.id,
      userActive: session.user.active,
    };
  } catch {
    return null;
  }
}

export async function requireAdmin(allowedRoles?: AdminRole[]) {
  const session = await getAdminSession();
  if (!session) return null;
  if (allowedRoles && !allowedRoles.includes(session.role)) return null;
  return session;
}

/** Simple in-memory rate limiter for login attempts (per-process; fine for a
 * single-instance deployment — swap for a shared store like Redis if you
 * scale to multiple instances). */
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const LOGIN_MAX_ATTEMPTS = 8;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export function checkLoginRateLimit(key: string) {
  const now = Date.now();
  const entry = loginAttempts.get(key);
  if (!entry || entry.resetAt < now) {
    loginAttempts.set(key, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return { allowed: true, remaining: LOGIN_MAX_ATTEMPTS - 1 };
  }
  if (entry.count >= LOGIN_MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0 };
  }
  entry.count += 1;
  return { allowed: true, remaining: LOGIN_MAX_ATTEMPTS - entry.count };
}
