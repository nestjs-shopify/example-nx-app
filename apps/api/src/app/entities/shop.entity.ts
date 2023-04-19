import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'shops' })
export class ShopEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'domain', type: 'varchar', nullable: true })
  domain: string;

  @Column({ name: 'access_token', type: 'varchar', nullable: true })
  accessToken: string;
}
