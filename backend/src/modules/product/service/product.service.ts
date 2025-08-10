import { S3Service } from '@common/services/s3.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
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

  async findAll(query: PaginateQuery): Promise<Paginated<Product>> {
    return paginate(query, this.productRepository, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      relations: { attributes: true, rates: true, category: true },
      select: [
        'id',
        'createdAt',
        'updatedAt',
        'name',
        'description',
        'price',
        'image',
        'categoryId',
        'rates.rate',
        'rates.userId',
        'category.title',
        'category.description',
        'attributes.size',
        'attributes.color',
        'attributes.height',
        'attributes.mentality',
        'attributes.design',
        'attributes.stock',
      ],
      filterableColumns: {
        name: [FilterOperator.EQ],
        categoryId: [FilterOperator.EQ],
        'attributes.size': [FilterOperator.EQ],
        'attributes.color': [FilterOperator.EQ],
        'attributes.height': [FilterOperator.EQ],
        'attributes.mentality': [FilterOperator.EQ],
        'attributes.design': [FilterOperator.EQ],
      },
    });
  }
}
