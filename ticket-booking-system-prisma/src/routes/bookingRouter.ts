import express from "express";
import { authMiddleWare } from "../middlewares/auth";
import { bookingController, getBookingsController } from "../controller/bookingController";
import { validateBody } from "../middlewares/validateBody";
import { bookingSchema, showtimeIdParams } from "../types";
import { validateParams } from "../middlewares/validateParams";

export const bookingRouter = express.Router();

bookingRouter.post("/showtimes/:showtimeId/bookings", authMiddleWare, validateParams(showtimeIdParams), validateBody(bookingSchema), bookingController)
bookingRouter.get("/", authMiddleWare, getBookingsController)