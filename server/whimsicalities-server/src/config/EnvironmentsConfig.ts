import EnvironmentConfig from "./EnvironmentConfig";

export default interface EnvironmentsConfig {
    local: EnvironmentConfig,
    test: EnvironmentConfig,
    prod: EnvironmentConfig,
}