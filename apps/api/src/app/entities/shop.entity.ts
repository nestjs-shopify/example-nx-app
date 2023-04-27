import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'shops' })
export class ShopEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'domain', type: 'varchar', nullable: true })
  domain: string;

  @Column({ name: 'access_token', type: 'varchar', nullable: true })
  accessToken: string;

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
