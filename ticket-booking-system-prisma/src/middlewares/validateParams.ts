import type { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";

export function validateParams(schema: ZodObject<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: ["Invalid query params", result.error],
                data: []
            })
        }
        next()
    }
}