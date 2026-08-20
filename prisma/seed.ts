/**
 * Idempotent seed script — safe to re-run. Populates:
 *  - Donation purposes (configurable, editable later from /admin/donation-purposes)
 *  - The doha library (from src/content/dohas.ts, the single source of truth)
 *  - One clearly-marked DEMO event and DEMO testimonial, per project instructions
 *    ("DEMO EVENT — REMOVE BEFORE PRODUCTION")
 *  - The initial Super Admin account, from INITIAL_ADMIN_EMAIL / INITIAL_ADMIN_PASSWORD
 *
 * Run with: npm run db:seed
 */
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import { DOHAS } from "../src/content/dohas";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" }),
});

const DONATION_PURPOSES = [
  { key: "general_seva", labelEn: "General Seva", labelHi: "सामान्य सेवा", sortOrder: 0 },
  { key: "annadaan", labelEn: "Annadaan (Food Offering)", labelHi: "अन्नदान", sortOrder: 1 },
  { key: "bhandara", labelEn: "Bhandara", labelHi: "भंडारा", sortOrder: 2 },
  { key: "religious_activities", labelEn: "Religious Activities", labelHi: "धार्मिक कार्यक्रम", sortOrder: 3 },
  { key: "education", labelEn: "Education", labelHi: "शिक्षा", sortOrder: 4 },
  { key: "medical_assistance", labelEn: "Medical Assistance", labelHi: "चिकित्सा सहायता", sortOrder: 5 },
  { key: "social_service", labelEn: "Social Service", labelHi: "सामाजिक सेवा", sortOrder: 6 },
  { key: "ashram_development", labelEn: "Ashram / Institution Development", labelHi: "आश्रम / संस्था विकास", sortOrder: 7 },
  { key: "other", labelEn: "Other", labelHi: "अन्य", sortOrder: 8 },
];

async function main() {
  console.log("Seeding donation purposes...");
  for (const purpose of DONATION_PURPOSES) {
    await prisma.donationPurpose.upsert({
      where: { key: purpose.key },
      update: { labelEn: purpose.labelEn, labelHi: purpose.labelHi, sortOrder: purpose.sortOrder },
      create: purpose,
    });
  }

  console.log(`Seeding ${DOHAS.length} dohas...`);
  const existingDohaCount = await prisma.doha.count();
  if (existingDohaCount === 0) {
    await prisma.doha.createMany({
      data: DOHAS.map((d, i) => ({
        hindiText: d.hindiText,
        meaningHindi: d.meaningHindi,
        meaningEnglish: d.meaningEnglish,
        theme: d.theme,
        sortOrder: i,
      })),
    });
  } else {
    console.log("Dohas already seeded, skipping.");
  }

  console.log("Seeding demo event...");
  await prisma.event.upsert({
    where: { slug: "demo-guru-purnima-satsang" },
    update: {},
    create: {
      slug: "demo-guru-purnima-satsang",
      titleEn: "DEMO EVENT — Guru Purnima Satsang",
      titleHi: "डेमो कार्यक्रम — गुरु पूर्णिमा सत्संग",
      descriptionEn:
        "DEMO EVENT — REMOVE BEFORE PRODUCTION. This is placeholder content showing how an event listing will appear. Replace with a real, confirmed event from the admin panel.",
      descriptionHi:
        "डेमो कार्यक्रम — प्रोडक्शन से पहले हटाएं। यह एक उदाहरण सामग्री है जो दिखाती है कि कार्यक्रम सूची कैसी दिखेगी। कृपया व्यवस्थापक पैनल से इसे वास्तविक, पुष्ट कार्यक्रम से बदलें।",
      category: "GURU_PURNIMA",
      startDate: new Date(new Date().getFullYear() + 1, 6, 10, 9, 0),
      venueEn: "Kabir Chaura, Maghar, Sant Kabir Nagar, Uttar Pradesh",
      venueHi: "कबीर चौरा, मगहर, संत कबीर नगर, उत्तर प्रदेश",
      featured: false,
      published: true,
      isDemo: true,
    },
  });

  console.log("Seeding demo testimonial...");
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.create({
      data: {
        name: "DEMO — Sample Devotee",
        roleEn: "DEMO CONTENT",
        roleHi: "डेमो सामग्री",
        messageEn:
          "DEMO TESTIMONIAL — REMOVE BEFORE PRODUCTION. Replace with a real, consented testimonial from the admin panel.",
        messageHi:
          "डेमो प्रशंसापत्र — प्रोडक्शन से पहले हटाएं। कृपया व्यवस्थापक पैनल से वास्तविक, सहमति-प्राप्त प्रशंसापत्र से बदलें।",
        published: false,
        sortOrder: 0,
      },
    });
  }

  const adminEmail = process.env.INITIAL_ADMIN_EMAIL;
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const existingAdmin = await prisma.adminUser.findUnique({ where: { email: adminEmail } });
    if (!existingAdmin) {
      console.log(`Creating initial Super Admin: ${adminEmail}`);
      await prisma.adminUser.create({
        data: {
          name: "Super Admin",
          email: adminEmail,
          passwordHash: await bcrypt.hash(adminPassword, 12),
          role: "SUPER_ADMIN",
          active: true,
        },
      });
    } else {
      console.log("Initial admin already exists, skipping.");
    }
  } else {
    console.warn(
      "INITIAL_ADMIN_EMAIL / INITIAL_ADMIN_PASSWORD not set — no admin account created. Set them in .env and re-run `npm run db:seed`."
    );
  }

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
