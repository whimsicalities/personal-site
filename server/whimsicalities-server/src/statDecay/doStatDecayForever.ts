import { WhimsicalitiesIo } from "../types/WhimsicalitiesIo";
import { WhimsicalitiesRedisClient } from "../types/WhimsicalitiesRedisClient";
import decayStats from "./decayStats";
import timeout from "./timeout";

/**
 * Decrease all stats as frequently as specified, forever
 */
export default async function doStatDecayForever(
    decaySpeedSeconds: number,
    redisClient: WhimsicalitiesRedisClient,
    io: WhimsicalitiesIo,
): Promise<void> {
    await timeout(decaySpeedSeconds * 1000);
    await decayStats(redisClient, io);
    return doStatDecayForever(
        decaySpeedSeconds,
        redisClient,
        io,
    );
}