import { createClient } from "redis";

export type WhimsicalitiesRedisClient = ReturnType<typeof createClient>