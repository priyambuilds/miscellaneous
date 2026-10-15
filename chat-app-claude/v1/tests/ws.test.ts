import { describe, it, expect, beforeAll, afterAll } from "bun:test"
import { createApp } from "../src/app"
import { connect } from "./helpers/helpers"

let app: ReturnType<typeof createApp>
let url: string

beforeAll(() => {
  app = createApp().listen(0) // port 0 = "OS, give me any free port"
  url = `ws://localhost:${app.server!.port}/ws`
})

afterAll(async () => {
  await app.stop()
})

describe("V0 WebSocket", () => {
  it("Sends a welcome message on connect", async () => {
    const client = await connect(url)
    expect(await client.next()).toEqual({
      type: "welcome",
      payload: { message: "connected" },
    })
    client.close()
  })                

  it("replies to ping with pong", async () => {
    const client = await connect(url)
    await client.next() // Skip welcome

    client.send({ type: "ping" })
    const reply = await client.next()

    expect(reply.type).toBe("pong")
    expect(typeof reply.payload.ts).toBe("number")
    client.close()
  })

  it("echoes text back", async () => {
    const client = await connect(url)
    await client.next()

    client.send({ type: "echo", payload: { text: "hello" } })
    expect(await client.next()).toEqual({
      type: "echo",
      payload: {
        text: "hello",
      },
    })
    client.close()
  })
  it("echoes text back", async () => {
    const client = await connect(url)
    await client.next()

    client.send({ type: "echo", payload: { text: "hello" } })
    expect(await client.next()).toEqual({
      type: "echo",
      payload: {
        text: "hello",
      },
    })
    client.close()
  })

  it("echoes goes only to sender", async () => {
    const alice = await connect(url)
    const bob = await connect(url)
    await alice.next()
    await bob.next()

    alice.send({ type: "echo", payload: { text: "secret" } })
      await alice.next()
      
      // Bob should receive nothing. Waiting must time out.
      await expect(bob.next(200)).rejects.toThrow("No message");
      alice.close();
      bob.close();
  });
    
  it("rejects invalid messages but keeps the connection open", async () => {
    const client = await connect(url)
    await client.next();

      client.sendRaw("this is not JSON");
      const error = await client.next();
      expect(error).toBeDefined();

      client.send({ type: "ping" });
      expect((await client.next()).type).toBe("pong"); // still works
      client.close();
  });
    
    
})
