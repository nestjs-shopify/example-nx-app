import { Repository } from 'typeorm';

import { SHOPIFY_API_CONTEXT } from '@nestjs-shopify/core';
import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AddHandlersParams,
  DeliveryMethod,
  Shopify,
} from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-01';

import { ShopEntity } from '../../../../entities/shop.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

// @WebhookHandler('PRODUCTS_CREATE')
// @WebhookHandler('APP_UNINSTALLED')
export class ProductsCreateWebhookHandler {
  private readonly logger = new Logger('PRODUCTS_CREATE');

  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepo: Repository<ShopEntity>,
    @Inject(SHOPIFY_API_CONTEXT)
    private readonly shopifyApi: Shopify<typeof restResources>,
    private readonly configService: ConfigService,
    @InjectQueue('shopifyWebhookQueue') private shopifyWebhookQueue: Queue
  ) {
    // super();
    const webhooks: AddHandlersParams = {
      APP_UNINSTALLED: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: this.configService.get<string>('WEBHOOK_PATH'),
        callback: this.webhookHandle.bind(this),
      },
      PRODUCTS_CREATE: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: this.configService.get<string>('WEBHOOK_PATH'),
        callback: this.webhookHandle.bind(this),
      },
    };
    this.shopifyApi.webhooks.addHandlers(webhooks);
  }
  async webhookHandle(topic, shop, body, webhookId) {
    // const payload = JSON.parse(body);
    this.logger.log(
      `Webhook ${webhookId} called for shop ID ${shop} with ${topic}`
    );
    // console.log(payload, body);
    const data = {
      topic,
      shop,
      body,
      webhookId,
    };
    this.shopifyWebhookQueue
      .add(data, {})
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        this.logger.error(error);
      });
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
