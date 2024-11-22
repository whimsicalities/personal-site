import cors, { CorsOptions } from "cors";
import { WhimsicalitiesRedisClient } from "../../types/WhimsicalitiesRedisClient";
import e from 'express';
import IsPetStat from "./helpers/IsPetStat";
import CalculateStatDecay from "./helpers/CalculateStatDecay";
import { DefaultEventsMap, Server } from 'socket.io';

export default function increaseStatRoute(
  app: e.Express,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  corsOptions: CorsOptions, redisClient: WhimsicalitiesRedisClient
) {
    app.post('/stats/increase', cors(corsOptions), async (req, res) => {
      let stat = req.body?.stat;
      // Stat ought to be a number, which needs to be stringified to use as a redis key
      stat = stat.toString();
      if (!IsPetStat(stat)) {
        return res.status(400).end("Not a valid stat");
      }
      const statRecord = await redisClient.hGetAll(stat);
      const statDecay = CalculateStatDecay(Number(statRecord.LastInteractionTime));
      const oldStatValue = Number(statRecord.ValueAtLastInteraction);
      let newStatValue = Math.max(oldStatValue - statDecay, 0);
      if (newStatValue < 100) {
        newStatValue += 1;
      }
      if (newStatValue != oldStatValue) {
        statRecord.ValueAtLastInteraction = (newStatValue).toString();
        statRecord.LastInteractionTime = Date.now().toString();
        io.emit(stat, newStatValue)
        await redisClient.hSet(stat, statRecord);
      }

      return res.sendStatus(200);
    });
};