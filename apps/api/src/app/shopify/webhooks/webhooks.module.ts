import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ShopifyWebhooksModule } from '@nestjs-shopify/webhooks';
import { Module } from '@nestjs/common';
import { ShopEntity } from '../../shops/shop.entity';
import { ProductsCreateWebhookHandler } from './handlers/products-create.webhook-handler';

@Module({
  imports: [
    MikroOrmModule.forFeature([ShopEntity]),
    ShopifyWebhooksModule.forRoot({
      path: '/shopify/webhooks',
    }),
  ],
  providers: [ProductsCreateWebhookHandler],
})
export class WebhooksModule {}
