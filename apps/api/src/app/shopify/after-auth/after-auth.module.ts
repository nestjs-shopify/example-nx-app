import { Module } from '@nestjs/common';
import { ShopsModule } from '../../shops/shops.module';
import { AfterAuthHandlerService } from './after-auth-handler.service';

@Module({
  imports: [ShopsModule],
  providers: [AfterAuthHandlerService],
  exports: [AfterAuthHandlerService],
})
export class AfterAuthModule {}
