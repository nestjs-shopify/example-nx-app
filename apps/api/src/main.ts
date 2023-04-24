import '@shopify/shopify-api/adapters/node';

import fastify from 'fastify';

import {
  INestApplication,
  Logger,
  LogLevel,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app/app.module';
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

  let app: INestApplication = null;
  const fastifyEnabled = process.env.FASTIFY_ENABLED == "1" || false;
  if (!fastifyEnabled) {
    app = await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(),
      {
        logger: logLevelsDefault,
      }
    );
  } else {
    const instance = fastify();
    instance.addHook('onRequest', (request, reply, done) => {
      reply['setHeader'] = function (key, value) {
        return this.raw.setHeader(key, value);
      };
      reply['writeHead'] = function (key, value) {
        return this.raw.writeHead(key, value);
      };
      reply['end'] = function () {
        this.raw.end();
      };
      done();
    });
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(instance),
      {
        logger: logLevelsDefault,
        rawBody: true,
      }
    );
  }
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

  await app.listen(port, '0.0.0.0', async () => {
    Logger.log(`==========================================================`);
    Logger.log(`🚀 Application is running on: ${host}/${apiPrefix}`);
    Logger.log(`Login using: ${host}/?shop=${shop}`);
    Logger.log(`Install using: ${host}/${apiPrefix}/offline/auth?shop=${shop}`);
    Logger.log(`==========================================================`);
  });
}

bootstrap();
