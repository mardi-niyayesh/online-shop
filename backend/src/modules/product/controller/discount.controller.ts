import { PaginationOptions } from '@common/decorators/pagination-options.decorator';
import { Role } from '@common/decorators/role.decorator';
import { RoleEnum } from '@common/enum/role.enum';
import { AtLeastOneFieldPipe } from '@common/pipe/at-least-one.pipe';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateDiscountDto } from '../dto/discount/create-discount.dto';
import { ExpVsGlobalDiscountPipe } from '../pipes/exp-discount.pipe';
import { DiscountService } from '../service/discount.service';

@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  @Role([RoleEnum.ADMIN])
  async create(
    @Body(
      new AtLeastOneFieldPipe(['categoryId', 'productId']),
      ExpVsGlobalDiscountPipe,
    )
    dto: CreateDiscountDto,
  ) {
    return await this.discountService.create(dto);
  }

  @Get()
  @PaginationOptions({
    filterOptions: [
      { field: 'productId', example: '$eq:2' },
      { field: 'categoryId', example: '$eq:1' },
    ],

    sortOptions: [{ example: 'createdAt:DESC' }],
  })
  @Role([RoleEnum.USER, RoleEnum.ADMIN])
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.discountService.findAll(query);
  }

  @Get(':id')
  @Role([RoleEnum.USER, RoleEnum.ADMIN])
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.discountService.findOne(id);
  }
}
