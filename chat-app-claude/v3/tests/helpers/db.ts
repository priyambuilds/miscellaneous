import { prisma } from "../../src/db";
import { redis } from "../../src/redis";

export async function resetDb() {
  if (!process.env.DATABASE_URL?.includes("_test")) {
    throw new Error("Refusing to reset: DATABASE_URL is not a test database");
  }
  if (!process.env.REDIS_URL?.endsWith("/1")) {
    throw new Error("Refusing to reset: REDIS_URL is not the test Redis database (/1)");
  }

  await prisma.message.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();

  await redis.flushdb(); // wipes ONLY database 1, not the dev data in 0
}