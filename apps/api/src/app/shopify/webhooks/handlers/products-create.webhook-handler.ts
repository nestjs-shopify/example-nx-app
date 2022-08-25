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

  async handle(domain: string, data: unknown): Promise<void> {
    const shop = await this.shopRepo.findOneOrFail({ domain });

    this.logger.debug(`Webhook called for shop ID ${shop.id}`);
    this.logger.log(data);
  }
}
