import cors, { CorsOptions } from "cors";
import { WhimsicalitiesRedisClient } from "../../types/WhimsicalitiesRedisClient";
import e from 'express';
import isPetStat from "./helpers/isPetStat";
import { WhimsicalitiesIo } from "../../types/WhimsicalitiesIo";
import { interactionLogTable } from "../../postgresDb/schema";
import { WhimsicalitiesDatabase } from "../../types/WhimsicalitiesDatabase";
import EventEmitter from "events";

export default function increaseStatRoute(
  app: e.Express,
  io: WhimsicalitiesIo,
  corsOptions: CorsOptions,
  redisClient: WhimsicalitiesRedisClient,
  db: WhimsicalitiesDatabase,
  interactionUpdateEmitter: EventEmitter,
) {
    app.post('/stats/increase', cors(corsOptions), async (req, res) => {
      let stat = req.body?.stat;
      // Stat ought to be a number, which needs to be stringified to use as a redis key
      stat = stat.toString();
      if (!isPetStat(stat)) {
        return res.status(400).end("Not a valid stat");
      }
      try {
        const statValue = Number(await redisClient.get(stat));
        if (statValue < 100) {
          const newValue = await redisClient.incr(stat);
          console.log(`Increased stat to ${newValue} from ${statValue}`);
          await db.insert(interactionLogTable).values({
            message: `increased ${stat} to ${newValue}`,
          });

          // Emit for local updates first, so that the cache will be updated
          // before clients start requesting the updated value
          // (emit will handle the listeners synchronously)
          interactionUpdateEmitter.emit(stat); // Emit locally
          io.emit(stat, newValue); // Emit to websocket
        }
      } catch (e) {
        console.log(`Failed to decrement stat ${stat}. Error ${e}`);
        return res.sendStatus(500);
      }

      return res.sendStatus(200);
    });
};