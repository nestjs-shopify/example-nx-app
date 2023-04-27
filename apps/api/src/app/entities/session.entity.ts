import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

import {
  OnlineAccessInfo,
  Session,
} from '@shopify/shopify-api';

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

  @Column('timestamp', {
    name: 'created_at',
    select: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', {
    name: 'updated_at',
    select: false,
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
