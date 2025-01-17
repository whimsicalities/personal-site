import { sql } from "drizzle-orm";
import { text, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const interactionLogTable = pgTable("interactionlog", {
    log_id: uuid().primaryKey().notNull().default(sql`gen_random_uuid()`),
    message: text(),
    time: timestamp().defaultNow(),
});

