import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { createApp } from "../src/app";
import { prisma } from "../src/db";
import { connect } from "./helpers/helpers";
import { resetDb } from "./helpers/db";
import { post, registerAndLogin, connectAs } from "./helpers/auth";

let app: ReturnType<typeof createApp>;
const http = () => `http://localhost:${app.server!.port}`;
const ws = () => `ws://localhost:${app.server!.port}/ws`;

beforeEach(async () => {
  await resetDb();
  app = createApp().listen(0);
});

afterEach(async () => {
  await app.stop(true);
});

describe("register", () => {
  it("creates a user and never stores the real password", async () => {
    const res = await post(`${http()}/auth/register`, { username: "alice", password: "password123" });
    expect(res.status).toBe(201);

    const user = await prisma.user.findUnique({ where: { username: "alice" } });
    expect(user!.passwordHash).not.toBe("password123");
    expect(user!.passwordHash.startsWith("$argon2")).toBe(true);
  });

  it("does not return the password hash", async () => {
    const res = await post(`${http()}/auth/register`, { username: "alice", password: "password123" });
    expect((await res.json()).passwordHash).toBeUndefined();
  });

  it("rejects a taken username with 409", async () => {
    await post(`${http()}/auth/register`, { username: "alice", password: "password123" });
    const res = await post(`${http()}/auth/register`, { username: "alice", password: "other-password" });
    expect(res.status).toBe(409);
  });

  it("rejects a short password", async () => {
    const res = await post(`${http()}/auth/register`, { username: "alice", password: "short" });
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});

describe("login", () => {
  it("returns a token for correct credentials", async () => {
    const token = await registerAndLogin(http(), "alice");
    expect(token.split(".").length).toBe(3);
  });

  it("gives the same 401 for a wrong password and an unknown user", async () => {
    await post(`${http()}/auth/register`, { username: "alice", password: "password123" });
    const wrongPassword = await post(`${http()}/auth/login`, { username: "alice", password: "nope-nope" });
    const unknownUser = await post(`${http()}/auth/login`, { username: "nobody", password: "password123" });

    expect(wrongPassword.status).toBe(401);
    expect(unknownUser.status).toBe(401);
    expect(await wrongPassword.json()).toEqual(await unknownUser.json());
  });
});

describe("/me", () => {
  it("returns the logged-in user", async () => {
    const token = await registerAndLogin(http(), "alice");
    const res = await fetch(`${http()}/me`, { headers: { Authorization: `Bearer ${token}` } });
    expect((await res.json()).username).toBe("alice");
  });

  it("rejects requests without a token", async () => {
    const res = await fetch(`${http()}/me`);
    expect(res.status).toBe(401);
  });

  it("rejects a forged token (edited payload, old signature)", async () => {
    const token = await registerAndLogin(http(), "alice");
    const [header, , signature] = token.split(".");
    const fakePayload = Buffer.from(JSON.stringify({ userId: 999, username: "admin" })).toString("base64url");

    const res = await fetch(`${http()}/me`, {
      headers: { Authorization: `Bearer ${header}.${fakePayload}.${signature}` },
    });
    expect(res.status).toBe(401);
  });
});

describe("websocket auth", () => {
  it("rejects a connection without a token", async () => {
    await expect(connect(ws())).rejects.toThrow();
  });

  it("rejects a connection with a garbage token", async () => {
    await expect(connect(`${ws()}?access_token=not-a-real-token`)).rejects.toThrow();
  });

  it("uses the token's identity, not anything the client sends", async () => {
    const alice = await connectAs(app.server!.port, "alice");
    alice.send({ type: "join", payload: { room: "general" } });
    expect((await alice.next()).payload.username).toBe("alice");

    alice.send({ type: "chat", payload: { text: "hi" } });
    expect((await alice.next()).payload.from).toBe("alice");
    alice.close();
  });
});