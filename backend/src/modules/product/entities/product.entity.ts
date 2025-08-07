import { BaseAppEntity } from '@common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Discount } from './discount.entity';
import { ProductAttribute } from './product-attribute.entity';
import { ProductCategory } from './product-category.entity';
import { Rate } from './rate.entity';

@Entity()
export class Product extends BaseAppEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ nullable: true })
  image: string;

  //Discount category attribute rate entity relation
  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.products,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'categoryId' })
  category: ProductCategory;

  @Column()
  categoryId: number;

  @OneToMany(() => Rate, (rate) => rate.product)
  rates: Rate[];

  @OneToMany(() => ProductAttribute, (attribute) => attribute.product)
  attributes: ProductAttribute[];

  @OneToMany(() => Discount, (discount) => discount.product)
  discounts: Discount[];
}
