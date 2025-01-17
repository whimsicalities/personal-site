import cors, { CorsOptions } from "cors";
import e from 'express';
import { WhimsicalitiesDatabase } from "../types/WhimsicalitiesDatabase";


export default function getInteractionLogRoute(
    app: e.Express,
    corsOptions: CorsOptions,
    db: WhimsicalitiesDatabase
) {
    app.get("/interaction-log", cors(corsOptions), async (_, res) => {
        // TODO - could hold a cache that listens to the websocket for when to update

        // Get the most recent 5 interactions
       const lastFiveInteractions = await db.query.interactionLogTable.findMany({
            limit: 10,
            orderBy: (interactionLog, { desc }) => [desc(interactionLog.time)],
        });
        return res.send(lastFiveInteractions);
    });
}