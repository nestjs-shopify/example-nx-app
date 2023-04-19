import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'shops' })
export class ShopEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  domain: string;

  @Column()
  accessToken: string;
}
