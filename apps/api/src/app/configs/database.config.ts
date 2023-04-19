export const databaseConfig = (): Record<string, unknown> => ({
  mysql_master: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB_NAME,
  },
  mysql_slave_general: {
    host: process.env.DATABASE_SLAVE_HOST || process.env.DATABASE_HOST,
    port:
      parseInt(
        process.env.DATABASE_SLAVE_PORT || process.env.DATABASE_PORT,
        10
      ) || 3306,
    username:
      process.env.DATABASE_SLAVE_USERNAME || process.env.DATABASE_USERNAME,
    password:
      process.env.DATABASE_SLAVE_PASSWORD || process.env.DATABASE_PASSWORD,
    database:
      process.env.DATABASE_SLAVE_DB_NAME || process.env.DATABASE_DB_NAME,
  },
  logging: ['all'],
  slave_servers: process.env.SLAVE_SERVERS || process.env.DATABASE_HOST,
});
