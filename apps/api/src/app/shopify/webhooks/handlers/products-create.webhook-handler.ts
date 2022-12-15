import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ShopifyWebhookHandler,
  WebhookHandler,
} from '@nestjs-shopify/webhooks';
import { Logger } from '@nestjs/common';
import { ShopEntity } from '../../../shops/shop.entity';
import { ShopRepository } from '../../../shops/shop.repository';

@WebhookHandler('PRODUCTS_CREATE')
export class ProductsCreateWebhookHandler extends ShopifyWebhookHandler<unknown> {
  private readonly logger = new Logger('PRODUCTS_CREATE');

  constructor(
    @InjectRepository(ShopEntity) private readonly shopRepo: ShopRepository
  ) {
    super();
  }

  async handle(
    domain: string,
    data: unknown,
    webhookId: string
  ): Promise<void> {
    const shop = await this.shopRepo.findOneOrFail({ domain });

    this.logger.log(`Webhook ${webhookId} called for shop ID ${shop}`);
    this.logger.log(data);
  }
}
