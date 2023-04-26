import {
  CurrentSession,
  UseShopifyAuth,
} from '@nestjs-shopify/auth';
import { SHOPIFY_API_CONTEXT } from '@nestjs-shopify/core';
import {
  Controller,
  Get,
  Inject,
  Redirect,
  Response,
} from '@nestjs/common';
import { Shopify } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-01';

import { SessionEntity } from '../../entities/session.entity';

@UseShopifyAuth()
@Controller('products')
export class ProductsController {
  constructor(
    @Inject(SHOPIFY_API_CONTEXT)
    private readonly shopifyApi: Shopify<typeof restResources>
  ) {}

  @Get('count')
  async count(@CurrentSession() session: SessionEntity) {

    // const postData = {
    //   client_id: process.env.SHOPIFY_API_KEY,
    //   client_secret: process.env.SHOPIFY_API_SECRET,
    //   refresh_token: "31867d396ab9bc13128d459c392402c2-1682517368",
    //   access_token: session.accessToken,
    // }
    // const response = await fetch(`https://${session.shop}/admin/oauth/access_token.json`, {
    //   method: "post",
    //   body: JSON.stringify(postData),
    //   headers: {"Content-Type": "application/json"}
    // })
    // console.log("response = ",session, postData, await response.json())
    return await this.shopifyApi.rest.Product.count({ session });
  }

  @Get('test')
  @Redirect()
  async test(
    @Response() res
    // @CurrentSession() session: SessionEntity
  ) {
    // console.log("test", res)
    // return
    res.header('location', 'https://vnexpress.net');
    // res.writeHead(302,'https://vnexpress.net');
    res.end();
    return;
    // return res.redirect("https://vnexpress.net")
    // return await this.shopifyApi.rest.Product.count({ session });
  }
}
