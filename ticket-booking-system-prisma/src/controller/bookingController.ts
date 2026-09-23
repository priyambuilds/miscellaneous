import type { Request, Response, NextFunction } from "express";
import { createBookingService, getBookingsService } from "./services/bookingService";

export async function bookingController(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId
        const {showtimeId} = req.params
        const {seatNumbers} = req.body
        const booking = await createBookingService(userId, showtimeId as string, seatNumbers)
        res.status(200).json({
            success: true,
            message: "Booking successful",
            data: [{booking}]
        })
    } catch (e) {
        next(e)
    }
}
export async function getBookingsController(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId
        const booking = await getBookingsService(userId)
        res.status(200).json({
            success: true,
            message: "Below are all your bookings",
            data: [{booking}]
        })
    } catch (e) {
        next(e)
    }
}