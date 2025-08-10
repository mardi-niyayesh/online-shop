import { Product } from '@app/product/entities/product.entity';
import { PaginationResponse } from '@common/dto/pagination-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PaginateProductResponse extends PaginationResponse {
  @ApiProperty({ type: [Product] })
  data: Product[];
}
