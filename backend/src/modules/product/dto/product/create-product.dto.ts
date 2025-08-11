import { ProductCategory } from '@app/product/entities/product-category.entity';
import { Exists } from '@common/validators/is-exist.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'name 1' })
  @IsString()
  @Type(() => String)
  name: string;

  @ApiProperty({ example: 'description 1', required: false })
  @IsString()
  @Type(() => String)
  @IsOptional()
  description: string;

  @ApiProperty({ example: '12.34' })
  @IsNumber()
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  stock: number;

  @ApiProperty({ format: 'binary', required: false })
  @IsOptional()
  image: string;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  @Exists(ProductCategory)
  categoryId: number;
}
