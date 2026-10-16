import { redis } from "../redis";

// Returns true if this call goes over limit withing windowSeconds
export async function isRateLimited(key: string, limit: number, windowSeconds: number) {
  const count = await redis.incr(key); // atomic +1 and return the new value
  
  if (count === 1) {
    await redis.expire(key, windowSeconds);
  }
  return count > limit;
}