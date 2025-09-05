import { User } from '@app/user/entities/user.entity';
import { BaseAppEntity } from '@common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BasketItem } from './basket-item.entity';

@Entity()
export class Basket extends BaseAppEntity {
  @ManyToOne(() => User, (user) => user.baskets, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => BasketItem, (items) => items.basket)
  items: BasketItem[];
}
