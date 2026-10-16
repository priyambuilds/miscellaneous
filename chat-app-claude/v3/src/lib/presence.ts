import { redis } from "../redis";

// Online means: seen within the last 30 secs
const ONLINE_WINDOW_MS = 30000;

// The redis key for a room's presence list "presence:general"
function presenceKey(room: string): string {
  return "presence:"+room;
}

// One entry per connection "c1|alice"
function presenceEntry(connectionId: string, username: string): string {
  return connectionId+"|"+username;
}

// Called on join and on every ping 
export async function markOnline(room: string, connectionId: string, username: string) {
  const key = presenceKey(room);
  const entry = presenceEntry(connectionId, username);
  const now = Date.now();

  await redis.zadd(key, now, entry);
}

// called on close
export async function markOffline(room: string, connectionId: string, username: string) {
  const key = presenceKey(room);
  const entry = presenceEntry(connectionId, username);

  await redis.zrem(key, entry);
}

// Who is in this room right now? returns usernames, ["alice", "bob"];
export async function getOnline(room: string): Promise<string> {
  const key = presenceKey(room);
  const cutoff = Date.now() - ONLINE_WINDOW_MS

  // 1. Delete ghosts: every entry last seen before the cutoff
  await redis.zremrangebyscore(key, "-inf", cutoff);

  // 2. Read everything that's left
  const entries = await redis.zrange(key, 0, -1);

  // 3. turn entries into usernames, skippling diplicates (two tabs problem)
  const usernames: string[] = [];
  for (const entry of entries) {
    const username = entry.split("|")[1];
    if (!usernames.includes(username)) {
      usernames.push(username);
    }
  }

  usernames.sort();
  return usernames;
}