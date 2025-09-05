import { S3_BASE_PATH } from '@common/constant/constants';
import { Auth } from '@common/decorators/auth.decorator';
import { PaginationOptions } from '@common/decorators/pagination-options.decorator';
import { Public } from '@common/decorators/public.decorator';
import { Role } from '@common/decorators/role.decorator';
import { RoleEnum } from '@common/enum/role.enum';
import { imageFileFilter } from '@common/validators/files/image-validator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { PaginateProductResponse } from '../dto/product/paginate-product-response.dto';
import { UploadImageDto } from '../dto/product/upload-image.dto';
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
  @Public()
  @ApiOkResponse({ type: PaginateProductResponse })
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.productService.findAll(query);
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findOne(id);
  }

  @Delete(':id')
  @Role([RoleEnum.USER])
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.remove(id);
  }

  @Post('upload-image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { fileFilter: imageFileFilter }))
  @Role([RoleEnum.USER])
  async uploadFile(
    @Body() dto: UploadImageDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return {
      product: await this.productService.uploadFile(dto, image),
      baseUrl: S3_BASE_PATH,
    };
  }
}
