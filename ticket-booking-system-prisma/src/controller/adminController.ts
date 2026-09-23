import type { Request, Response, NextFunction } from "express"
import {
    createCitiesService,
    createMoviesService,
    createScreensService,
    createShowTimeService,
    createTheatresService,
} from "./services/adminService"

export async function createCitiesController(req: Request, res: Response, next: NextFunction) {
    try {
        const name = req.body
        const city = await createCitiesService(name)
        return res.status(200).json({
            success: true,
            message: "City created successfully",
            data: [{ city }],
        })
    } catch (e) {
        next(e)
    }
}
export async function createTheatreController(req: Request, res: Response, next: NextFunction) {
    try {
        const name = req.body.name
        const cityId = req.params.cityId as string
        const theatre = await createTheatresService(cityId, name)
        return res.status(200).json({
            success: true,
            message: "City created successfully",
            data: [{ theatre }],
        })
    } catch (e) {
        next(e)
    }
}
export async function createMoviesController(req: Request, res: Response, next: NextFunction) {
    try {
        const { name } = req.body
        const movie = await createMoviesService(name)
        return res.status(200).json({
            success: true,
            message: "Movie created successfully",
            data: [{ movie }],
        })
    } catch (e) {
        next(e)
    }
}
export async function createScreensController(req: Request, res: Response, next: NextFunction) {
    try {
        const name = req.body.name
        const theatreId = req.params.theatreId as string
        const screen = await createScreensService(theatreId, name)
        return res.status(200).json({
            success: true,
            message: "Screen created successfully",
            data: [{ screen }],
        })
    } catch (e) {
        next(e)
    }
}
export async function createSeatsController(req: Request, res: Response, next: NextFunction) {
    try {
        const name = req.body.name
        const screenId = req.params.screenId as string
        const Screen = await createScreensService(screenId, name)
        return res.status(200).json({
            success: true,
            message: "Screen created successfully",
            data: [{ Screen }],
        })
    } catch (e) {
        next(e)
    }
}
export async function createShowTimeController(req: Request, res: Response, next: NextFunction) {
    try {
        const { screenId, movieId, startsAt, endsAt, priceCents } = req.body
        const showTime = await createShowTimeService(screenId, movieId, startsAt, endsAt, priceCents)
        return res.status(200).json({
            success: true,
            message: "Showtime created successfully",
            data: [{ showTime }],
        })
    } catch (e) {
        next(e)
    }
}
