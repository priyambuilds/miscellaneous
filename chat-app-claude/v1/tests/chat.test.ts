import { describe, it, expect, beforeEach, afterEach, beforeAll } from "bun:test"
import { createApp } from "../src/app"
import { connect } from "./helpers/helpers"

let app: ReturnType<typeof createApp>
let url: string

beforeAll(() => {
  app = createApp().listen(0)
  url = `ws://localhost:${app.server!.port}/ws`
})

afterEach(async () => {
  await app.stop(true) // true = also close any connections still open
})

// shortcut: connect, skip "welcome", join a room, wait for "joined".
async function joinRoom(room: string, username: string) {
  const client = await connect(url)
  await client.next()
  client.send({
    type: "joined",
    payload: { room, username },
  })
  const joined = await client.next()
  expect(joined.type).toBe("joined")
  return client
}

describe("V1 rooms", () => {
  it("confirms the join", async () => {
    const client = await connect(url)
    await client.next()

    client.send({
      type: "join",
      payload: { room: "general", username: "alice" },
    })
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

  it("delivers chat to everyone in the room including the sender", async () => {
    const alice = await joinRoom("general", "alice")
    const bob = await joinRoom("general", "bob")
    await alice.next()
    alice.send({
      type: "chat",
      payload: {
        text: "hi",
      },
    })

    const toBob = await bob.next()
    const toAlice = await alice.next()

    expect(toBob.type).toBe("chat")
    expect(toBob.payload.from).toBe("alice")
    expect(toBob.payload.text).toBe("hi")
    expect(toAlice).toEqual(toBob)

    alice.close()
    bob.close()
  })

  it("does not deliver chat to other rooms", async () => {
    const alice = await joinRoom("general", "alice")
    const carol = await joinRoom("random", "carol")

    alice.send({
      type: "chat",
      payload: {
        text: "Only for general",
      },
    })

    await alice.next()

    await expect(carol.next(200)).rejects.toThrow("No message")

    alice.close()
    carol.close()
  })
  it("rejects chats before joining a room", async () => {
    const client = await connect(url)
    await client.next()

    client.send({
      type: "chat",
      payload: {
        text: "hello",
      },
    })

    expect(await client.next()).toEqual({
      type: "error",
      payload: {
        message: "Join a room first",
      },
    })

    client.close()
  })

  it("rejects joining twice", async () => {
    const alice = await joinRoom("general", "alice")
    alice.send({
      type: "join",
      payload: {
        room: "random",
        username: "alice",
      },
    })

    expect((await alice.next()).type).toBe("error")
    alice.close()
  })

  it("tells the room when someone leaves", async () => {
    const alice = await joinRoom("general", "alice")
      const bob = await joinRoom("general", "bob")
      
      await alice.next();

      bob.close();

      expect(await alice.next()).toEqual({
          type: "user_left",
          payload: {
            username: "bob"
        }
      });
      alice.close();
  })
    it("rejects an empty username", async () => {
        const client = await connect(url);
        await client.next();

        client.send({
            type: "join",
            payload: {
                room: "general",
                username:""
            }
        });

        const reply = await client.next();
        expect(reply.type).not.toBe("joined");
        client.close();
  })
})
