import type EnvironmentsConfig from "./EnvironmentsConfig"

const configs: EnvironmentsConfig = {
    local: {
        port: 3000,
        corsOrigin: "http://localhost:4200",
        redisUrl: "redis://localhost:6379",
    },
    test: {
        port: 3000,
        corsOrigin: "http://localhost:8080",
        redisUrl: "redis://@redis:6379",
    },
    prod: {
        port: 3000,
        corsOrigin: "[redacted]",
        redisUrl: "redis://@redis:6379",
    }
}

export default configs;