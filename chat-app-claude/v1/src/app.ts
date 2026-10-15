import { Elysia } from "elysia"
import { ClientMessage } from "./protocol"

type Member = { username: string; room: string }

export function createApp() {
  // The server's memory: connection id -> who they are and where they are
  const members = new Map<string, Member>()
  const app = new Elysia()
  app.get("/health", () => ({ ok: true }))
  app.ws("/ws", {
    body: ClientMessage,

    open(ws) {
      console.log("[ws] open")
      ws.send(
        JSON.stringify({
          type: "welcome",
          payload: {
            message: "connected",
          },
        }),
      )
    },

    message(ws, msg) {
      switch (msg.type) {
        case "ping":
          ws.send(
            JSON.stringify({
              type: "pong",
              payload: { ts: Date.now() },
            }),
          )
          break
        case "echo":
          ws.send(
            JSON.stringify({
              type: "echo",
              payload: { text: msg.payload.text },
            }),
          )
          break
        case "join":
          if (members.has(ws.id)) {
            ws.send(
              JSON.stringify({
                type: "error",
                payload: { message: "Already in a room" },
              }),
            )
            return
          }

          const { room, username } = msg.payload

          members.set(ws.id, { username, room }) // 1. remember who this is
          ws.subscribe(room) // 2. tune into the room's channel

          // 3. confirm to the joiner
          ws.send(
            JSON.stringify({
              type: "joined",
              payload: { room, username },
            }),
          )

          // 4. tell everyone else in the room (publish skips the sender)
          ws.publish(
            room,
            JSON.stringify({
              type: "user_joined",
              payload: { username },
            }),
          )
          break

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
          const out = JSON.stringify({
            type: "chat",
            payload: {
              from: me.username,
              text: msg.payload.text,
              sentAt: Date.now(),
            },
          })

          ws.publish(me.room, out) // everyone else in the room
          ws.send(out) // and the sender
          break
        }
      }
    },

    close(ws, code, reason) {
      const me = members.get(ws.id)
      if (!me) return // never joined a room, nothing to clean up

      members.delete(ws.id) // forget them, or memory grows forever

      app.server?.publish(
        me.room,
        JSON.stringify({
          type: "user_left",
          payload: {
            username: me.username,
          },
        }),
      )
    },
  })
  return app;
}
