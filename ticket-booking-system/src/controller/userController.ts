import {type Request, type Response} from "express";
import jwt from "jsonwebtoken";
import { signinSchema, signupSchema } from "../types";
import { UserModel } from "../models";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
}

export async function signupController(req: Request, res: Response) {
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            success: false,
            message: parsedData.error,
            data: []
        });
    }
    const { username, email, password, role } = parsedData.data;
    const userExists = await UserModel.findOne({ username });
    if (userExists) {
        return res.status(400).json({
            success: false,
            message: "User with this username or email already exists",
            data: []
        })
    }
    const passwordHash = await Bun.password.hash(password)

    const newUser = await UserModel.create({
        username,
        email,
        password: passwordHash,
        role
    })
    res.status(200).json({
        success: true,
        message: "Signed up successfully",
        data: [{id: newUser._id}]
    })
}

export async function signInController(req: Request, res: Response) {
    const parsedData = signinSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            success: false,
            message: parsedData.error,
            data: []
        });
    }
    const { username, password } = parsedData.data;
    const userExists = await UserModel.findOne({ username });
    if (!userExists) {
        return res.status(400).json({
            success: false,
            message: "no user with this username userExists",
            data: []
        })
    }

    const matchPassword = await Bun.password.verify(password, userExists.password)

    if (!matchPassword) {
        return res.status(400).json({
            success: false,
            message: "Invalid username or password",
            data: []
        })
    }

    const token = jwt.sign({
        userId: userExists.id,
        role: userExists.role
    }, jwtSecret as string);
    
    res.json({
        success: true,
        message: "signed in",
        data: [{authorization: token}]
    })
}