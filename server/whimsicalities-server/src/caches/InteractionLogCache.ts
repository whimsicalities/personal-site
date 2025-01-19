import EventEmitter from "events";
import { PET_STATS } from "../PET_STATS";
import { WhimsicalitiesDatabase } from "../types/WhimsicalitiesDatabase";

export default class InteractionLogCache {
    private db: WhimsicalitiesDatabase;

    public lastFiveInteractions?: { log_id: string, time: Date | null, message: string | null}[];

    private constructor(db: WhimsicalitiesDatabase, interactionUpdateEmitter: EventEmitter) {
        this.db = db;

        for (const petStat of PET_STATS) {
            interactionUpdateEmitter.on(petStat, async () => {
                await this.updateInteractions();
            });
        }
    }

    /** Replace cache with the most recent interactions */
    async updateInteractions() {
        const lastFiveInteractions = await this.db.query.interactionLogTable.findMany({
            limit: 10,
            orderBy: (interactionLog, { desc }) => [desc(interactionLog.time)],
        });
        this.lastFiveInteractions = lastFiveInteractions;
    }

    static async CreateInteractionLogCache(db: WhimsicalitiesDatabase, interactionUpdateEmitter: EventEmitter): Promise<InteractionLogCache> {
        const cache = new InteractionLogCache(db, interactionUpdateEmitter);
        await cache.updateInteractions();
        return cache;
    }
}