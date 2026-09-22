import express from "express";
import { authMiddleWare } from "../middlewares/auth";
import { bookingController, getBookingsController } from "../controller/bookingController";

const bookingRouter = express.Router();

bookingRouter.post("/", authMiddleWare, bookingController)
bookingRouter.get("/", authMiddleWare, getBookingsController)