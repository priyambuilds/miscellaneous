import express from "express";
import { authMiddleWare } from "../middlewares/auth";

export const walletRouter = express.Router();

walletRouter.post("/topup", authMiddleWare)
walletRouter.get("/", authMiddleWare)