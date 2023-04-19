import '@shopify/shopify-api/adapters/node';
import { LogLevel, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationConfig } from './app/configs/validation.config';

async function bootstrap() {
  let logLevelsDefault: LogLevel[] = [
    'log',
    'error',
    'warn',
    'debug',
    'verbose',
  ];

  const logLevel = process.env.LOG_LEVEL || 'log,error,warn,debug,verbose';
  logLevelsDefault = logLevel.split(',') as LogLevel[];
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      logger: logLevelsDefault,
    }
  );
  // ------------- Config ---------------
  const configService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT') || 3333;
  const host: string =
    configService.get<string>('HOST') || `http://localhost:${port}`;
  const shop: string = configService.get<string>('SHOP');
  const apiPrefix = configService.get<string>('API_PREFIX') || 'api';
  // -------------------------------------------

  // -------------- Global --------------
  app.enableShutdownHooks();
  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(new ValidationPipe(ValidationConfig));
  // -------------------------------------------

  await app.listen(port, async () => {
    Logger.log(`==========================================================`);
    Logger.log(`🚀 Application is running on: ${host}/${apiPrefix}`);
    Logger.log(`Login using: ${host}/?shop=${shop}`);
    Logger.log(
      `Install using: ${host}/${apiPrefix}/offline/auth?shop=${shop}`
    );
    Logger.log(`==========================================================`);
  });
}

bootstrap();
