import type { Request, Response, NextFunction } from "express";
import { getWalletService, topUpWalletService } from "./services/walletService";

export async function topUpWalletController(req: Request, res: Response, next: NextFunction) {
    try {
        const amount = req.body
        const userId = req.userId
        const wallet = await topUpWalletService(userId, amount)
        res.status(200).json({
            success: true,
            message: "Wallet topup succeessful",
            data: [{
                newbalance: wallet.walletBalanceCents
            }]
        })
    } catch (e) {
        next(e)
    }
}
export async function getWalletController(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(400).json({
                succss: false,
                message: "Unauthorized",
                data: []
            })
        }
        const wallet = await getWalletService(userId)
        if (!wallet) {
            return res.status(404).json({
                success: false,
                message: "Wallet not found",
                data: []
            })
        }
        res.status(200).json({
            success: true,
            message: "Below is your wallet balance",
            data: [{
                walletBalance: wallet.walletBalanceCents
            }]
        })
    } catch (e) {
        next(e)
    }
}