import { Product } from '@app/product/entities/product.entity';
import { Exists } from '@common/validators/is-exist.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateFeedbackDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rate: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  message: string;

  @ApiProperty()
  @Exists(Product)
  productId: number;

  @IsOptional()
  userId?: number;
}
