import { ShopifyCoreOptions } from '@nestjs-shopify/core';
import { ConfigType, registerAs } from '@nestjs/config';
import { ApiVersion } from '@shopify/shopify-api';

export const getShopifyCoreConfig = (): ShopifyCoreOptions => ({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecret: process.env.SHOPIFY_API_SECRET,
  apiVersion: ApiVersion.April22,
  hostName: process.env.HOST.replace(/https?:\/\//, ''),
  isEmbeddedApp: true,
  scopes: ['write_products'],
});

export const shopifyCoreConfig = registerAs(
  'shopifyCore',
  getShopifyCoreConfig
);

export type ShopifyCoreConfig = ConfigType<typeof getShopifyCoreConfig>;
