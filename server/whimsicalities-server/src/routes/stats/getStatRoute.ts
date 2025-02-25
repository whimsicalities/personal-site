import cors, { CorsOptions } from "cors";
import { WhimsicalitiesRedisClient } from "../../types/WhimsicalitiesRedisClient";
import e from 'express';
import isPetStat from "./helpers/isPetStat";

export default function getStatRoute(
  app: e.Express,
  corsOptions: CorsOptions,
  redisClient: WhimsicalitiesRedisClient,
) {
    app.get('/stats/:stat', cors(corsOptions), async (req, res) => {
      const stat = req.params.stat;
      if (!isPetStat(stat)) {
        return res.status(400).end("Not a valid stat");
      }
      const statValue = await redisClient.get(stat);
      return res.send(statValue); 
    });
};