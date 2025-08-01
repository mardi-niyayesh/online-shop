import { BaseAppEntity } from '@common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Role extends BaseAppEntity {
  @Column({ unique: true })
  title: string;

  @Column({ nullable: false })
  description: string;
}
