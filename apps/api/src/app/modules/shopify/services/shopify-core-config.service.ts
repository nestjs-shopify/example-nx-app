import { Inject, Injectable } from '@nestjs/common';
import { ShopifyCoreConfig, shopifyCoreConfig } from '../config';
import { DatabaseSessionStorage } from '../../session/database.session-storage';
import { ShopifyCoreOptions } from '@nestjs-shopify/core';

@Injectable()
export class ShopifyCoreConfigService {
  constructor(
    @Inject(shopifyCoreConfig.KEY)
    private readonly config: ShopifyCoreConfig,
    private readonly sessionStorage: DatabaseSessionStorage
  ) {}

  public create(): ShopifyCoreOptions {
    return {
      ...this.config,
      sessionStorage: this.sessionStorage,
    };
  }
}
