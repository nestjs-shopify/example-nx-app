import { ShopifyAuthModule } from '@nestjs-shopify/auth';
import { ShopifyCoreModule } from '@nestjs-shopify/core';
import { ShopifyGraphqlProxyModule } from '@nestjs-shopify/graphql';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './configs/app.config';
import { databaseConfig } from './configs/database.config';
import { DatabaseModule } from './database/database.module';
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
import { ComponentModule } from './components/component.module';

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
    ShopifyGraphqlProxyModule,
    WebhooksModule,
    ProductsModule,
    ComponentModule,
  ],
})
export class AppModule {}
