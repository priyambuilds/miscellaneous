import { Elysia } from "elysia"
import { authPlugin } from "../auth/plugin"

export const userRoutes = new Elysia()
    .use(authPlugin)
    .get("/me", ({ userId, username }) => ({ id: userId, username }))
