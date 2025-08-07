import { PaginationOptions } from '@common/decorators/pagination-options.decorator';
import { AtLeastOneFieldPipe } from '@common/pipe/at-least-one.pipe';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CategoryPaginateResponse } from '../dto/category/category-paginate-response.dto';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { UpdateCategoryDto } from '../dto/category/update-category.dto';
import { ProductCategoryService } from '../service/product-category.service';

@Controller('product-category')
export class ProductCategoryController {
  constructor(private readonly categoryService: ProductCategoryService) {}

  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.create(dto);
  }

  @Get()
  @PaginationOptions({
    sortOptions: [{ example: 'createdAt:DESC' }],
  })
  @ApiOkResponse({ type: CategoryPaginateResponse })
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.categoryService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new AtLeastOneFieldPipe(['title', 'description']))
    dto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(id, dto);
  }
}
