import {type Request, type Response} from "express";
import { bookingsSchema} from "../types";
import { BookingModel, ShowModel } from "../models";
import { createBooking } from "../service/createBooking";

export async function bookShowController(req: Request, res: Response) {
    const parsedData = bookingsSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            success: false,
            message: parsedData.error,
            data: []
        })
    }
    const userId = req.userId;
    const role = req.role;
    if (role !== "user") {
        return res.status(400).json({
            success: false,
            message: "Admins cannot book tickets",
            data: []
        });
    }
    const { showId, seats } = parsedData.data;
    
    const show = await ShowModel.findById(showId)
    
    if (!show) {
        return res.status(400).json({
            success: false,
            message: "No such show exists"
        })
    }
    try {
        const booking = await createBooking(
            userId,
            showId,
            seats,
            req.headers["idempotency-key"] as string
        )
        return res.status(200).json({
            success: true,
            message: "Booking successful",
            data: [{ booking }]
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "Server side error",
            data: []
        })
    }
}
export async function findBookingController(req: Request, res: Response) {
    const userId = req.userId;
    const booking = BookingModel.findById(userId);
    if (!booking) {
        return res.status(400).json({
            success: false,
            message: "You have no bookings",
            data: []
        })
    }
    return res.status(200).json({
        success: true,
        message: "Below are your bookings",
        data: [{booking}]
    })
}