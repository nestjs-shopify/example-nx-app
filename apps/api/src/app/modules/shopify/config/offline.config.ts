import { ShopifyAuthModuleOptions } from '@nestjs-shopify/auth';
import { ConfigType, registerAs } from '@nestjs/config';

export const SHOPIFY_OFFLINE_BASE_PATH = '/offline';

export const getShopifyOfflineConfig = (): ShopifyAuthModuleOptions => ({
  basePath: SHOPIFY_OFFLINE_BASE_PATH,
  useGlobalPrefix: true,
});

export const shopifyOfflineConfig = registerAs(
  'shopifyOffline',
  getShopifyOfflineConfig
);

export type ShopifyOfflineConfig = ConfigType<typeof getShopifyOfflineConfig>;
