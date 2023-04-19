import { ShopifyWebhooksModule } from '@nestjs-shopify/webhooks';
import { Module } from '@nestjs/common';
import { ShopEntity } from '../../../entities/shop.entity';
import { ProductsCreateWebhookHandler } from './handlers/products-create.webhook-handler';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShopEntity]),
    ShopifyWebhooksModule.forRoot({
      path: '/shopify/webhooks',
    }),
  ],
  providers: [ProductsCreateWebhookHandler],
})
export class WebhooksModule {}
