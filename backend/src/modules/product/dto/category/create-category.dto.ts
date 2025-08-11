import { ProductCategory } from '@app/product/entities/product-category.entity';
import { IsUnique } from '@common/validators/is-unique.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'title 1' })
  @IsUnique(ProductCategory)
  @IsString()
  title: string;

  @ApiProperty({ required: false, example: 'description 1' })
  @IsString()
  @IsOptional()
  description: string;
}
