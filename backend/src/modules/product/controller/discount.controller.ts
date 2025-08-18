import { Body, Controller, Post } from '@nestjs/common';
import { CreateDiscountDto } from '../dto/discount/create-discount.dto';
import { DiscountService } from '../service/discount.service';

@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  async create(@Body() dto: CreateDiscountDto) {
    return await this.discountService.create(dto);
  }
}
