import {
  ShopifyWebhookHandler,
  WebhookHandler,
} from '@nestjs-shopify/webhooks';
import { Logger } from '@nestjs/common';
import { ShopEntity } from '../../../../entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@WebhookHandler('PRODUCTS_CREATE')
export class ProductsCreateWebhookHandler extends ShopifyWebhookHandler<unknown> {
  private readonly logger = new Logger('PRODUCTS_CREATE');

  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepo: Repository<ShopEntity>
  ) {
    super();
  }

  async handle(
    domain: string,
    data: unknown,
    webhookId: string
  ): Promise<void> {
    const shop = await this.shopRepo.findOneBy({ domain });

    this.logger.log(`Webhook ${webhookId} called for shop ID ${shop}`);
    this.logger.log(data);
  }
}
