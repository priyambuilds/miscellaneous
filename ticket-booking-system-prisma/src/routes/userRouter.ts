import express from "express";
import { authMiddleWare } from "../middlewares/auth";
import { signInController, signUpController } from "../controller/userController";
import { validateBody } from "../middlewares/validateBody";
import { userSignupSchema } from "../types";

const userRouter = express.Router();

userRouter.post("/signup", authMiddleWare, validateBody(userSignupSchema), signUpController)
userRouter.post("/signin", authMiddleWare, validateBody(userSignupSchema), signInController)