import { ProductCategory } from '@app/product/entities/product-category.entity';
import { Product } from '@app/product/entities/product.entity';
import { Exists } from '@common/validators/is-exist.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreateDiscountDto {
  @ApiProperty({ required: false, example: 'discount name' })
  @IsOptional()
  name: string;

  @ApiProperty({ example: 30 })
  @Min(1)
  @Max(100)
  percent: number;

  @ApiProperty({ required: false, example: '2025-08-17' })
  @IsDateString()
  @IsOptional()
  startDate: Date;

  @ApiProperty({ required: false, example: '2025-09-17' })
  @IsDateString()
  @IsOptional()
  endDate: Date;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  minRange: number;

  @ApiProperty({ example: 1, required: false })
  @Exists(Product)
  @IsOptional()
  productId: number;

  @ApiProperty({ example: 1, required: false })
  @Exists(ProductCategory)
  @IsOptional()
  categoryId: number;
}
