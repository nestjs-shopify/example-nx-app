import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAudit } from '../base/date.audit.entity';

@Entity({ name: 'shops' })
export class ShopEntity extends DateAudit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'domain', type: 'varchar', nullable: true })
  domain: string;

  @Column({ name: 'access_token', type: 'varchar', nullable: true })
  accessToken: string;

  constructor(partial: Partial<ShopEntity>) {
    super();
    Object.assign(this, partial);
  }
}
