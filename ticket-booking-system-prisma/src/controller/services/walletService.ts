import { TransactionStatus, TransactionType, UserRole } from "../../../generated/prisma/enums"
import {prisma} from "../../../prisma/index.ts"

export async function topUpWalletService(userId: string, amount: number) {
    return prisma.$transaction(async (tx) => {
        const user = await tx.user.findUniqueOrThrow({
            where: { id: userId },
            select: {walletBalanceCents: true}
        })
        const amountAfterCents = user.walletBalanceCents + amount
        
        const updatedUser = await tx.user.update({
            where: { id: userId },
            data: {
                walletBalanceCents: amountAfterCents
            }
        })
        await tx.transaction.create({
            data: {
                userId,
                type: TransactionType.TOP_UP,
                amountCents: amount,
                amountBeforeCents: user.walletBalanceCents,
                amountAfterCents,
                status: TransactionStatus.SUCCESS
            }
        })
        return updatedUser;
    })
}
export async function getWalletService(userId: string) {
    return prisma.user.findFirst({
        where: { id: userId },
    })
}