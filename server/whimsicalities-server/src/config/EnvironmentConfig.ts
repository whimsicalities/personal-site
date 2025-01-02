export default interface EnvironmentConfig {
    port: number,
    redisUrl: string,
    /** The length of time after which a stat decays by one point */
    decaySpeedSeconds: number,
}