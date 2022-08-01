import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  ShopifyAuthOfflineModule,
  ShopifyAuthOnlineModule,
} from '@nestjs-shopify/auth';
import { ShopifyCoreModule } from '@nestjs-shopify/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { ExceptionFiltersModule } from './exception-filters/exception-filters.module';
import { ProductsModule } from './products/products.module';
import { AfterAuthModule } from './shopify/after-auth/after-auth.module';
import {
  shopifyCoreConfig,
  shopifyOfflineConfig,
  shopifyOnlineConfig,
} from './shopify/config';
import { ShopifyOfflineConfigService } from './shopify/services/shopify-offline-config.service';
import { ShopifyOnlineConfigService } from './shopify/services/shopify-online-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync(databaseConfig.asProvider()),
    ShopifyCoreModule.forRootAsync(shopifyCoreConfig.asProvider()),
    ShopifyAuthOfflineModule.forRootAsync({
      imports: [ConfigModule.forFeature(shopifyOfflineConfig), AfterAuthModule],
      useClass: ShopifyOfflineConfigService,
    }),
    ShopifyAuthOnlineModule.forRootAsync({
      imports: [ConfigModule.forFeature(shopifyOnlineConfig), AfterAuthModule],
      useClass: ShopifyOnlineConfigService,
    }),
    ExceptionFiltersModule,
    ProductsModule,
  ],
})
export class AppModule {}
