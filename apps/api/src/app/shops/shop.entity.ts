import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { ShopRepository } from './shop.repository';

@Entity({
  tableName: 'shops',
  customRepository: () => ShopRepository,
})
export class ShopEntity {
  @PrimaryKey()
  public id: string = v4();

  @Property()
  public domain: string;

  @Property()
  public accessToken: string;
}
