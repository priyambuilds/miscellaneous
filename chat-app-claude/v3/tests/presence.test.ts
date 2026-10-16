import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { createApp } from "../src/app";
import { redis } from "../src/redis";
import { resetDb } from "./helpers/db";
import { connectAs } from "./helpers/auth";

let app: ReturnType<typeof createApp>;

beforeEach(async () => {
  await resetDb();
  app = createApp().listen(0);
});

afterEach(async () => {
  await app.stop(true);
});

// Join and return both the client AND the "joined" reply (we need its `online` list).
async function join(room: string, username: string) {
  const client = await connectAs(app.server!.port, username);
  client.send({ type: "join", payload: { room } });
  const joined = await client.next();
  expect(joined.type).toBe("joined");
  return { client, joined };
}

describe("presence", () => {
  it("includes yourself in the online list", async () => {
    const { client, joined } = await join("general", "alice");
    expect(joined.payload.online).toEqual(["alice"]);
    client.close();
  });

  it("shows everyone currently in the room", async () => {
    const alice = await join("general", "alice");
    const bob = await join("general", "bob");

    expect(bob.joined.payload.online).toEqual(["alice", "bob"]);

    alice.client.close();
    bob.client.close();
  });

  it("removes people who leave", async () => {
    const alice = await join("general", "alice");
    const bob = await join("general", "bob");
    await alice.client.next(); // "bob joined"

    bob.client.close();
    await alice.client.next(); // "bob left": by now Redis is updated

    const carol = await join("general", "carol");
    expect(carol.joined.payload.online).toEqual(["alice", "carol"]);

    alice.client.close();
    carol.client.close();
  });

  it("keeps a user online while they still have another tab open", async () => {
    const tab1 = await join("general", "alice");
    const tab2 = await join("general", "alice");

    // A second tab is not a new arrival, so no "alice joined".
    await expect(tab1.client.next(200)).rejects.toThrow("No message");

    tab2.client.close();

    // Closing one tab is not leaving, so no "alice left".
    await expect(tab1.client.next(300)).rejects.toThrow("No message");

    const bob = await join("general", "bob");
    expect(bob.joined.payload.online).toEqual(["alice", "bob"]);

    tab1.client.close();
    bob.client.close();
  });

  it("ignores ghosts: connections not seen for over 30 seconds", async () => {
    // Simulate a server that crashed a minute ago without cleaning up.
    const oneMinuteAgo = Date.now() - 60_000;
    await redis.zadd("presence:general", oneMinuteAgo, "dead-connection|ghost");

    const { client, joined } = await join("general", "alice");
    expect(joined.payload.online).toEqual(["alice"]); // no ghost

    client.close();
  });
});