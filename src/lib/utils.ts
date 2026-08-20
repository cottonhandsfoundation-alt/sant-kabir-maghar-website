import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date | string, locale: string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatDateTime(date: Date | string, locale: string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

export function pick<T>(locale: string, hi: T, en: T): T {
  return locale === "hi" ? hi : en;
}

// Only these hosts are configured in next.config.ts remotePatterns, so only
// they can safely use next/image — admin-entered MediaAsset/Video URLs can
// point anywhere, and next/image throws at runtime for an unlisted host.
const NEXT_IMAGE_HOSTS = new Set(["upload.wikimedia.org", "i.ytimg.com"]);

export function canUseNextImage(url: string): boolean {
  try {
    return NEXT_IMAGE_HOSTS.has(new URL(url).hostname);
  } catch {
    return false;
  }
}
