import { JwtAppService } from '@app/auth/services/jwt.service';
import { S3Service } from '@common/services/s3.service';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountController } from './controller/discount.controller';
import { FeedBackController } from './controller/feedback.controller';
import { ProductCategoryController } from './controller/product-category.controller';
import { ProductController } from './controller/product.controller';
import { Discount } from './entities/discount.entity';
import { ProductAttribute } from './entities/product-attribute.entity';
import { ProductCategory } from './entities/product-category.entity';
import { Product } from './entities/product.entity';
import { Rate } from './entities/rate.entity';
import { DiscountService } from './service/discount.service';
import { FeedBackService } from './service/feedback.service';
import { ProductCategoryService } from './service/product-category.service';
import { ProductService } from './service/product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategory,
      Product,
      Discount,
      ProductAttribute,
      Rate,
    ]),
  ],
  controllers: [
    ProductCategoryController,
    ProductController,
    FeedBackController,
    DiscountController,
  ],
  providers: [
    ProductCategoryService,
    ProductService,
    S3Service,
    JwtAppService,
    JwtService,
    FeedBackService,
    DiscountService,
  ],
})
export class ProductModule {}
