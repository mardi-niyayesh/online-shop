import { AtLeastOneFieldPipe } from '@common/pipe/at-least-one.pipe';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateDiscountDto } from '../dto/discount/create-discount.dto';
import { ExpVsGlobalDiscountPipe } from '../pipes/exp-discount.pipe';
import { DiscountService } from '../service/discount.service';

@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  async create(
    @Body(
      new AtLeastOneFieldPipe(['categoryId', 'productId']),
      ExpVsGlobalDiscountPipe,
    )
    dto: CreateDiscountDto,
  ) {
    return await this.discountService.create(dto);
  }
}
