import type { Request, Response, NextFunction } from "express";
import { getTransactionService } from "./services/transactionService";

export async function transactionController(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId
        const role = req.role
        const transaction = await getTransactionService(userId, role)
        res.status(200).json({
            success: true,
            message: "Below are all the transactions",
            data: [{transaction}]
        })
    } catch (e) {
        next(e)
    }
}