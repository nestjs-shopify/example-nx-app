import {
  ShopifyAuthModuleOptions,
  ShopifyAuthOptionsFactory,
} from '@nestjs-shopify/auth';
import { Inject, Injectable } from '@nestjs/common';
import {
  ShopifyOfflineConfig,
  shopifyOfflineConfig,
} from '../config/offline.config';
import { AfterAuthHandlerService } from '../after-auth/after-auth-handler.service';

@Injectable()
export class ShopifyOfflineConfigService implements ShopifyAuthOptionsFactory {
  constructor(
    @Inject(shopifyOfflineConfig.KEY)
    private readonly config: ShopifyOfflineConfig,
    private readonly afterAuthHandler: AfterAuthHandlerService
  ) {}

  createShopifyAuthOptions(): ShopifyAuthModuleOptions {
    return {
      ...this.config,
      afterAuthHandler: this.afterAuthHandler,
    };
  }
}
