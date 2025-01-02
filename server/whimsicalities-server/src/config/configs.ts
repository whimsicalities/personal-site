import type EnvironmentsConfig from "./EnvironmentsConfig"

const configs: EnvironmentsConfig = {
    local: {
        port: 3000,
        redisUrl: "redis://localhost:6379",
        decaySpeedSeconds: 10,
    },
    test: {
        port: 3000,
        redisUrl: "redis://@redis:6379",
        decaySpeedSeconds: 10,
    },
    prod: {
        port: 3000,
        redisUrl: "redis://@redis:6379",
        decaySpeedSeconds: 36000,
    }
};

export default configs;