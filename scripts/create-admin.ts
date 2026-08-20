/**
 * Interactive CLI to create (or promote) an admin user without going through
 * the /admin UI — useful for the very first Super Admin, or for recovering
 * access if every account gets locked out. Run with: npm run create-admin
 */
import "dotenv/config";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" }),
});

const ROLES = ["SUPER_ADMIN", "CONTENT_MANAGER", "DONATION_MANAGER", "EVENT_MANAGER"];

async function main() {
  const rl = createInterface({ input: stdin, output: stdout });

  const name = await rl.question("Full name: ");
  const email = (await rl.question("Email: ")).trim().toLowerCase();
  const password = await rl.question("Password (min 8 characters): ");
  const roleInput = await rl.question(
    `Role [${ROLES.join(" / ")}] (default SUPER_ADMIN): `
  );
  rl.close();

  const role = ROLES.includes(roleInput.trim()) ? roleInput.trim() : "SUPER_ADMIN";

  if (!name || !email || password.length < 8) {
    console.error("Name, email and an 8+ character password are all required.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { name, passwordHash, role, active: true },
    create: { name, email, passwordHash, role, active: true },
  });

  console.log(`\nAdmin account ready: ${user.email} (${user.role})`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
