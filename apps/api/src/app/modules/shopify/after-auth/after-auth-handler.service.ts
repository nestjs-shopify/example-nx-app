import { ShopifyAuthAfterHandler } from '@nestjs-shopify/auth';
import { ShopifyWebhooksService } from '@nestjs-shopify/webhooks';
import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { SessionEntity } from '../../../entities/session.entity';
import { ShopsService } from '../../shops/shops.service';

// import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class AfterAuthHandlerService implements ShopifyAuthAfterHandler {
  constructor(
    private readonly shopsService: ShopsService,
    private readonly webhookService: ShopifyWebhooksService
  ) {}

  async afterAuth(
    req: any, //IncomingMessage,
    resp: any, //ServerResponse,
    session: SessionEntity
  ): Promise<void> {
    const { isOnline, shop, accessToken } = session;
    let host = '';
    const fastifyEnabled = process.env.FASTIFY_ENABLED == '1' || false;

    if (fastifyEnabled) {
      // Logger.log("fastifyEnabled", req, req.query);//onionstudios.ddns.net/?shop=getting-started-for-dev.myshopify.com)
      host =
        req.query['host'] || req.headers['Host'];
    } else {
      host = req.query['host'];
    }
    // Logger.log("Host=", host, req.query);
    if (isOnline) {
      if (!(await this.shopsService.exists(shop))) {
        if (fastifyEnabled) {
          const res = resp.raw;
          res.writeHead(302, {
            Location: `/api/offline/auth?shop=${shop}`,
          });
          res.end();
          return;
        } else {
          return resp.redirect(`/api/offline/auth?shop=${shop}`);
        }
      }
      if (session.expires && session.expires <= new Date()) {
        //Session expired, get new one
        if (fastifyEnabled) {
          const res = resp.raw;
          res.writeHead(302, {
            Location: `/api/online/auth?shop=${shop}`,
          });
          res.end();
          return;
        } else {
          return resp.redirect(`/api/online/auth?shop=${shop}`);
        }
      }
      if (fastifyEnabled) {
        const res = resp.raw;
        res.writeHead(302, {
          Location: `/?shop=${shop}&host=${host}`,
        });
        res.end();
        return;
      } else {
        return resp.redirect(`/?shop=${shop}&host=${host}`);
      }
    }

    await this.shopsService.findOrCreate(shop, accessToken);
    Logger.log('Registering webhooks');
    await this.webhookService.registerWebhooks(session);
    if (fastifyEnabled) {
      const res = resp.raw;
      res.writeHead(302, {
        Location: `/api/online/auth?shop=${shop}`,
      });
      res.end();
      return;
    } else {
      return resp.redirect(`/api/online/auth?shop=${shop}`);
    }
  }
}
