import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ShopEntity } from './shop.entity';
import { ShopsService } from './shops.service';

@Module({
  imports: [MikroOrmModule.forFeature([ShopEntity])],
  providers: [ShopsService],
  exports: [ShopsService],
})
export class ShopsModule {}
