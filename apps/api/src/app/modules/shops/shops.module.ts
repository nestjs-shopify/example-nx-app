import { Module } from '@nestjs/common';
import { ShopEntity } from '../../entities/shop.entity';
import { ShopsService } from './shops.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ShopEntity])],
  providers: [ShopsService],
  exports: [ShopsService],
})
export class ShopsModule {}
