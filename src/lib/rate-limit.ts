import "server-only";

/**
 * Minimal in-memory sliding-window rate limiter for public form endpoints
 * (contact, volunteer, newsletter, donation order creation). Per-process —
 * sufficient for a single-instance deployment; swap for Redis if you run
 * multiple instances behind a load balancer.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  { max, windowMs }: { max: number; windowMs: number }
) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1 };
  }

  if (entry.count >= max) {
    return { allowed: false, remaining: 0, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { allowed: true, remaining: max - entry.count };
}

export function getClientIp(headers: Headers) {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
