import { describe, it, expect, beforeEach, afterEach } from "bun:test"
import { createApp } from "../src/app"
import { resetDb } from "./helpers/db"
import { connectAs } from "./helpers/auth"

let app: ReturnType<typeof createApp>

// A fresh database and a fresh server for EVERY test.
beforeEach(async () => {
  await resetDb()
  app = createApp().listen(0)
})

afterEach(async () => {
  await app.stop(true) // true = also close any connections still open
})

// Shortcut: log in as `username`, connect, join `room`, wait for "joined".
async function joinRoom(room: string, username: string) {
  const client = await connectAs(app.server!.port, username)
  client.send({ type: "join", payload: { room } })
  expect((await client.next()).type).toBe("joined")
  return client
}

describe("rooms", () => {
  it("confirms the join with the username from the token", async () => {
    const client = await connectAs(app.server!.port, "alice")

    client.send({ type: "join", payload: { room: "general" } })

    expect(await client.next()).toEqual({
      type: "joined",
      payload: { room: "general", username: "alice" },
    })
    client.close()
  })

  it("tells existing members when someone joins", async () => {
    const alice = await joinRoom("general", "alice")
    const bob = await joinRoom("general", "bob")

    expect(await alice.next()).toEqual({
      type: "user_joined",
      payload: { username: "bob" },
    })

    alice.close()
    bob.close()
  })

  it("delivers chat to everyone in the room, including the sender", async () => {
    const alice = await joinRoom("general", "alice")
    const bob = await joinRoom("general", "bob")
    await alice.next() // skip "bob joined"

    alice.send({ type: "chat", payload: { text: "hi" } })

    const toBob = await bob.next()
    const toAlice = await alice.next()

    expect(toBob.type).toBe("chat")
    expect(toBob.payload.from).toBe("alice")
    expect(toBob.payload.text).toBe("hi")
    expect(toAlice).toEqual(toBob) // sender gets the exact same message

    alice.close()
    bob.close()
  })

  it("does not deliver chat to other rooms", async () => {
    const alice = await joinRoom("general", "alice")
    const carol = await joinRoom("random", "carol")

    alice.send({ type: "chat", payload: { text: "only for general" } })
    await alice.next() // alice's own copy

    await expect(carol.next(200)).rejects.toThrow("No message")

    alice.close()
    carol.close()
  })

  it("rejects chat before joining a room", async () => {
    const client = await connectAs(app.server!.port, "alice")

    client.send({ type: "chat", payload: { text: "hello?" } })

    expect(await client.next()).toEqual({
      type: "error",
      payload: { message: "Join a room first" },
    })
    client.close()
  })

  it("rejects joining twice", async () => {
    const alice = await joinRoom("general", "alice")

    alice.send({ type: "join", payload: { room: "random" } })

    expect((await alice.next()).type).toBe("error")
    alice.close()
  })

  it("tells the room when someone leaves", async () => {
    const alice = await joinRoom("general", "alice")
    const bob = await joinRoom("general", "bob")
    await alice.next() // skip "bob joined"

    bob.close()

    expect(await alice.next()).toEqual({
      type: "user_left",
      payload: { username: "bob" },
    })
    alice.close()
  })

  it("rejects an empty room name", async () => {
    const client = await connectAs(app.server!.port, "alice")

    client.send({ type: "join", payload: { room: "" } })

    const reply = await client.next()
    expect(reply.type).not.toBe("joined")
    client.close()
  })
})