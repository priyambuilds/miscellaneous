import { Elysia, t } from "elysia";
import { prisma } from "../db";

export const historyRoutes = new Elysia().get(
    "rooms/:name/messages",
    async ({ params, query, status }) => {
        const room = await prisma.room.findUnique({
            where: {
                name: params.name
            }
        })
        if (!room) {
            return status(404, {
                error: "room not found"
            })
        }

        const limit = query.limit ?? 50;

        const rows = await prisma.message.findMany({
            where: {
                roomId: room.id,
                id: query.before ? {lt: query.before} : undefined
            },
            orderBy: { id: "desc" },
            take: limit,
            include: {user: true}
        })
        rows.reverse();

        return {
            messages: rows.map((m) => ({
                id: m.id,
                from: m.user.username,
                text: m.text,
                sentAt: m.createdAt.getTime()
            })),
            nextCursor: rows.length === limit ? rows[0].id : null,
        }
    }, {
        query: t.Object({
            before: t.Optional(t.Numeric()),
            limit: t.Optional(t.Numeric({minimum: 1, maximum: 100})),
        })
    }
)