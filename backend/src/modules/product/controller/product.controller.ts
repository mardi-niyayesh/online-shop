import { Auth } from '@common/decorators/auth.decorator';
import { PaginationOptions } from '@common/decorators/pagination-options.decorator';
import { Role } from '@common/decorators/role.decorator';
import { RoleEnum } from '@common/enum/role.enum';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { PaginateProductResponse } from '../dto/product/paginate-product-response.dto';
import { ProductService } from '../service/product.service';

@Controller('products')
@Auth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Role([RoleEnum.USER])
  async create(@Body() dto: CreateProductDto) {
    return await this.productService.create(dto);
  }

  @Get()
  @PaginationOptions({
    sortOptions: [{ example: 'createdAt:DESC' }],
    filterOptions: [
      { field: 'name', example: '$eq:name' },
      { field: 'categoryId', example: '$eq:1' },
      { field: 'attributes.size', example: '$eq:55' },
      { field: 'attributes.color', example: '$eq:blue' },
      { field: 'attributes.height', example: '$eq:195' },
      { field: 'attributes.mentality', example: '$eq:IDK' },
      { field: 'attributes.design', example: '$eq:classic' },
    ],
  })
  @Role([RoleEnum.USER])
  @ApiOkResponse({ type: PaginateProductResponse })
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.productService.findAll(query);
  }

  @Get(':id')
  @Role([RoleEnum.USER])
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findOne(id);
  }

  @Delete(':id')
  @Role([RoleEnum.USER])
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.remove(id);
  }
}
