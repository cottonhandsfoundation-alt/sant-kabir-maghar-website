"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import {
  contactEnquirySchema,
  volunteerApplicationSchema,
  newsletterSubscribeSchema,
} from "@/lib/validation";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/** Escapes user-supplied text before it is interpolated into an HTML email body. */
function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formDataToObject(formData: FormData): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      obj[key] = value;
    }
  }
  return obj;
}

function notificationRow(label: string, value?: string | null) {
  if (!value) return "";
  return `<tr><td style="padding:4px 12px 4px 0;color:#7a6a55;">${escapeHtml(label)}</td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`;
}

async function notify(subject: string, rows: string) {
  const to = process.env.NOTIFICATIONS_TO_EMAIL;
  if (!to) return;
  const html = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2a2118;">
      <h2 style="color:#a8511f;">${escapeHtml(subject)}</h2>
      <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
        ${rows}
      </table>
    </div>
  `;
  await sendEmail({ to, subject, html });
}

// ---------------------------------------------------------------------------
// Contact enquiry
// ---------------------------------------------------------------------------

export async function submitContactEnquiry(formData: FormData) {
  const ip = getClientIp(await headers());
  const { allowed } = rateLimit(`contact:${ip}`, { max: 5, windowMs: 10 * 60 * 1000 });
  if (!allowed) {
    return { ok: false as const, errors: { _form: ["Too many requests, please try again later."] } };
  }

  const raw = formDataToObject(formData);
  const parsed = contactEnquirySchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, errors: z.flattenError(parsed.error) };
  }

  const { type, name, email, phone, subject, message } = parsed.data;

  await prisma.contactEnquiry.create({
    data: {
      type,
      name,
      email,
      phone: phone || null,
      subject: subject || null,
      message,
    },
  });

  await notify(
    `New contact enquiry: ${subject || type}`,
    [
      notificationRow("Type", type),
      notificationRow("Name", name),
      notificationRow("Email", email),
      notificationRow("Phone", phone),
      notificationRow("Subject", subject),
      notificationRow("Message", message),
    ].join("")
  );

  return { ok: true as const };
}

// ---------------------------------------------------------------------------
// Volunteer application
// ---------------------------------------------------------------------------

export async function submitVolunteerApplication(formData: FormData) {
  const ip = getClientIp(await headers());
  const { allowed } = rateLimit(`volunteer:${ip}`, { max: 5, windowMs: 10 * 60 * 1000 });
  if (!allowed) {
    return { ok: false as const, errors: { _form: ["Too many requests, please try again later."] } };
  }

  const raw = formDataToObject(formData);
  const parsed = volunteerApplicationSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, errors: z.flattenError(parsed.error) };
  }

  const { name, mobile, email, city, areaOfInterest, availability, message } = parsed.data;

  await prisma.volunteerApplication.create({
    data: {
      name,
      mobile,
      email,
      city,
      areaOfInterest,
      availability: availability || null,
      message: message || null,
    },
  });

  await notify(
    `New volunteer application: ${name}`,
    [
      notificationRow("Name", name),
      notificationRow("Mobile", mobile),
      notificationRow("Email", email),
      notificationRow("City", city),
      notificationRow("Area of interest", areaOfInterest),
      notificationRow("Availability", availability),
      notificationRow("Message", message),
    ].join("")
  );

  return { ok: true as const };
}

// ---------------------------------------------------------------------------
// Newsletter subscription
// ---------------------------------------------------------------------------

export async function subscribeNewsletter(formData: FormData) {
  const ip = getClientIp(await headers());
  const { allowed } = rateLimit(`newsletter:${ip}`, { max: 10, windowMs: 10 * 60 * 1000 });
  if (!allowed) {
    return { ok: false as const, errors: { _form: ["Too many requests, please try again later."] } };
  }

  const raw: Record<string, unknown> = formDataToObject(formData);
  // Checkbox inputs only appear in FormData when checked; normalise to boolean.
  raw.consent = formData.get("consent") === "on" || formData.get("consent") === "true";

  const parsed = newsletterSubscribeSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, errors: z.flattenError(parsed.error) };
  }

  const { name, email } = parsed.data;

  const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });

  if (existing) {
    if (existing.status === "UNSUBSCRIBED") {
      await prisma.newsletterSubscriber.update({
        where: { email },
        data: { status: "ACTIVE", unsubscribedAt: null, name: name || existing.name },
      });
    }
    // Already active: treat as success, idempotent, no duplicate.
  } else {
    await prisma.newsletterSubscriber.create({
      data: {
        name: name || null,
        email,
        consent: true,
        status: "ACTIVE",
        unsubscribeToken: randomBytes(24).toString("hex"),
      },
    });
  }

  await notify(
    `New newsletter subscriber: ${email}`,
    [notificationRow("Name", name), notificationRow("Email", email)].join("")
  );

  return { ok: true as const };
}
