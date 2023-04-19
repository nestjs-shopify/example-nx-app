import { OnlineAccessInfo, Session } from '@shopify/shopify-api';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sessions' })
export class SessionEntity extends Session {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ name: 'shop', type: 'varchar', nullable: true })
  shop: string;

  @Column({ name: 'state', type: 'varchar', nullable: true })
  state: string;

  @Column({ name: 'is_online', type: 'tinyint', nullable: true })
  isOnline: boolean;

  @Column({ name: 'scope', type: 'varchar', nullable: true })
  scope: string;

  @Column({ name: 'expires', type: Date, nullable: true })
  expires: Date;

  @Column({ name: 'access_token', type: 'varchar', nullable: true })
  accessToken?: string;

  @Column({ name: 'online_access_info', type: 'json', nullable: true })
  onlineAccessInfo?: OnlineAccessInfo;
}
