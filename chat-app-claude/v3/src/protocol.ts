import { t, type Static } from "elysia"

// Messages the CLIENT sends to the server
// t.Union means the message must be one of these shapes
export const ClientMessage = t.Union([
  t.Object({ type: t.Literal("ping") }),
  t.Object({
    type: t.Literal("echo"),
    payload: t.Object({
      text: t.String({ minLength: 1, maxLength: 1000 }),
    }),
  }),
  t.Object({
    type: t.Literal("join"),
    payload: t.Object({
      room: t.String({ minLength: 1, maxLength: 50 }),
    }),
  }),
  t.Object({
    type: t.Literal("chat"),
    payload: t.Object({
      text: t.String({ minLength: 1, maxLength: 1000 }),
    }),
  }),
])

// turns the runtime schema into a typescirpt type so we write the shape and get both
export type ClientMessage = Static<typeof ClientMessage>

// Messages the SERVER sends to the clients
export type ServerMessage =
  | { type: "welcome"; payload: { message: string } }
  | { type: "pong"; payload: { ts: number } }
  | { type: "echo"; payload: { text: number } }
  | { type: "joined"; payload: { room: string; username: string, online: string[] } }
  | { type: "user_joined"; payload: { username: string } }
  | { type: "user_left"; payload: { username: string } }
  | { type: "chat"; payload: { id: number, from: string; text: string; sentAt: number } }
  | { type: "error"; payload: { message: string } }
