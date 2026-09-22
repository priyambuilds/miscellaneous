import express from "express";
import { isAdminMiddleware } from "../middlewares/requireAdmin";
import { validateBody, validateParams } from "../middlewares/validateBody";
import { cityIdParams, movieIdParams, screenIdParams, showtimeIdParams, theatreIdParams } from "../types";
import { createCitiesController, createMoviesController, createScreensController, createSeatsController, createShowTimeController, createTheatreController } from "../controller/adminController";
import { transactionController } from "../controller/transactionController";

const adminRouter = express.Router();
adminRouter.use(isAdminMiddleware);

// Add cities
adminRouter.post("/city", validateBody(), createCitiesController)
// Delete cities
adminRouter.delete("/city/:cityId", validateParams(cityIdParams))
// Add theatres
adminRouter.post("/city/:cityId/theatre", validateParams(cityIdParams), createTheatreController)
// Delete theatres
adminRouter.delete("/theatre/:theatreId", validateParams(theatreIdParams))
// Add screens
adminRouter.post("/theatre/:theatreId/screens", validateParams(theatreIdParams), createScreensController)
// Delete Screens
adminRouter.post("/screens/:screenId", validateParams(screenIdParams))
// Add seats
adminRouter.post("/screens/:screenId/seats", validateParams(screenIdParams), createSeatsController)
// Add Movies
adminRouter.post("/movies", createMoviesController)
// Delete movies
adminRouter.delete("/movies/:movieId", validateParams(movieIdParams))
// Add showtimes
adminRouter.post("/showtimes", createShowTimeController)
// Delete showtimes
adminRouter.post("/showtimes/:showtimeId", validateParams(showtimeIdParams))