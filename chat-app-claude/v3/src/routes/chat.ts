import { Elysia } from "elysia"
import { prisma } from "../db"
import { authPlugin } from "../auth/plugin"
import { ClientMessage } from "../protocol"
import { getOnline, markOffline, markOnline } from "../lib/presence"
import { isRateLimited } from "../lib/rate-limit"

type Member = {
  userId: number
  username: string
  roomId: number
  room: string
}

const CHAT_LIMIT = 5
const CHAT_WINDOW_SECONDS = 10

export function createChatRoutes() {
  const members = new Map<string, Member>()

  return new Elysia().use(authPlugin).ws("/ws", {
    body: ClientMessage,

    open(ws) {
      ws.send(
        JSON.stringify({
          type: "welcome",
          payload: {
            message: "connected",
          },
        }),
      )
    },

    async message(ws, msg) {
      // comes from the authPlugin's resolve, before the connection was opened
      const { userId, username } = ws.data

      switch (msg.type) {
        case "ping": {
          // Heartbeat: if in a room, refresh "last seen"
          const member = members.get(ws.id)
          if (member) {
            await markOnline(member.room, ws.id, member.username)
          }
          ws.send(
            JSON.stringify({
              type: "pong",
              payload: {
                ts: Date.now(),
              },
            }),
          )
          break
        }
        case "echo": {
          ws.send(
            JSON.stringify({
              type: "echo",
              payload: {
                text: msg.payload.text,
              },
            }),
          )
          break
        }
        case "join": {
          if (members.has(ws.id)) {
            ws.send(
              JSON.stringify({
                type: "error",
                payload: {
                  message: "Already in a room",
                },
              }),
            )
            return
          }

          const { room } = msg.payload

          try {
            const dbRoom = await prisma.room.upsert({
              where: { name: room },
              update: {},
              create: { name: room },
            })
            members.set(ws.id, { userId, username, roomId: dbRoom.id, room })
          } catch (err) {
            console.error("[join] database error", err)
            ws.send(
              JSON.stringify({
                type: "error",
                payload: { message: "Could not join room" },
              }),
            )
            return
          }

          // Was this user already here in another tab? (check before adding this conenction)
          const wasOnline = (await getOnline(room)).includes(username)
          await markOnline(room, ws.id, username)

          ws.subscribe(room)
          ws.send(
            JSON.stringify({
              type: "joined",
              payload: { room, username },
            }),
          )
          // Only announce if they werent already in the room
          if (!wasOnline) {
            ws.publish(
              room,
              JSON.stringify({
                type: "user_joined",
                payload: { username },
              }),
            )
          }
          break
        }
        case "chat": {
          const me = members.get(ws.id)
          if (!me) {
            ws.send(
              JSON.stringify({
                type: "error",
                payload: {
                  message: "Join a room first",
                },
              }),
            )
            return
          }

          // check the limit before touching the DB
          if (await isRateLimited(`ratelimit:chat:${me.userId}`, CHAT_LIMIT, CHAT_WINDOW_SECONDS)) {
            ws.send(
              JSON.stringify({
                type: "error",
                payload: { message: "You are sending messages too fast" },
              }),
            )
            return
          }

          const saved = await prisma.message
            .create({ data: { text: msg.payload.text, userId: me.userId, roomId: me.roomId } })
            .catch((err) => {
              console.error("[caht] databse error", err)
              return null
            })

          if (!saved) {
            ws.send(
              JSON.stringify({
                type: "error",
                payload: {
                  message: "Message not sent",
                },
              }),
            )
            return
          }

          const out = JSON.stringify({
            type: "chat",
            payload: {
              id: saved.id,
              from: me.username,
              text: saved.text,
              sentAt: saved.createdAt.getTime(),
            },
          })

          ws.publish(me.room, out)
          ws.send(out)
          break
        }
      }
    },

    async close(ws) {
      const member = members.get(ws.id)
      if (!member) return
      members.delete(ws.id)

      await markOffline(member.room, ws.id, member.username)

      // Only annount if this was their LAST connection in the room
      const online = await getOnline(member.room)
      if (!online.includes(member.username)) {
        // The closed websocket cannot publish so the server announces it
        ws.data.server?.publish(
          member.room,
          JSON.stringify({
            type: "user_left",
            payload: {
              username: member.username,
            },
          }),
        )
      }
    },
  })
}
