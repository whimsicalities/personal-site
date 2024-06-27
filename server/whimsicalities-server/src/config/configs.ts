import type EnvironmentsConfig from "./EnvironmentsConfig"

const configs: EnvironmentsConfig = {
    local: {
        port: 3000,
        corsOrigin: "http://localhost:4200",
    },
    test: {
        port: 3000,
        corsOrigin: "http://localhost:8080"
    },
}

export default configs;