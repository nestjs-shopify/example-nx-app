import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ShopEntity } from './shop.entity';
import { ShopRepository } from './shop.repository';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(ShopEntity) private readonly repo: ShopRepository
  ) {}

  async findOrCreate(domain: string, accessToken: string): Promise<ShopEntity> {
    let shop = await this.repo.findOne({ domain });

    if (shop) {
      shop = this.repo.assign(shop, { accessToken });
    } else {
      shop = this.repo.create({
        domain,
        accessToken,
      });
    }

    await this.repo.getEntityManager().persistAndFlush(shop);
    return shop;
  }

  async exists(domain: string): Promise<boolean> {
    return !!(await this.repo.findOne({ domain }));
  }
}
