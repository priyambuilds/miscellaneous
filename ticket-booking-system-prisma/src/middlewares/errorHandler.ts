import type { NextFunction, Request, Response } from "express"

export function errorHandler( req: Request, res: Response, next: NextFunction) {
    return res.status(500).json({
        success: false,
        message: "Internal server error",
        data: [],
    })
}
