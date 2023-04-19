import { OnlineAccessInfo, Session } from '@shopify/shopify-api';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sessions' })
export class SessionEntity extends Session {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column()
  shop!: string;

  @Column()
  state: string;

  @Column()
  isOnline: boolean;

  @Column({ nullable: true })
  scope?: string;

  @Column({ type: Date, nullable: true })
  expires?: Date;

  @Column({ nullable: true })
  accessToken?: string;

  @Column({ type: 'json', nullable: true })
  onlineAccessInfo?: OnlineAccessInfo;
}
