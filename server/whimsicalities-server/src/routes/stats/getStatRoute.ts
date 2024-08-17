import cors, { CorsOptions } from "cors";
import { WhimsicalitiesRedisClient } from "../../types/WhimsicalitiesRedisClient";
import e from 'express';
import IsPetStat from "./helpers/IsPetStat";
import CalculateStatDecay from "./helpers/CalculateStatDecay";

export default function getStatRoute(app: e.Express, corsOptions: CorsOptions, redisClient: WhimsicalitiesRedisClient) {
    app.get('/stats/:stat', cors(corsOptions), async (req, res) => {
      const stat = req.params.stat;
      if (!IsPetStat(stat)) {
        return res.status(400).end("Not a valid stat");
      }
      const storedStat = await redisClient.hGetAll(stat);
      const decay = CalculateStatDecay(Number(storedStat.LastInteractionTime));
      return res.send((Number(storedStat.ValueAtLastInteraction) - decay).toString());
    });
};