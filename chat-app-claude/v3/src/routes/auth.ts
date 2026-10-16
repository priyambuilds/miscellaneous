import { Elysia, t } from "elysia"
import { prisma } from "../db"
import { jwtSetup } from "../auth/jwt"

export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(jwtSetup)
  .post(
    "/register",
    async ({ body, status }) => {
      const existing = await prisma.user.findUnique({
        where: {
          username: body.username,
        },
      })
      if (existing) {
        return status(409, {
          error: "Username already taken",
        })
      }

      const passwordHash = await Bun.password.hash(body.password)
      const user = await prisma.user.create({
        data: {
          username: body.username,
          passwordHash,
        },
      })

      return status(201, {
        id: user.id,
        username: user.username,
      })
    },
    {
      body: t.Object({
        username: t.String({ minLength: 3, maxLength: 32, pattern: "^[a-zA-Z0-9_]+$" }),
        password: t.String({ minLength: 8, maxLength: 128 }),
      }),
    },
  )

  .post("/login", async ({ body, status, jwt }) => {
    const user = await prisma.user.findUnique({
      where: { username: body.username },
    })
      const passwordOk = user ? await Bun.password.verify(body.password, user.passwordHash) : false;

      if (!user || !passwordOk) {
          return status(401, {
              error: "Invalid username or password"
          })
      }

      const token = await jwt.sign({ userId: user.id, username: user.username });
      return {token};
  }, {
      body: t.Object({
          username: t.String(),
          password: t.String()
      })
  })
