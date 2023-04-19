export const appConfig = (): Record<string, unknown> => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT) || 8080,
  TIMEZONE: process.env.TIMEZONE || '+07:00',
  API_PREFIX: process.env.API_PREFIX
});
