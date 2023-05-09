import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DateAudit } from '../base/date.audit.entity';

@Entity({ name: 'shop' })
export class ShopEntity extends DateAudit {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true, name: "id" })
  id: number;

  @Column({ name: 'domain', type: 'varchar', nullable: true })
  domain: string;

  @Column({ name: 'access_token', type: 'varchar', nullable: true })
  accessToken: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', select: false })
  updatedAt: Date;

  constructor(partial: Partial<ShopEntity>) {
    super();
    Object.assign(this, partial);
  }
}
