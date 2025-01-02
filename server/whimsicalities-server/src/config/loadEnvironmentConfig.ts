import 'dotenv/config';
import EnvironmentConfig from './EnvironmentConfig';

export default function loadEnvironmentConfig(): EnvironmentConfig {
    const portString = Number(process.env.PORT);
    if (!portString) {
        throw new Error("Missing PORT environment config");
    }
    const port = Number(portString);
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
        throw new Error("Missing REDIS_URL environment config");
    }
    const decaySpeedSecondsString = process.env.DECAY_SPEED_SECONDS;
    if (!decaySpeedSecondsString) {
        throw new Error("Missing DECAY_SPEED_SECONDS environment config");
    }
    const decaySpeedSeconds = Number(decaySpeedSecondsString);
    return {
        port, redisUrl, decaySpeedSeconds,
    };
}