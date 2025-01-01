import { PET_STATS } from "../PET_STATS";
import { WhimsicalitiesIo } from "../types/WhimsicalitiesIo";
import { WhimsicalitiesRedisClient } from "../types/WhimsicalitiesRedisClient";

/** Decay all stats by the specified value */
export default async function decayStats(
    redisClient: WhimsicalitiesRedisClient,
    io: WhimsicalitiesIo,
){
    for (const stat of PET_STATS) {
        try {
            const value = Number(await redisClient.get(stat));
            /* Minimum value is 0. Since this function is the only place
            where stats are decremented, and only once at a time, there is
            no way that it could have dipped below 0 between the times of
            checking the value and decrementing it. */
            if (value > 0) {
                await redisClient.decr(stat);
                io.emit(stat, value - 1);
                console.log(`Decremented stat to ${value - 1}`);
            }
        } catch (e) {
            console.log(`Failed to decrement stat ${stat}`);
            throw e;
        }
    }
}