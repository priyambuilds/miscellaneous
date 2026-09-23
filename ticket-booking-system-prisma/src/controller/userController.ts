import type { Request, Response, NextFunction } from "express";
import { signinService, signupService } from "./services/userService";
import jwt from "jsonwebtoken";

export async function signUpController(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, email, password, role } = req.body;
        const user = await signupService(username, email, password, role)
        return res.status(200).json({
            success: true,
            message: "Signup successful",
            data: [{
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password
            }]
        })
    } catch (e) {
        next(e)
    }
}
export async function signInController(req: Request, res: Response, next: NextFunction) {
    const secret = process.env.SECRET
    if (!secret) {
        throw new Error("JWT secret not provided")
    }
    try {
        const { username, password} = req.body;
        const user = await signinService(username, password)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }
        const token = jwt.sign({
            userId: user.id,
            role: user.role
        }, secret, { expiresIn: "7d" })
        
        return res.status(200).json({
            success: true,
            message: "signIn successful",
            data: [{
                id: user.id,
                username: user.username,
                email: user.email,
                token
            }]
        })
    } catch (e) {
        next(e)
    }
}