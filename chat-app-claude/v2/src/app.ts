import { Elysia } from "elysia"
import { authRoutes } from "./routes/auth"
import { historyRoutes } from "./routes/history"
import { userRoutes } from "./routes/user"
import { createChatRoutes } from "./routes/chat"

export function createApp() {
  return new Elysia()
    .get("/health", () => ({ ok: true }))
    .use(authRoutes)
    .use(historyRoutes)
    .use(userRoutes)
    .use(createChatRoutes())
}
