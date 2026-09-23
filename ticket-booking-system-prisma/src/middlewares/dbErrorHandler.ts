import type { Request, Response, NextFunction } from "express"
import { Prisma } from "../../generated/prisma/client.ts"

export function databaseErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // Unique constraint violation (e.g., duplicate email or double booking)
        if (err.code === "P2002") {
            const target = (err.meta?.target as string[])?.join(", ") || "field"
            return res.status(409).json({ error: `Conflict: This ${target} is already in use.` })
        }

        // Foreign key constraint violation (e.g., invalid userId)
        if (err.code === "P2003") {
            const field = err.meta?.field_name || "relation"
            return res.status(400).json({ error: `Invalid Reference: The ${field} provided does not exist.` })
        }

        // Record not found
        if (err.code === "P2025") {
            return res.status(404).json({ error: "The requested resource was not found." })
        }
    }

    // Fallback for non-Prisma or unhandled errors
    next(err)
}
