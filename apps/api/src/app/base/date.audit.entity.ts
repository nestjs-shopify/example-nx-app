import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class DateAudit extends BaseEntity {
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', select: false })
  updatedAt: Date;
}
