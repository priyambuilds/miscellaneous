import type { Request, Response, NextFunction } from "express";

export function isAdminMiddleware(req: Request, res: Response, next: NextFunction) {
    const role = req.role
    if (role !== "ADMIN") {
        return res.status(400).json({
            success: false,
            message: "Unauthorized, you are not an admin",
            data: []
        })
    }
    
    next()
}