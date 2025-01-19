import cors, { CorsOptions } from "cors";
import e from 'express';
import InteractionLogCache from "../caches/InteractionLogCache";


export default function getInteractionLogRoute(
    app: e.Express,
    corsOptions: CorsOptions,
    interactionLogCache: InteractionLogCache,
) {
    app.get("/interaction-log", cors(corsOptions), async (_, res) => {
       const lastFiveInteractions = interactionLogCache.lastFiveInteractions;
        return res.send(lastFiveInteractions);
    });
}