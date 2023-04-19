import { ShopifyAuthModuleOptions } from '@nestjs-shopify/auth';
import { ConfigType, registerAs } from '@nestjs/config';

export const SHOPIFY_ONLINE_BASE_PATH = '/online';

export const getShopifyOnlineConfig = (): ShopifyAuthModuleOptions => ({
  basePath: SHOPIFY_ONLINE_BASE_PATH,
  useGlobalPrefix: true,
  returnHeaders: true,
});

export const shopifyOnlineConfig = registerAs(
  'shopifyOnline',
  getShopifyOnlineConfig
);

export type ShopifyOnlineConfig = ConfigType<typeof getShopifyOnlineConfig>;
