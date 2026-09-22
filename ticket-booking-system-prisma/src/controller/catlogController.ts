import type { Request, Response, NextFunction } from "express";

export async function Controller(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {
        next(e)
    }
}