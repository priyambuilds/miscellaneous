import express from "express";
import { isAdminMiddleware } from "../middlewares/requireAdmin";
import { validateBody } from "../middlewares/validateBody";
import { validateParams } from "../middlewares/validateParams";
import { cityIdParams, createCitySchema, createMovieSchema, createScreenSchema, createSeatSchema, createShowTimeSchema, createTheatreSchema, movieIdParams, screenIdParams, showtimeIdParams, theatreIdParams } from "../types";
import { createCitiesController, createMoviesController, createScreensController, createSeatsController, createShowTimeController, createTheatreController } from "../controller/adminController";

export const adminRouter = express.Router();
adminRouter.use(isAdminMiddleware);

// Add cities
adminRouter.post("/city", validateBody(createCitySchema), createCitiesController)
// Delete cities
adminRouter.delete("/city/:cityId", validateParams(cityIdParams))
// Add theatres
adminRouter.post("/city/:cityId/theatre", validateParams(cityIdParams), validateBody(createTheatreSchema), createTheatreController)
// Delete theatres
adminRouter.delete("/theatre/:theatreId", validateParams(theatreIdParams))
// Add screens
adminRouter.post("/theatre/:theatreId/screens", validateParams(theatreIdParams), validateBody(createScreenSchema), createScreensController)
// Delete Screens
adminRouter.post("/screens/:screenId", validateParams(screenIdParams))
// Add seats
adminRouter.post("/screens/:screenId/seats", validateParams(screenIdParams), validateBody(createSeatSchema), createSeatsController)
// Add Movies
adminRouter.post("/movies", validateBody(createMovieSchema), createMoviesController)
// Delete movies
adminRouter.delete("/movies/:movieId", validateParams(movieIdParams))
// Add showtimes
adminRouter.post("/showtimes", validateBody(createShowTimeSchema),createShowTimeController)
// Delete showtimes
adminRouter.post("/showtimes/:showtimeId", validateParams(showtimeIdParams))