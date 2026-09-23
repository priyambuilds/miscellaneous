import express from "express"
import { validateParams } from "../middlewares/validateParams"
import { cityIdParams, screenIdParams, showtimeIdParams, theatreIdParams } from "../types"
import {
    getCitiesController,
    getScreensByTheatreController,
    getSeatsByScreenController,
    getShowtimeController,
    getShowtimesByCityController,
    getShowtimesByTheatreController,
    getTheatresByCityController,
} from "../controller/catlogController"

export const catlogRouter = express.Router()

// get cities
catlogRouter.get("/cities", getCitiesController)
// get theatres inside a city
catlogRouter.get("/cities/:cityId/theatres", validateParams(cityIdParams), getTheatresByCityController)
// get all shows inside a city
catlogRouter.get("/cities/:cityId/showtimes", validateParams(cityIdParams), getShowtimesByCityController)
// get all shows inside that particular theatre
catlogRouter.get("/theatres/:theatreId/showtimes", validateParams(theatreIdParams), getShowtimesByTheatreController)
// get all details of a particular show
catlogRouter.get("/showtimes/:showtimeId", validateParams(showtimeIdParams), getShowtimeController)
// get screens inside a theatre
catlogRouter.get("/theatres/:theatreId/screens", validateParams(theatreIdParams), getScreensByTheatreController)
// get seats inside a screen
catlogRouter.get("/screens/:screenId/seats", validateParams(screenIdParams), getSeatsByScreenController)

export default catlogRouter
