import { Options } from '@mikro-orm/core';
import { ShopEntity } from '../src/app/shops/shop.entity';
import path from 'path';
import { SessionEntity } from '../src/app/session/session.entity';

const baseDir = path.resolve(__dirname, '../../..');

const config: Options = {
  entities: [ShopEntity, SessionEntity],
  baseDir,
  type: 'sqlite',
  forceUtcTimezone: true,
  timezone: 'Europe/Amsterdam',
  dbName: 'api.sqlite3',
  debug: true,
};

export default config;
