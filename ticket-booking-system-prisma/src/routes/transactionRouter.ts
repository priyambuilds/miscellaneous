import express from "express";
import { authMiddleWare } from "../middlewares/auth";
import { transactionController } from "../controller/transactionController";

const transactionRouter = express.Router();

transactionRouter.post("/", authMiddleWare, transactionController)