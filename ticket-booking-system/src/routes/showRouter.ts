import express from "express";
import { createShowController, findShowController, findShowByIdController } from "../controller/showController";
import { authMiddleWare } from '../middleware/auth';

const showRouter = express.Router();

showRouter.post("/", authMiddleWare, createShowController);
showRouter.get("/", findShowController);
showRouter.get("/:showId", findShowByIdController);

export default showRouter;