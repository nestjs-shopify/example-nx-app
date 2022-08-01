import { Options } from '@mikro-orm/core';
import { ShopEntity } from '../src/app/shops/shop.entity';
import path from 'path';

const baseDir = path.resolve(__dirname, '../../..');

const config: Options = {
  entities: [ShopEntity],
  baseDir,
  type: 'sqlite',
  forceUtcTimezone: true,
  timezone: 'Europe/Amsterdam',
  dbName: 'api.sqlite3',
  debug: true,
};

export default config;
