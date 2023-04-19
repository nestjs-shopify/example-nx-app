import { CurrentSession, UseShopifyAuth } from '@nestjs-shopify/auth';
import { SHOPIFY_API_CONTEXT } from '@nestjs-shopify/core';
import { Controller, Get, Inject } from '@nestjs/common';
import { Shopify } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2022-10';
import { SessionEntity } from '../../entities/session.entity';

@UseShopifyAuth()
@Controller('products')
export class ProductsController {
  constructor(
    @Inject(SHOPIFY_API_CONTEXT)
    private readonly shopifyApi: Shopify<typeof restResources>
  ) {}

  @Get('count')
  async count(@CurrentSession() session: SessionEntity) {
    return await this.shopifyApi.rest.Product.count({ session });
  }
}
