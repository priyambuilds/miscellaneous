import { prisma } from "../../src/db";

export async function resetDb() {
    // Safety check. Never wipe a db that isnt clearly a test db
    if (!process.env.DATABASE_URL?.includes("_test")) {
        throw new Error("Refusing to reset: Database url is not a test db url")
    }

    // Order matters
    // The delete order is required by the foreign keys. Postgres refuses to delete a user while messages still point at them.
    await prisma.message.deleteMany();
    await prisma.room.deleteMany();
    await prisma.user.deleteMany();
}