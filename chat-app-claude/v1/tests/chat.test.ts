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
    await client.next();
    client.send({
        type: "joined",
        payload: {room, username}
    });
    const joined = await client.next();
    expect(joined.type).toBe("joined");
    return client;
}

describe("V1 rooms", () => {
    it("confirms the join", async () => {
        const client = await connect(url);
        await client.next();

        client.send({
            type: "join",
            payload: { room: "general", username: "alice" }
        });
    })

    it("tells existing members when someone joins", async () => {
        const alice = await joinRoom("general", "alice");
        const bob = await joinRoom("general", "bob");

        expect(await alice.next()).toEqual({
            type: "user_joined",
            payload: {username: 'bob'},
        });

        alice.close();
        bob.close();
    })
})