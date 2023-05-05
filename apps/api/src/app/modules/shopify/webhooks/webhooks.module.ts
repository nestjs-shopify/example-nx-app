import { ShopifyWebhooksModule } from '@nestjs-shopify/webhooks';
import { Module } from '@nestjs/common';
import { ShopEntity } from '../../../entities/shop.entity';
import { ProductsCreateWebhookHandler } from './handlers/products-create.webhook-handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopifyWebhookConsumer } from './webhook-queue-processor';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShopEntity]),
    ShopifyWebhooksModule.forRoot({
      path: '/shopify/webhooks',
    }),
    BullModule.registerQueue({
      name: 'shopifyWebhookQueue',
    }),
  ],
  providers: [ProductsCreateWebhookHandler, ShopifyWebhookConsumer],
})
export class WebhooksModule {}
