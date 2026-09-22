import type { Request, Response, NextFunction } from "express";
import { createCitiesService } from "./services/adminService";

export async function createCitiesController(req: Request, res: Response, next: NextFunction) {
    try {
        const cities = await createCitiesService(req.body)
    } catch (e) {
        next(e)
    }
}
export async function createTheatreController(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {
        next(e)
    }
}
export async function createMoviesController(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {
        next(e)
    }
}
export async function createScreensController(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {
        next(e)
    }
}
export async function createSeatsController(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {
        next(e)
    }
}
export async function createShowTimeController(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {
        next(e)
    }
}