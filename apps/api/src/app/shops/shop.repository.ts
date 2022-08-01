import { EntityRepository } from '@mikro-orm/sqlite';
import { ShopEntity } from './shop.entity';

export class ShopRepository extends EntityRepository<ShopEntity> {}
