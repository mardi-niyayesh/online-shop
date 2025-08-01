import { BaseAppEntity } from '@common/entity/base.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity()
export class Otp extends BaseAppEntity {
  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @Column({ type: 'varchar', nullable: false })
  code: string;

  @Column({ type: 'timestamp', nullable: false })
  expiresAt: Date;

  @BeforeInsert()
  setExpiresAt() {
    this.expiresAt = new Date(Date.now() + 2 * 60 * 1000);
  }
}
