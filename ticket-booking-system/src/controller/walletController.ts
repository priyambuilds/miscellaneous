import { type Request, type Response } from 'express';
import { WalletModel } from '../models';
import { walletSchema } from '../types';
import { addAmountToWallet } from '../service/walletService';
export async function addWalletController(req: Request, res: Response) {
    try {
        const parsedData = walletSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                success: true,
                message: parsedData.error,
                data: []
            })
        }
        const userId = req.userId
        const { amountInCents } = parsedData.data

        const addAmount = await addAmountToWallet(
            userId,
            amountInCents,
            req.headers["idempotency-key"] as string
        )
        return res.status(200).json({
            success: true,
            message: "Amount added to the wallet successfully",
            data: [{ addAmount }]
        })
    } catch {
        return res.status(400).json({
            success: false,
            message: "Server side error",
            data: []
        })
    }
    
}
export async function getWalletController(req: Request, res: Response) {
    const userId = req.userId
    const wallet = WalletModel.findById(userId)
     if (!wallet) {
        return res.status(400).json({
            success: false,
            message: "You have no bookings",
            data: []
        })
    }
    return res.status(200).json({
        success: true,
        message: "Below are your bookings",
        data: [{wallet}]
    })
}