import cors, { CorsOptions } from "cors";
import { WhimsicalitiesRedisClient } from "../../types/WhimsicalitiesRedisClient";
import e from 'express';
import IsPetStat from "./helpers/IsPetStat";

export default function getStatRoute(app: e.Express, corsOptions: CorsOptions, redisClient: WhimsicalitiesRedisClient) {
    app.get('/stats/:stat', cors(corsOptions), async (req, res) => {
      const stat = req.params.stat;
      if (IsPetStat(stat)) {
        const value = await redisClient.get(stat);
        return res.send(value);
      }
      res.status(400).end("Not a valid stat");
    });
};