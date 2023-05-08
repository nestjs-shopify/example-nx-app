import 'reflect-metadata';

import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { ConfigService } from '@nestjs/config';

config({ path: './apps/api/.env' });
const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: (configService.get<string>('DATABASE_CONNECTION') as any) || 'mysql',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_DB_NAME'),
  dropSchema: false,
  keepConnectionAlive: true,
  logging: 'all',
  logger: 'advanced-console',
  migrations: ['./apps/api/src/app/database/migrations/*.ts'],
  entities: [],
  // ssl: {
  //     require: false,
  //     rejectUnauthorized: false,
  // },
} as DataSourceOptions);

// console.log(AppDataSource.options);
