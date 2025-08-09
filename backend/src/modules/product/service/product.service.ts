import { S3Service } from '@common/services/s3.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    dto: CreateProductDto,
    image: Express.Multer.File,
  ): Promise<DeepPartial<Product>> {
    if (image) {
      const { key } = await this.s3Service.uploadFile(image);

      dto.image = key;

      const newProduct: DeepPartial<Product> =
        this.productRepository.create(dto);

      return await this.productRepository.save(newProduct);
    } else {
      const newProduct: DeepPartial<Product> =
        this.productRepository.create(dto);

      return await this.productRepository.save(newProduct);
    }
  }
}
