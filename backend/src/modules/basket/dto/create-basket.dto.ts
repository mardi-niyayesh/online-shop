import { Product } from '@app/product/entities/product.entity';
import { Exists } from '@common/validators/is-exist.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive, Max, Min } from 'class-validator';

export class CreateBasketDto {
  @ApiProperty({ example: 1 })
  @Exists(Product)
  productId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Max(100)
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 14_000_00 })
  @IsNumber()
  @IsPositive()
  price: number;
}
