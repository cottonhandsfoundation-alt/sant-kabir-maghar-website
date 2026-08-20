import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Prisma 7 requires an explicit driver adapter at runtime. Swapping to
// PostgreSQL in production only requires changing this file (see README.md
// "Switching to PostgreSQL for production") — nothing else in the app
// touches the adapter directly, it always imports `prisma` from here.
function createAdapter() {
  const url = process.env.DATABASE_URL ?? "file:./dev.db";
  return new PrismaBetterSqlite3({ url });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: createAdapter(),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
