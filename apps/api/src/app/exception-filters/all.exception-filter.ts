import {
  ShopifyAuthException,
  ShopifyAuthExceptionFilter,
} from '@nestjs-shopify/auth';
import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  constructor(private readonly shopifyFilter: ShopifyAuthExceptionFilter) {
    super();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof ShopifyAuthException) {
      return this.shopifyFilter.catch(exception, host);
    }

    return super.catch(exception, host);
  }
}
