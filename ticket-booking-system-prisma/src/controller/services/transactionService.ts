import { prisma } from "../../../prisma/index.ts"

export async function getTransactionService(userId: string, role: string) {
    if (role === "ADMIN") {
        return prisma.transaction.findMany({})
    } else {
        return prisma.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        })
    }
}
