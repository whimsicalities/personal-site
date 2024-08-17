import cors, { CorsOptions } from "cors";
import { WhimsicalitiesRedisClient } from "../../types/WhimsicalitiesRedisClient";
import e from 'express';
import IsPetStat from "./helpers/IsPetStat";
import CalculateStatDecay from "./helpers/CalculateStatDecay";

export default function increaseStatRoute(app: e.Express, corsOptions: CorsOptions, redisClient: WhimsicalitiesRedisClient) {
    app.post('/stats/increase', cors(corsOptions), async (req, res) => {
      let stat = req.body?.stat;
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
        await redisClient.hSet(stat, statRecord);
      }
      return res.sendStatus(200);
    });
};