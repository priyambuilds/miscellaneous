import type { Request, Response, NextFunction } from "express"
import {
    getCitiesService,
    getScreensByTheatreService,
    getSeatsByScreenService,
    getShowtimeService,
    getShowtimesByCityService,
    getShowtimesByTheatreService,
    getTheatresByCityService,
} from "./services/catlogService"

export async function getCitiesController(req: Request, res: Response, next: NextFunction) {
    try {
        const cities = await getCitiesService()
        return res.status(200).json({ success: true, message: "",data: [{cities}] })
    } catch (error) {
        next(error)
    }
}

export async function getTheatresByCityController(req: Request, res: Response, next: NextFunction) {
    try {
        const theatres = await getTheatresByCityService(req.params.cityId as string)
        return res.status(200).json({ success: true, message: "",data: [{theatres}] })
    } catch (error) {
        next(error)
    }
}

export async function getShowtimesByCityController(req: Request, res: Response, next: NextFunction) {
    try {
        const showtimes = await getShowtimesByCityService(req.params.cityId as string)
        return res.status(200).json({ success: true, message: "",data: [{showtimes}] })
    } catch (error) {
        next(error)
    }
}

export async function getShowtimesByTheatreController(req: Request, res: Response, next: NextFunction) {
    try {
        const showtimes = await getShowtimesByTheatreService(req.params.theatreId as string)
        return res.status(200).json({ success: true, message: "",data: [{showtimes}] })
    } catch (error) {
        next(error)
    }
}

export async function getShowtimeController(req: Request, res: Response, next: NextFunction) {
    try {
        const showtime = await getShowtimeService(req.params.showtimeId as string)
        return res.status(200).json({ success: true, message: "",data: [{showtime}] })
    } catch (error) {
        next(error)
    }
}

export async function getScreensByTheatreController(req: Request, res: Response, next: NextFunction) {
    try {
        const screens = await getScreensByTheatreService(req.params.theatreId as string)
        return res.status(200).json({ success: true, message: "",data: [{screens}] })
    } catch (error) {
        next(error)
    }
}

export async function getSeatsByScreenController(req: Request, res: Response, next: NextFunction) {
    try {
        const seats = await getSeatsByScreenService(req.params.screenId as string)
        return res.status(200).json({ success: true, message: "",data: [{seats}] })
    } catch (e) {
        next(e)
    }
}