import jwt, {type JwtPayload} from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            userId: string,
            role: string
        }
    }
}

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
}

export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const requestHeader = req.headers.authorization
    if (!requestHeader || !requestHeader.startsWith("Bearer")) {
        return res.status(400).json({
            success: false,
            message: "Malformed token",
            data: []
        })
    }
    const token = requestHeader?.split(" ")[1];
    if (!token || typeof token !== 'string') {
        res.status(400).json({
            success: false,
            message: "Malformed token",
            data: []
        })
        return;
    }
    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload
        req.userId = decoded.userId;
        req.role = decoded.role;
    } catch (e) {
        res.status(400).json({
            success: false,
            message: "Malformed token",
            data: []
        })
    }
}
