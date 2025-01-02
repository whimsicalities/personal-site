import { promises as fs } from 'node:fs';
import 'dotenv/config';
import Secrets from './Secrets';

export default async function readSecrets(): Promise<Secrets> {
    const secretsPath = process.env.SECRETS_PATH;
    if (!secretsPath) {
        throw new Error("No secrets path");
    }
    const data = await fs.readFile(secretsPath, 'utf8');
    const parsedData: Secrets = JSON.parse(data);
    if (!parsedData.corsOrigin) {
        throw new Error("Secrets missing");
    }
    return parsedData;
}