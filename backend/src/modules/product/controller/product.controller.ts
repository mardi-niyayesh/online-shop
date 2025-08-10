import { PaginationOptions } from '@common/decorators/pagination-options.decorator';
import { imageFileFilter } from '@common/validators/files/image-validator';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { PaginateProductResponse } from '../dto/product/paginate-product-response.dto';
import { ProductService } from '../service/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { fileFilter: imageFileFilter }))
  @ApiBody({ type: CreateProductDto })
  async create(
    @Body() dto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.productService.create(dto, image);
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
  @ApiOkResponse({ type: PaginateProductResponse })
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.productService.findAll(query);
  }
}
