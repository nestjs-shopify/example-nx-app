import { ShopifyAuthModule } from '@nestjs-shopify/auth';
import { ShopifyCoreModule } from '@nestjs-shopify/core';
import { ShopifyGraphqlProxyModule } from '@nestjs-shopify/graphql';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { BullModule, BullRootModuleOptions } from '@nestjs/bull';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RedisOptions } from 'ioredis';
import { AppController } from './app.controller';
import { ComponentModule } from './components/component.module';
import { appConfig } from './configs/app.config';
import { databaseConfig } from './configs/database.config';
import { DatabaseModule } from './database/database.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { LoggerModule } from './logger/logger.module';
import { ProductsModule } from './modules/products/products.module';
import { SessionModule } from './modules/session/session.module';
import { AfterAuthModule } from './modules/shopify/after-auth/after-auth.module';
import {
  shopifyCoreConfig,
  shopifyOfflineConfig,
  shopifyOnlineConfig,
} from './modules/shopify/config';
import { ShopifyCoreConfigService } from './modules/shopify/services/shopify-core-config.service';
import { ShopifyOfflineConfigService } from './modules/shopify/services/shopify-offline-config.service';
import { ShopifyOnlineConfigService } from './modules/shopify/services/shopify-online-config.service';
import { WebhooksModule } from './modules/shopify/webhooks/webhooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    DatabaseModule,
    ShopifyCoreModule.forRootAsync({
      imports: [ConfigModule.forFeature(shopifyCoreConfig), SessionModule],
      useClass: ShopifyCoreConfigService,
    }),
    ShopifyAuthModule.forRootAsyncOffline({
      imports: [ConfigModule.forFeature(shopifyOfflineConfig), AfterAuthModule],
      useClass: ShopifyOfflineConfigService,
    }),
    ShopifyAuthModule.forRootAsyncOnline({
      imports: [ConfigModule.forFeature(shopifyOnlineConfig), AfterAuthModule],
      useClass: ShopifyOnlineConfigService,
    }),
    BullModule.forRootAsync({
      useFactory: async (
        configService: ConfigService
      ): Promise<BullRootModuleOptions> => {
        const host = configService.get<string>('REDIS_HOST');
        const port = configService.get<number>('REDIS_PORT') || 6379;
        const password = configService.get<string>('REDIS_PASS');
        const db = configService.get<number>('REDIS_DB') || 1;
        const redisOption: RedisOptions = {
          host: host,
          port: port,
          password: password,
          db,
        };
        // console.log("BullModule", redisOption)
        return {
          redis: redisOption,
        };
      },
      inject: [ConfigService],
    }),
    ShopifyGraphqlProxyModule,
    LoggerModule,
    WebhooksModule,
    ProductsModule,
    ComponentModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
