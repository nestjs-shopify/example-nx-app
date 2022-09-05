import { Inject, Injectable } from '@nestjs/common';
import { ShopifyCoreConfig, shopifyCoreConfig } from '../config';
import { DatabaseSessionStorage } from '../../session/database.session-storage';
import {
  ShopifyCoreOptions,
  ShopifyCoreOptionsFactory,
} from '@nestjs-shopify/core';

@Injectable()
export class ShopifyCoreConfigService implements ShopifyCoreOptionsFactory {
  constructor(
    @Inject(shopifyCoreConfig.KEY)
    private readonly config: ShopifyCoreConfig,
    private readonly sessionStorage: DatabaseSessionStorage
  ) {}

  createShopifyCoreOptions(): ShopifyCoreOptions {
    return {
      ...this.config,
      sessionStorage: this.sessionStorage,
    };
  }
}
