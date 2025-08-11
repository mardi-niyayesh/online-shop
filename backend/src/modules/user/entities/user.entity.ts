import { Rate } from '@app/product/entities/rate.entity';
import { BaseAppEntity } from '@common/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseAppEntity {
  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ unique: true })
  phone: string;

  @Column({ default: false })
  isVerified: boolean;

  //Feature
  @Column({ nullable: true })
  roleId: string;

  @OneToMany(() => Rate, (rate) => rate.user)
  rates: Rate[];
}
