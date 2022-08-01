import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import config from '../../../db/mikro-orm.config';

const logger = new Logger('MikroORM');
export const getDatabaseConfig = (): MikroOrmModuleOptions => ({
  ...config,
  dbName: 'apps/api/api.sqlite3',
  logger: logger.log.bind(logger),
});

export const databaseConfig = registerAs('database', getDatabaseConfig);
