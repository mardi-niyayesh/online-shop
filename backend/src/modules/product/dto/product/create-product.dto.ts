import { ProductCategory } from '@app/product/entities/product-category.entity';
import { Exists } from '@common/validators/is-exist.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAttributeDto } from '../attribute/create-attribute.dto';

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

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  @Exists(ProductCategory)
  categoryId: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateAttributeDto)
  attributes: CreateAttributeDto;
}
