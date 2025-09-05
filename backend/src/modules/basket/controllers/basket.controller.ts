import { Auth } from '@common/decorators/auth.decorator';
import { getUser } from '@common/decorators/get-user.decorator';
import { PaginationOptions } from '@common/decorators/pagination-options.decorator';
import { Role } from '@common/decorators/role.decorator';
import { RoleEnum } from '@common/enum/role.enum';
import { JwtPayload } from '@common/interfaces/jwt-payload.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AddManyItemsDto } from '../dto/add-many-items.dto';
import { BasketService } from '../services/basket.service';

@Controller('baskets')
@Auth()
export class BasketController {
  constructor(private readonly service: BasketService) {}

  @Post()
  @Role([RoleEnum.USER])
  async create(@Body() dto: AddManyItemsDto, @getUser() user: JwtPayload) {
    return await this.service.create(dto, user.sub);
  }

  @Get()
  @Role([RoleEnum.ADMIN])
  @PaginationOptions({
    filterOptions: [
      { field: 'userId', example: '$eq:1' },
      { field: 'isCheckedOut', example: '$eq:0' },
      { field: 'isCheckedOut', example: '$eq:1' },
    ],
  })
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.service.findAll(query);
  }

  @Get('userBasket')
  @Role([RoleEnum.USER])
  async findOne(@getUser() user: JwtPayload) {
    return await this.service.findOne(user.sub);
  }

  @Delete(':productId')
  @Role([RoleEnum.USER])
  async removeFromBasket(
    @getUser() user: JwtPayload,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return await this.service.removeFromBasket(productId, user.sub);
  }
}
