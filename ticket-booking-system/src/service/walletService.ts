import mongoose from "mongoose";
import { TransactionModel, WalletModel } from "../models";
import { toCents } from '../helpers/cents';

export async function addAmountToWallet(
    userId: string,
    amountInCents: number,
    idempotencyKey: string
) {
    const session = await mongoose.startSession();
    
    try {
        return await session.withTransaction(async () => {
            const existingTransaction = await TransactionModel.findOne({
                idempotencyKey
            }).session(session);

            if (existingTransaction) {
                return existingTransaction
            }


            const wallet = await WalletModel.findOneAndUpdate(
                { userId },
                {
                    $inc: {
                        amountInCents
                    }
                },
                {
                    new: false,
                    upsert: true,
                    session
                }
            );

            const walletAmountBeforeInCents = wallet?.amountInCents ?? 0;
            const walletAmountAfterInCents = walletAmountBeforeInCents + amountInCents

            const transaction = await TransactionModel.create([{
                userId,
                type: "topup",
                amountInCents,
                walletAmountBeforeInCents,
                walletAmountAfterInCents,
                idempotencyKey,
                status: "completed",
            }], { session });
            
            return transaction
        })
    } finally {
        await session.endSession();
    }
}