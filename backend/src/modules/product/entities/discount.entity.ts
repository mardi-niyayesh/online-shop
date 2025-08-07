import { BaseAppEntity } from '@common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductCategory } from './product-category.entity';
import { Product } from './product.entity';

@Entity()
export class Discount extends BaseAppEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  percent: number;

  @Column('date', { nullable: true })
  startDate: Date;

  @Column('date', { nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  minRange: number;

  @ManyToOne(() => Product, (product) => product.discounts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ nullable: true })
  productId: number;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.discounts,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'categoryId' })
  category: ProductCategory;

  @Column({ nullable: true })
  categoryId: number;
}
