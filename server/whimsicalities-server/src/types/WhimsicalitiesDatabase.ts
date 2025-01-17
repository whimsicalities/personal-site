import { NodePgClient, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../postgresDb/schema';

export type WhimsicalitiesDatabase = NodePgDatabase<typeof schema> & {
    $client: NodePgClient;
};
