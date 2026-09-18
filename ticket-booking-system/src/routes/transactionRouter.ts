import express from "express";
import { authMiddleWare } from "../middleware/auth";
import { getTransactionController } from "../controller/transactionController";

const transactionRouter = express.Router();

transactionRouter.get("/", authMiddleWare, getTransactionController);

export default transactionRouter;