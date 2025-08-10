import { ProductCategory } from '@app/product/entities/product-category.entity';
import { Exists } from '@common/validators/is-exist.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: 'name 1', required: false })
  @IsString()
  @Type(() => String)
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'description 1', required: false })
  @IsString()
  @Type(() => String)
  @IsOptional()
  description: string;

  @ApiProperty({ example: '12.34', required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  price: number;

  @ApiProperty({ format: 'binary', required: false })
  @IsOptional()
  image: string;

  @ApiProperty({ example: 1, required: true })
  @Type(() => Number)
  @IsNumber()
  @Exists(ProductCategory)
  categoryId: number;
}
