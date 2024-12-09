import cors, { CorsOptions } from "cors";
import { WhimsicalitiesRedisClient } from "../../types/WhimsicalitiesRedisClient";
import e from 'express';
import IsPetStat from "./helpers/IsPetStat";
import { WhimsicalitiesIo } from "../../types/WhimsicalitiesIo";

export default function increaseStatRoute(
  app: e.Express,
  io: WhimsicalitiesIo,
  corsOptions: CorsOptions,
  redisClient: WhimsicalitiesRedisClient,
) {
    app.post('/stats/increase', cors(corsOptions), async (req, res) => {
      let stat = req.body?.stat;
      // Stat ought to be a number, which needs to be stringified to use as a redis key
      stat = stat.toString();
      if (!IsPetStat(stat)) {
        return res.status(400).end("Not a valid stat");
      }
      try {
        const statValue = Number(await redisClient.get(stat));
        if (statValue < 100) {
            await redisClient.incr(stat);
        }
        io.emit(stat, statValue + 1);
      } catch (e) {
        console.log(`Failed to decrement stat ${stat}. Error ${e}`);
        return res.sendStatus(500);
      }

      return res.sendStatus(200);
    });
};