import express from "express";
import { signInController, signupController } from "../controller/userController";

const userRouter = express.Router();

userRouter.post("/signup", signupController);
userRouter.post("/signin", signInController);

export default userRouter;