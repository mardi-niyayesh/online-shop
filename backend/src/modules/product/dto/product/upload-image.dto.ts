import { Product } from '@app/product/entities/product.entity';
import { Exists } from '@common/validators/is-exist.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UploadImageDto {
  @ApiProperty({ format: 'binary', required: true })
  @IsOptional()
  image: string;

  @ApiProperty()
  @Exists(Product)
  productId: number;
}
