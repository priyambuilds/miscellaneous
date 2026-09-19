import {type Request, type Response} from "express";
import { showsSchema } from "../types";
import { toCents } from "../helpers/cents";
import { ShowModel } from "../models";

export async function createShowController(req: Request, res: Response) {
    const parsedData = showsSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            success: false,
            message: parsedData.error,
            data: []
        })
    }
    const role = req.role;

    if (role !== "admin") {
        return res.status(400).json({
            success: false,
            message: "Only admins can add shows",
            data: []
        })
    }

    try {
        const { movieName, showTime, ticketPriceInCents, availableTickets } = parsedData.data;

        const showExists = await ShowModel.findOne({ movieName });
        
        if (showExists) {
            return res.status(400).json({
                success: false,
                message: "Show already exists",
                data: []
            }) 
        }

        const ticketPrice = toCents(ticketPriceInCents)
    
        const show = await ShowModel.create({
            movieName,
            showTime,
            ticketPriceInCents: ticketPrice,
            availableTickets
        })
        return res.status(200).json({
            success: true,
            message: "Show created",
            data: [{show}]
        })
    } catch {
        return res.status(400).json({
            success: false,
            message: "Internal server error",
            data: []
        })
    }
}

export async function findShowController(req: Request, res: Response) {
    const show = await ShowModel.find({})
    try {
        return res.status(200).json({
            success: true,
            message: "Below are all the shows in the cinema",
            data: [{ show }]
        })
    } catch {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            data: []
        });
    }
}
export async function findShowByIdController(req: Request, res: Response) {
    try {
        const showId = await ShowModel.findById(req.params.showId)
        if (!showId) {
            return res.status(400).json({
                success: false,
                message: "No such show exists",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Below are all the shows in the cinema",
            data: [{ showId }]
        })
    } catch {
        return res.status(500).json({
            success: false,
            message: "internal server error",
        });
    }
}