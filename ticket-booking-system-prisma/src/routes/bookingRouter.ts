import express from "express";
import { authMiddleWare } from "../middlewares/auth";
import { bookingController, getBookingsController } from "../controller/bookingController";
import { validateBody } from "../middlewares/validateBody";
import { bookingSchema } from "../types";

const bookingRouter = express.Router();

bookingRouter.post("/", authMiddleWare, validateBody(bookingSchema),bookingController)
bookingRouter.get("/", authMiddleWare, getBookingsController)