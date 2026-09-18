import {type Request, type Response} from "express";
import { bookingsSchema, showsSchema } from "../types";
import { ShowModel } from "../models";

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
    if (role !== "admin") {
        return res.status(400).json({
            success: false,
            message: "You are not an admin",
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
    if (show.availableTickets < seats) {
        return res.status(400).json({
            success: false,
            message: "Not enough seats available"
        })
    }

}
export async function findBookingController(req: Request, res: Response) {

}