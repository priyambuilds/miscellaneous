import express from "express";
import { authMiddleWare } from "../middleware/auth";
import { addWalletController, getWalletController } from "../controller/walletController";

const walletRouter = express.Router();

walletRouter.post("/", authMiddleWare, addWalletController);
walletRouter.get("/", authMiddleWare, getWalletController);

export default walletRouter;