import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { ProductCategoryService } from '../service/product-category.service';

@Controller('product-category')
export class ProductCategoryController {
  constructor(private readonly categoryService: ProductCategoryService) {}

  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.create(dto);
  }
}
