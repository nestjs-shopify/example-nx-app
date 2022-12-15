import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { OnlineAccessInfo, Session } from '@shopify/shopify-api';
import { SessionRepository } from './session.repository';

@Entity({
  tableName: 'sessions',
  customRepository: () => SessionRepository,
})
export class SessionEntity extends Session {
  @PrimaryKey({ type: 'string' })
  public id: string;

  @Property()
  public shop!: string;

  @Property()
  public state: string;

  @Property()
  public isOnline: boolean;

  @Property({ nullable: true })
  public scope?: string;

  @Property({ type: Date, nullable: true })
  public expires?: Date;

  @Property({ nullable: true })
  public accessToken?: string;

  @Property({ type: 'json', nullable: true })
  public onlineAccessInfo?: OnlineAccessInfo;
}
