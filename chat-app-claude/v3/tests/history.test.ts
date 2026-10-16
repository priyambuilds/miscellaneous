import { describe, it, expect, beforeEach, afterEach } from "bun:test"
import { createApp } from "../src/app"
import { prisma } from "../src/db"
import { resetDb } from "./helpers/db"
import { connectAs } from "./helpers/auth"

let app: ReturnType<typeof createApp>

const httpUrl = () => `http://localhost:${app.server!.port}`

// "Whatever connectAs() gives back after you await it": a test client.
type Client = Awaited<ReturnType<typeof connectAs>>

beforeEach(async () => {
  await resetDb()
  app = createApp().listen(0)
})

afterEach(async () => {
  await app.stop(true)
})

// Log in as `username`, connect, join `room`, wait for "joined".
async function joinRoom(room: string, username: string) {
  const client = await connectAs(app.server!.port, username)
  client.send({ type: "join", payload: { room } })
  expect((await client.next()).type).toBe("joined")
  return client
}

// Send a chat message and wait until the server confirms it.
// Getting our own copy back means it's already saved (save happens before broadcast).
async function say(client: Client, text: string) {
  client.send({ type: "chat", payload: { text } })
  const msg = await client.next()
  expect(msg.type).toBe("chat")
  return msg
}

describe("persistence", () => {
  it("saves chat messages to the database", async () => {
    const alice = await joinRoom("general", "alice")
    await say(alice, "hello db")

    const rows = await prisma.message.findMany()
    expect(rows.length).toBe(1)
    expect(rows[0].text).toBe("hello db")
    alice.close()
  })

  it("saves the message under the logged-in user", async () => {
    const alice = await joinRoom("general", "alice")
    await say(alice, "who wrote this?")

    const row = await prisma.message.findFirst({ include: { user: true } })
    expect(row!.user.username).toBe("alice")
    alice.close()
  })

  it("includes the database id in the broadcast", async () => {
    const alice = await joinRoom("general", "alice")
    const msg = await say(alice, "hi")

    const row = await prisma.message.findFirst()
    expect(msg.payload.id).toBe(row!.id)
    alice.close()
  })

  it("returns history oldest → newest", async () => {
    const alice = await joinRoom("general", "alice")
    await say(alice, "one")
    await say(alice, "two")
    await say(alice, "three")

    const res = await fetch(`${httpUrl()}/rooms/general/messages`)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.messages.map((m: any) => m.text)).toEqual(["one", "two", "three"])
    expect(body.messages[0].from).toBe("alice")
    alice.close()
  })

  it("paginates with a cursor", async () => {
    const alice = await joinRoom("general", "alice")
    for (const text of ["1", "2", "3", "4", "5"]) {
      await say(alice, text)
    }

    // Page 1: the newest 2
    const page1 = await (await fetch(`${httpUrl()}/rooms/general/messages?limit=2`)).json()
    expect(page1.messages.map((m: any) => m.text)).toEqual(["4", "5"])
    expect(page1.nextCursor).not.toBeNull()

    // Page 2: the 2 before that
    const page2 = await (
      await fetch(`${httpUrl()}/rooms/general/messages?limit=2&before=${page1.nextCursor}`)
    ).json()
    expect(page2.messages.map((m: any) => m.text)).toEqual(["2", "3"])
    alice.close()
  })

  it("returns 404 for a room that doesn't exist", async () => {
    const res = await fetch(`${httpUrl()}/rooms/nope/messages`)
    expect(res.status).toBe(404)
  })

  it("keeps messages after a server restart", async () => {
    const alice = await joinRoom("general", "alice")
    await say(alice, "remember me")
    alice.close()

    // Kill the server, then start a brand-new one with empty memory.
    await app.stop(true)
    app = createApp().listen(0)

    const body = await (await fetch(`${httpUrl()}/rooms/general/messages`)).json()
    expect(body.messages.map((m: any) => m.text)).toEqual(["remember me"])
  })
})