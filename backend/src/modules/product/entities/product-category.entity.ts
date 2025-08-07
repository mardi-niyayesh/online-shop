import { BaseAppEntity } from '@common/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Discount } from './discount.entity';
import { Product } from './product.entity';

@Entity()
export class ProductCategory extends BaseAppEntity {
  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => Discount, (discount) => discount.category)
  discounts: Discount[];
}
