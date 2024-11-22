export default interface EnvironmentConfig {
    port: number,
    corsOrigin: string,
    redisUrl: string,
    /** The length of time after which a stat decays by one point */
    decaySpeedSeconds: number,
}