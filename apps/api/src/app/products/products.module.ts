import { ShopifyAuthModule } from '@nestjs-shopify/auth';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';

@Module({
  imports: [ShopifyAuthModule.register()],
  controllers: [ProductsController],
})
export class ProductsModule {}
