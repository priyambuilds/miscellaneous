import express from "express";
import { signInController, signUpController } from "../controller/userController";
import { validateBody } from "../middlewares/validateBody";
import { userSigninSchema, userSignupSchema } from "../types";
import { authMiddleWare } from "../middlewares/auth";

export const userRouter = express.Router();

userRouter.post("/signup", validateBody(userSignupSchema), signUpController)
userRouter.post("/signin", authMiddleWare, validateBody(userSigninSchema), signInController)