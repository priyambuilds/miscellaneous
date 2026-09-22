import express from "express";
import { isAdminMiddleware } from "../middlewares/requireAdmin";
import { validateParams } from "../middlewares/validateParams";
import { cityIdParams, screenIdParams, showtimeIdParams, theatreIdParams } from "../types";

const adminRouter = express.Router();
adminRouter.use(isAdminMiddleware);

// get cities
adminRouter.get("/city")
// get theatres inside a city
adminRouter.get("/city/:cityId/theatre", validateParams(cityIdParams))
// get all shows inside a city
adminRouter.post("city/:city/showtimes", validateParams(cityIdParams))
// get all shows inside that particular theatre
adminRouter.post("theatre/:theatreId/showtimes", validateParams(theatreIdParams))
// get all details of a particular show
adminRouter.post("/showtimes/:showtimeId", validateParams(showtimeIdParams))
// get screens inside a theatre
adminRouter.get("/theatre/:theatreId/screens", validateParams(theatreIdParams))
// get seats inside a screen
adminRouter.get("/screens/:screenId/seats", validateParams(screenIdParams))
// Get user's personal transaction records
adminRouter.get("/transactions")