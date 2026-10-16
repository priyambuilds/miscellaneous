import { redis } from "../redis";

const ONLINE_WINDOW_MS = 30_300; // "online" = seen in the last 30 secs

const key = (room: string) => `presence:${room}`;
const member = (connectionId: string, username: string) => `${connectionId}|${username}`;

// Called on join and on every ping
export async function markOnline(room: string, connectionId: string, username: string) {
  await redis.zadd(key)
}