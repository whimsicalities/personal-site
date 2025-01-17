import cors, { CorsOptions } from "cors";
import { WhimsicalitiesRedisClient } from "../../types/WhimsicalitiesRedisClient";
import e from 'express';
import isPetStat from "./helpers/isPetStat";
import { WhimsicalitiesIo } from "../../types/WhimsicalitiesIo";
import { NodePgClient, NodePgDatabase } from "drizzle-orm/node-postgres";
import { interactionLogTable } from "../../postgresDb/schema";

export default function increaseStatRoute(
  app: e.Express,
  io: WhimsicalitiesIo,
  corsOptions: CorsOptions,
  redisClient: WhimsicalitiesRedisClient,
  db: NodePgDatabase<Record<string, never>> & { $client: NodePgClient }
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
          io.emit(stat, newValue);
          console.log(`Increased stat to ${newValue} from ${statValue}`);
          await db.insert(interactionLogTable).values({
            message: "interacted",
          });
        }
      } catch (e) {
        console.log(`Failed to decrement stat ${stat}. Error ${e}`);
        return res.sendStatus(500);
      }

      return res.sendStatus(200);
    });
};