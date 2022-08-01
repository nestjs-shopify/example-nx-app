import { ShopifyAuthAfterHandler } from '@nestjs-shopify/auth';
import { Injectable } from '@nestjs/common';
import { SessionInterface } from '@shopify/shopify-api';
import { Request, Response } from 'express';
import { ShopsService } from '../../shops/shops.service';

@Injectable()
export class AfterAuthHandlerService implements ShopifyAuthAfterHandler {
  constructor(private readonly shopsService: ShopsService) {}

  async afterAuth(
    req: Request,
    res: Response,
    session: SessionInterface
  ): Promise<void> {
    const { isOnline, shop, accessToken } = session;
    const { host } = req.query;

    if (isOnline) {
      if (!(await this.shopsService.exists(shop))) {
        return res.redirect(`/api/offline/auth?shop=${shop}`);
      }

      return res.redirect(`/?shop=${shop}&host=${host}`);
    }

    await this.shopsService.findOrCreate(shop, accessToken);

    return res.redirect(`/api/online/auth?shop=${shop}`);
  }
}
