import cors, { CorsOptions } from "cors";
import { WhimsicalitiesRedisClient } from "../../types/WhimsicalitiesRedisClient";
import e from 'express';
import IsPetStat from "./helpers/IsPetStat";

export default function increaseStatRoute(app: e.Express, corsOptions: CorsOptions, redisClient: WhimsicalitiesRedisClient) {
    app.post('/stats/increase', cors(corsOptions), async (req, res) => {
      let stat = req.body?.stat;
      stat = stat.toString();
      if (IsPetStat(stat)) {
        await redisClient.incr(stat);
        return res.sendStatus(200);
      }
      res.status(400).end("Not a valid stat");
    });
};