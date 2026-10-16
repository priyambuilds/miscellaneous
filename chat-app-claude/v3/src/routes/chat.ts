import { Elysia } from "elysia"
import { prisma } from "../db"
import { authPlugin } from "../auth/plugin"
import { ClientMessage } from "../protocol"

type Member = {
  userId: number
  username: string
  roomId: number
  room: string
}

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
            return;
          }

          const { room } = msg.payload;
          
          try {
            const dbRoom = await prisma.room.upsert({
              where: { name: room },
              update: {},
              create: {name: room}
            })
            members.set(ws.id, {userId, username, roomId: dbRoom.id, room});
          } catch (err) {
            console.error("[join] database error", err);
            ws.send(JSON.stringify({
              type: "error",
              payload: {message: "Could not join room"}
            }))
            return;
          }
          ws.subscribe(room);
          ws.send(JSON.stringify({
            type: "joined",
            payload: {room, username}
          }))
          ws.publish(room, JSON.stringify({
            type: "user_joined",
            payload: {username}
          }));
          break;
        }
        case "chat": {
          const me = members.get(ws.id);
          if (!me) {
            ws.send(JSON.stringify({
              type: "error",
              payload: {
                message: "Join a room first"
              }
            }))
            return;
          }

          const saved = await prisma.message
            .create({ data: { text: msg.payload.text, userId: me.userId, roomId: me.roomId } })
            .catch((err) => {
              console.error("[caht] databse error", err)
              return null
            })
          
          if (!saved) {
            ws.send(JSON.stringify({
              type: "error",
              payload: {
                message: "Message not sent"
              }
            }))
            return;
          }

          const out = JSON.stringify({
            type: "chat",
            payload: {
              id: saved.id,
              from: me.username,
              text: saved.text,
              sentAt: saved.createdAt.getTime(),
            }
          });

          ws.publish(me.room, out);
          ws.send(out);
          break;
        }
      }
    },

    close(ws) {
      const member = members.get(ws.id);
      if (!member) return;
      members.delete(ws.id);

      // The closed websocket cannot publish so the server announces it
      ws.data.server?.publish(
        member.room,
        JSON.stringify({
          type: "user_left",
          payload: {
            username: member.username
          }
        })
      )
    }
  });
}
