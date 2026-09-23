import type { Request, Response, NextFunction } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            userId: string
            role: string
        }
    }
}

const secret = process.env.SECRET
if (!secret) {
    throw new Error("jwt secret not provided")
}

export async function authMiddleWare(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({
            success: false,
            message: "Malformed token",
            data: [],
        })
    }
    const token = authHeader?.split(" ")[1]

    if (!token || typeof token !== "string") {
        return res.status(400).json({
            succes: false,
            message: "Malformed token",
            data: [],
        })
    }

    try {
        const decoded = jwt.verify(token, secret!) as JwtPayload
        if (!decoded.userId || !decoded.role) {
            return res.status(400).json({
                succes: false,
                message: "Malformed token",
                data: [],
            })
        }

        req.userId = decoded.userId
        req.role = decoded.role

        res.status(200).json({
            result: true,
            message: "Below is your token",
            data: [{ token }],
        })
        next()
    } catch {
        return res.status(500).json({
            result: false,
            message: "Internal server error",
            data: [],
        })
    }
}
