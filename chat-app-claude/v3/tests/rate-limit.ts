import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { createApp } from "../src/app";
import { prisma } from "../src/db";
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

async function joinRoom(room: string, username: string) {
  const client = await connectAs(app.server!.port, username);
  client.send({ type: "join", payload: { room } });
  expect((await client.next()).type).toBe("joined");
  return client;
}

describe("rate limiting", () => {
  it("allows 5 messages, then rejects the 6th", async () => {
    const alice = await joinRoom("general", "alice");

    for (let i = 1; i <= 5; i++) {
      alice.send({ type: "chat", payload: { text: `msg ${i}` } });
      expect((await alice.next()).type).toBe("chat");
    }

    alice.send({ type: "chat", payload: { text: "one too many" } });
    expect(await alice.next()).toEqual({
      type: "error",
      payload: { message: "You're sending messages too fast" },
    });
    alice.close();
  });

  it("does not save rejected messages", async () => {
    const alice = await joinRoom("general", "alice");

    for (let i = 1; i <= 6; i++) {
      alice.send({ type: "chat", payload: { text: `msg ${i}` } });
      await alice.next();
    }

    expect(await prisma.message.count()).toBe(5);
    alice.close();
  });

  it("is per user, shared across connections", async () => {
    const tab1 = await joinRoom("general", "alice");
    const tab2 = await joinRoom("random", "alice");

    for (let i = 1; i <= 3; i++) {
      tab1.send({ type: "chat", payload: { text: `tab1 ${i}` } });
      await tab1.next();
    }
    for (let i = 1; i <= 2; i++) {
      tab2.send({ type: "chat", payload: { text: `tab2 ${i}` } });
      await tab2.next();
    }

    // That's 5 in total. The 6th fails, whichever tab it comes from.
    tab2.send({ type: "chat", payload: { text: "sneaky" } });
    expect((await tab2.next()).type).toBe("error");

    tab1.close();
    tab2.close();
  });

  it("does not limit other users", async () => {
    const alice = await joinRoom("general", "alice");
    const bob = await joinRoom("random", "bob");

    for (let i = 1; i <= 6; i++) {
      alice.send({ type: "chat", payload: { text: `spam ${i}` } });
      await alice.next();
    }

    bob.send({ type: "chat", payload: { text: "I'm fine" } });
    expect((await bob.next()).type).toBe("chat");

    alice.close();
    bob.close();
  });

  it("stores the counter with an expiry", async () => {
    const alice = await joinRoom("general", "alice");
    alice.send({ type: "chat", payload: { text: "hi" } });
    await alice.next();

    const user = await prisma.user.findUnique({ where: { username: "alice" } });
    const ttl = await redis.ttl(`ratelimit:chat:${user!.id}`);

    expect(ttl).toBeGreaterThan(0);  // -1 would mean "never expires": a bug
    expect(ttl).toBeLessThanOrEqual(10);
    alice.close();
  });
});