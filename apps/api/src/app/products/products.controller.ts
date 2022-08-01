import { CurrentSession, ShopifyOnlineAuth } from '@nestjs-shopify/auth';
import { Controller, Get } from '@nestjs/common';
import { Session } from '@shopify/shopify-api/dist/auth/session';
import { Product } from '@shopify/shopify-api/dist/rest-resources/2022-04';

@ShopifyOnlineAuth()
@Controller('products')
export class ProductsController {
  @Get('count')
  async count(@CurrentSession() session: Session) {
    return await Product.count({ session });
  }
}
