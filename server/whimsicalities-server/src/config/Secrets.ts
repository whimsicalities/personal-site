export default interface Secrets {
    corsOrigin: string;
    /** postgres://username:password{'at' symbol}host:port/database_name */
    postgresUrl: string;
}