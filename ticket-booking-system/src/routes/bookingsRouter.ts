import express from "express";
import { bookShowController, findBookingController } from "../controller/bookingController";
import { authMiddleWare } from "../middleware/auth";

const bookingRouter = express.Router();

bookingRouter.post("/", authMiddleWare, bookShowController);
bookingRouter.get("/", authMiddleWare, findBookingController);

export default bookingRouter;