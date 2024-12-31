import { PET_STATS } from "../PET_STATS";
import { WhimsicalitiesIo } from "../types/WhimsicalitiesIo";
import { WhimsicalitiesRedisClient } from "../types/WhimsicalitiesRedisClient";
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
    for (const stat of PET_STATS) {
        try {
            // TODO risk of concurrency problems?
            const value = Number(await redisClient.get(stat));
            if (value > 0) { // Min 0
                await redisClient.decr(stat);
                io.emit(stat, value - 1);
                console.log(`Decremented stat to ${value - 1}`);
            }
        } catch (e) {
            console.log(`Failed to decrement stat ${stat}`);
            throw e;
        }
    }
    return doStatDecayForever(
        decaySpeedSeconds,
        redisClient,
        io,
    );
}