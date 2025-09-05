import { Product } from '@app/product/entities/product.entity';
import { BaseAppEntity } from '@common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Basket } from './basket.entity';

@Entity()
export class BasketItem extends BaseAppEntity {
  @ManyToOne(() => Basket, (basket) => basket.items, { onDelete: 'CASCADE' })
  @JoinColumn()
  basket: Basket;

  @Column()
  basketId: number;

  @ManyToOne(() => Product, (product) => product.basketItems, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  product: Product;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}
