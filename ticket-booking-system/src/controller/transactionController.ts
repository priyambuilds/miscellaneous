import { type Request, type Response } from 'express';
import { TransactionModel } from '../models';
export async function getTransactionController (req: Request, res: Response) {
    const userId = req.userId;
    const role = req.role;

    try {
        if (role === "user") {
            const transactions = await TransactionModel.findOne({userId});
            if (!transactions) {
                return res.status(400).json({
                    success: false,
                    message: "You have no transactions yet",
                    data: []
                })
            }
            return res.status(200).json({
                success: true,
                message: "Below are all your transactions",
                data: [{transactions}]
            })
        } else {
            const transactions = await TransactionModel.find({});
             return res.status(200).json({
                success: true,
                message: "Below are all the transactions",
                data: [{transactions}]
            })
        }
    } catch {
        return res.status(500).json({
            success: true,
            message: "Internal server error",
            data: []
        })
    }
}