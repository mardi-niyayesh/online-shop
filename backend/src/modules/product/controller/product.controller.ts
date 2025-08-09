import { imageFileFilter } from '@common/validators/files/image-validator';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateProductDto } from '../dto/product/create-product.dto';
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
}
