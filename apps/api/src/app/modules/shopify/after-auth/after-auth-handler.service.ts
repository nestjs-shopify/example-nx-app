import { ShopifyAuthAfterHandler } from '@nestjs-shopify/auth';
import { ShopifyWebhooksService } from '@nestjs-shopify/webhooks';
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  InjectShopifySessionStorage,
  SHOPIFY_API_CONTEXT,
} from '@nestjs-shopify/core';
import { Shopify } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-01';

import { SessionEntity } from '../../../entities/session.entity';
import { ShopsService } from '../../shops/shops.service';
import { DatabaseSessionStorage } from '../../session/database.session-storage';

// import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class AfterAuthHandlerService implements ShopifyAuthAfterHandler {
  constructor(
    @Inject(SHOPIFY_API_CONTEXT)
    private readonly shopifyApi: Shopify<typeof restResources>,
    private readonly shopsService: ShopsService,
    private readonly webhookService: ShopifyWebhooksService,
    @InjectShopifySessionStorage()
    private readonly databaseSessionStorage: DatabaseSessionStorage
  ) {}

  async afterAuth(
    req: any, //IncomingMessage,
    res: any, //ServerResponse,
    session: SessionEntity
  ): Promise<void> {
    const { isOnline, shop, accessToken } = session;

    // If this is an offline OAuth process
    //  - store shop
    //  - register webhooks
    //  - immediately kick off the online one
    if (!isOnline) {
      await this.shopsService.findOrCreate(shop, accessToken);

      Logger.log('Registering webhooks');
      await this.webhookService.registerWebhooks(session);

      Logger.log(
        'Completing offline token OAuth, redirecting to online token OAuth'
      );
      this.redirect(res, `/api/online/auth?shop=${shop}`);

      return;
    }

    if (!(await this.shopsService.exists(shop))) {
      Logger.log(
        'Shop not found, redirecting to offline token OAuth to install app'
      );
      this.redirect(res, `/api/offline/auth?shop=${shop}`);
      return;
    }

    Logger.log(
      'Completing online token OAuth, redirecting to Shopify or App Root'
    );
    this.redirectToShopifyOrAppRoot(req, res, shop);
  }

  private async redirectToShopifyOrAppRoot(req: any, res: any, shop: string) {
    const fastifyEnabled = process.env.FASTIFY_ENABLED == '1' || false;
    const { isEmbeddedApp } = this.shopifyApi.config;
    const appInstalled = await this.databaseSessionStorage.findSessionsByShop(
      req.query.shop
    );

    if (!appInstalled && !req.url.match(/^\/exitiframe/i)) {
      await this.redirectToAuth(req, res);
      return;
    }

    let redirectUrl: string;
    if (isEmbeddedApp) {
      redirectUrl = await this.shopifyApi.auth.getEmbeddedAppUrl({
        rawRequest: fastifyEnabled ? req.raw : req,
        rawResponse: fastifyEnabled ? res.raw : res,
      });
    } else {
      const host = req.query['host'];
      redirectUrl = `/?shop=${shop}&host=${encodeURIComponent(host)}`;
    }

    this.redirect(res, redirectUrl);
  }

  private redirect(res: any, redirectUrl: string): void {
    const fastifyEnabled = process.env.FASTIFY_ENABLED == '1' || false;

    Logger.log(`Redirecting to host at ${redirectUrl}`);

    if (fastifyEnabled) {
      res.raw
        .writeHead(302, {
          Location: redirectUrl,
        })
        .end();
    } else {
      res.redirect(redirectUrl);
    }
  }

  async redirectToAuth(request, reply) {
    if (!request.query.shop) {
      return reply.code(500).send('No shop provided');
    }

    if (request.query.embedded === '1') {
      return this.clientSideRedirect(request, reply);
    }

    return await this.serverSideRedirect(request, reply);
  }

  clientSideRedirect(request, reply) {
    const shop = this.shopifyApi.utils.sanitizeShop(request.query.shop);
    const redirectUriParams = new URLSearchParams({
      shop,
      host: request.query.host,
    }).toString();
    const queryParams = new URLSearchParams({
      ...request.query,
      shop,
      redirectUri: `https://${this.shopifyApi.config.hostName}/api/offline/auth?${redirectUriParams}`,
    }).toString();

    return reply.redirect(`/exitiframe?${queryParams}`);
  }

  async serverSideRedirect(request, reply) {
    await this.shopifyApi.auth.begin({
      rawRequest: request.raw,
      rawResponse: reply.raw,
      shop: request.query.shop,
      callbackPath: '/api/auth/offline/callback',
      isOnline: false,
    });
  }
}
