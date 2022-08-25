import { CurrentSession, UseShopifyAuth } from '@nestjs-shopify/auth';
import { Controller, Get } from '@nestjs/common';
import { Session } from '@shopify/shopify-api/dist/auth/session';
import { Product } from '@shopify/shopify-api/dist/rest-resources/2022-04';

@UseShopifyAuth()
@Controller('products')
export class ProductsController {
  @Get('count')
  async count(@CurrentSession() session: Session) {
    return await Product.count({ session });
  }
}
