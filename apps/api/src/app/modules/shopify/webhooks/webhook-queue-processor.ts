import { Processor, Process, OnQueueActive, OnQueueError } from '@nestjs/bull';
import { DoneCallback, Job } from 'bull';
import { SessionEntity, ShopEntity } from "../../../entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ShopsService } from "../../shops/shops.service";

@Processor('shopifyWebhookQueue')
export class ShopifyWebhookConsumer {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepo: Repository<ShopEntity>,
  ) {

  }
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueError()
  onError(error: Error) {
    console.error(
      error,
    );
  }

  @Process()
  async transcode(job: Job<any>, done: DoneCallback) {
    console.log('Processing 1 ', job.data);
    if (!job.data) {
      return done();
    }
    const shop = job.data.shop;
    const body = JSON.parse(job.data.body);
    const webhookId = job.data.webhookId;
    switch (job.data.topic) {
      case 'PRODUCTS_CREATE':
        break;
      case 'APP_UNINSTALLED':
        void await this.shopRepo.delete({domain: shop})
        void await this.shopRepo.manager.delete(SessionEntity,{shop})
        break;
    }
    return done();
  }
}
