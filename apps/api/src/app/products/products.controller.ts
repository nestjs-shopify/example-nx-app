import { CurrentSession, UseShopifyAuth } from '@nestjs-shopify/auth';
import { InjectShopify } from '@nestjs-shopify/core';
import { Controller, Get } from '@nestjs/common';
import { ConfigParams, Shopify } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-07';
import { SessionEntity } from '../session/session.entity';

@UseShopifyAuth()
@Controller('products')
export class ProductsController {
  constructor(
    @InjectShopify()
    private readonly shopifyApi: Shopify<ConfigParams<typeof restResources>>
  ) {}

  @Get('count')
  async count(@CurrentSession() session: SessionEntity) {
    return await this.shopifyApi.rest.Product.count({ session });
  }
}
