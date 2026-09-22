import express from "express";
import { authMiddleWare } from "../middlewares/auth";
import { signInController, signUpController } from "../controller/userController";

const userRouter = express.Router();

userRouter.post("/signup", authMiddleWare, signUpController)
userRouter.post("/signin", authMiddleWare, signInController)