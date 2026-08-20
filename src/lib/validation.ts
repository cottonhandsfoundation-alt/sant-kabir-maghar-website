import { z } from "zod";

// Shared primitives -----------------------------------------------------

const indianMobile = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number");

const email = z.string().trim().email("Enter a valid email address").max(254);

const name = z.string().trim().min(2, "Name is too short").max(120);

// Donation ----------------------------------------------------------------

export const DONATION_PRESET_AMOUNTS = [501, 1001, 2501, 5001, 11001] as const;

export const createDonationOrderSchema = z.object({
  donorName: name,
  email,
  mobile: indianMobile,
  pan: z
    .string()
    .trim()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Enter a valid PAN")
    .optional()
    .or(z.literal("")),
  address: z.string().trim().max(500).optional().or(z.literal("")),
  amount: z
    .number()
    .int()
    .min(100, "Minimum donation amount is ₹100")
    .max(50_00_00_000, "Amount too large — please contact us directly"),
  purposeKey: z.string().trim().min(1).max(60),
  anonymous: z.boolean().default(false),
  isRecurring: z.boolean().default(false),
});

export type CreateDonationOrderInput = z.infer<typeof createDonationOrderSchema>;

export const verifyDonationPaymentSchema = z.object({
  donationId: z.string().min(1),
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

// Contact / enquiry ---------------------------------------------------------

export const contactEnquirySchema = z.object({
  type: z.enum(["GENERAL", "VISIT", "DONATION", "VOLUNTEER"]).default("GENERAL"),
  name,
  email,
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please write a slightly longer message").max(4000),
  // honeypot field — real users never fill this; bots often do
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ContactEnquiryInput = z.infer<typeof contactEnquirySchema>;

// Volunteer -----------------------------------------------------------------

export const volunteerApplicationSchema = z.object({
  name,
  mobile: indianMobile,
  email,
  city: z.string().trim().min(2).max(100),
  areaOfInterest: z.string().trim().min(2).max(200),
  availability: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type VolunteerApplicationInput = z.infer<typeof volunteerApplicationSchema>;

// Newsletter ------------------------------------------------------------------

export const newsletterSubscribeSchema = z.object({
  name: z.string().trim().max(120).optional().or(z.literal("")),
  email,
  consent: z.boolean().refine((v) => v === true, "Consent is required to subscribe"),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type NewsletterSubscribeInput = z.infer<typeof newsletterSubscribeSchema>;

// Admin auth ------------------------------------------------------------------

export const adminLoginSchema = z.object({
  email,
  password: z.string().min(8).max(200),
});

// Admin CRUD: Event -------------------------------------------------------

export const EVENT_CATEGORIES = [
  "SATSANG",
  "PRAVACHAN",
  "GURU_PURNIMA",
  "KABIR_JAYANTI",
  "KABIR_MAHOTSAV",
  "NIRVAN_DIWAS",
  "BHANDARA",
  "SAMAJIK_SEVA",
  "ANTARDHARMIK_SADBHAV",
  "OTHER",
] as const;

export const eventInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens only")
    .max(150),
  titleEn: z.string().trim().min(2).max(200),
  titleHi: z.string().trim().min(2).max(200),
  descriptionEn: z.string().trim().min(2).max(10000),
  descriptionHi: z.string().trim().min(2).max(10000),
  category: z.enum(EVENT_CATEGORIES),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
  venueEn: z.string().trim().max(300).optional().or(z.literal("")),
  venueHi: z.string().trim().max(300).optional().or(z.literal("")),
  bannerImage: z.string().trim().max(1000).optional().or(z.literal("")),
  registrationUrl: z.string().trim().url().max(1000).optional().or(z.literal("")),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  isDemo: z.boolean().default(false),
});

export type EventInput = z.infer<typeof eventInputSchema>;

// Admin CRUD: Media / Video -------------------------------------------------

export const MEDIA_CATEGORIES = [
  "EVENTS",
  "MAHANT_JI",
  "MAGHAR",
  "SANT_KABIR",
  "GENERAL",
] as const;

export const mediaAssetInputSchema = z.object({
  type: z.enum(["IMAGE", "VIDEO"]),
  url: z.string().trim().min(1).max(1000),
  thumbnailUrl: z.string().trim().max(1000).optional().or(z.literal("")),
  captionEn: z.string().trim().max(300).optional().or(z.literal("")),
  captionHi: z.string().trim().max(300).optional().or(z.literal("")),
  category: z.enum(MEDIA_CATEGORIES),
  eventId: z.string().trim().optional().or(z.literal("")),
  sourceUrl: z.string().trim().max(1000).optional().or(z.literal("")),
  creator: z.string().trim().max(200).optional().or(z.literal("")),
  license: z.string().trim().max(100).optional().or(z.literal("")),
  attributionRequired: z.boolean().default(false),
  attributionText: z.string().trim().max(400).optional().or(z.literal("")),
  published: z.boolean().default(true),
});

export const videoInputSchema = z.object({
  titleEn: z.string().trim().min(2).max(200),
  titleHi: z.string().trim().min(2).max(200),
  youtubeId: z.string().trim().min(5).max(50),
  category: z.enum(["SATSANG", "PRAVACHAN", "EVENT", "MESSAGE"]),
  descriptionEn: z.string().trim().max(2000).optional().or(z.literal("")),
  descriptionHi: z.string().trim().max(2000).optional().or(z.literal("")),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

// Admin CRUD: Message / Pravachan --------------------------------------------

export const messageInputSchema = z.object({
  titleEn: z.string().trim().min(2).max(200),
  titleHi: z.string().trim().min(2).max(200),
  bodyEn: z.string().trim().min(2).max(20000),
  bodyHi: z.string().trim().min(2).max(20000),
  category: z.enum(["MESSAGE", "PRAVACHAN", "ANNOUNCEMENT"]),
  coverImage: z.string().trim().max(1000).optional().or(z.literal("")),
  videoUrl: z.string().trim().max(1000).optional().or(z.literal("")),
  eventDate: z.coerce.date().optional().nullable(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
});

// Admin CRUD: Doha -----------------------------------------------------------

export const DOHA_THEMES = [
  "guru",
  "prem",
  "satya",
  "ahankar",
  "manavta",
  "bhakti",
  "karma",
  "jaati",
  "dharma",
  "maya",
  "atmagyan",
] as const;

export const dohaInputSchema = z.object({
  hindiText: z.string().trim().min(2).max(1000),
  meaningHindi: z.string().trim().min(2).max(2000),
  meaningEnglish: z.string().trim().min(2).max(2000),
  theme: z.enum(DOHA_THEMES),
  audioUrl: z.string().trim().max(1000).optional().or(z.literal("")),
  published: z.boolean().default(true),
});

// Admin: Donation purpose -----------------------------------------------------

export const donationPurposeInputSchema = z.object({
  key: z
    .string()
    .trim()
    .regex(/^[a-z0-9_-]+$/)
    .max(60),
  labelEn: z.string().trim().min(2).max(150),
  labelHi: z.string().trim().min(2).max(150),
  active: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

// Admin: Testimonial ----------------------------------------------------------

export const testimonialInputSchema = z.object({
  name: z.string().trim().min(2).max(150),
  roleEn: z.string().trim().max(150).optional().or(z.literal("")),
  roleHi: z.string().trim().max(150).optional().or(z.literal("")),
  messageEn: z.string().trim().min(2).max(2000),
  messageHi: z.string().trim().min(2).max(2000),
  published: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

// Admin: site settings ----------------------------------------------------

export const siteSettingSchema = z.object({
  key: z.string().trim().min(1).max(100),
  value: z.string().max(20000),
});
