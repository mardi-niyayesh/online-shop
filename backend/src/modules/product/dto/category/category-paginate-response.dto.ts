import { ProductCategory } from '@app/product/entities/product-category.entity';
import { PaginationResponse } from '@common/dto/pagination-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryPaginateResponse extends PaginationResponse {
  @ApiProperty({ type: [ProductCategory] })
  data: ProductCategory[];
}
