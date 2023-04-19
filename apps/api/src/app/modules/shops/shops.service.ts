import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopEntity } from '../../entities/shop.entity';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(ShopEntity) private readonly repo: Repository<ShopEntity>
  ) {}

  async findOrCreate(domain: string, accessToken: string): Promise<ShopEntity> {
    let shop = await this.repo.findOne({ where: { domain } });
    console.log('logggggggggggggggggggggggggggggggggggggggggggggggggggg');
    console.log(shop);
    
    if (shop) {
      await this.repo.update(shop.id, { accessToken });
    } else {
      shop = await this.repo.save({
        domain,
        accessToken,
      });
    }
    return shop;
  }

  async exists(domain: string): Promise<boolean> {
    return !!(await this.repo.findOne({ where: { domain } }));
  }
}
