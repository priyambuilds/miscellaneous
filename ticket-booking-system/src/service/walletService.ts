import mongoose from "mongoose";
import { TransactionModel, WalletModel } from "../models";
import { toCents } from '../helpers/cents';

export async function addAmountToWallet(
    userId: string,
    amountInCents: number,
) {
    const session = await mongoose.startSession();
    
    try {
        return await session.withTransaction(async () => {
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
                status: "completed",
            }], { session });
            
            return transaction
        })
    } finally {
        await session.endSession();
    }
}