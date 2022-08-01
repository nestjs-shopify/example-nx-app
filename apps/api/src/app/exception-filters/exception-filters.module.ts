import { ShopifyAuthExceptionFilter } from '@nestjs-shopify/auth';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './all.exception-filter';

@Module({
  providers: [
    ShopifyAuthExceptionFilter,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class ExceptionFiltersModule {}
