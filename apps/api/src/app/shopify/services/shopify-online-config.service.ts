import {
  ShopifyAuthModuleOptions,
  ShopifyAuthOptionsFactory,
} from '@nestjs-shopify/auth';
import { Inject, Injectable } from '@nestjs/common';
import {
  ShopifyOnlineConfig,
  shopifyOnlineConfig,
} from '../config/online.config';
import { AfterAuthHandlerService } from '../after-auth/after-auth-handler.service';

@Injectable()
export class ShopifyOnlineConfigService implements ShopifyAuthOptionsFactory {
  constructor(
    @Inject(shopifyOnlineConfig.KEY)
    private readonly config: ShopifyOnlineConfig,
    private readonly afterAuthHandler: AfterAuthHandlerService
  ) {}

  createShopifyAuthOptions(): ShopifyAuthModuleOptions {
    return {
      ...this.config,
      afterAuthHandler: this.afterAuthHandler,
    };
  }
}
