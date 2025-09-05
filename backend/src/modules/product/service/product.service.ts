import { S3Service } from '@common/services/s3.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { DeepPartial, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { UploadImageDto } from '../dto/product/upload-image.dto';
import { ProductAttribute } from '../entities/product-attribute.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductAttribute)
    private readonly attributeRepository: Repository<ProductAttribute>,
    private readonly s3Service: S3Service,
  ) {}

  async create(dto: CreateProductDto): Promise<DeepPartial<Product>> {
    const { categoryId, attributes, description, name, price } = dto;
    const newProduct = this.productRepository.create({
      description,
      name,
      price,
      categoryId,
    });
    const savedProduct = await this.productRepository.save(newProduct);

    const newAttribute = this.attributeRepository.create({
      size: attributes.size,
      design: attributes.design,
      color: attributes.color,
      height: attributes.height,
      mentality: attributes.mentality,
      stock: attributes.stock,
      productId: newProduct.id,
    });

    await this.attributeRepository.save(newAttribute);

    return savedProduct;
  }
  async findAll(query: PaginateQuery): Promise<Paginated<Product>> {
    return paginate(query, this.productRepository, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      relations: {
        attributes: true,
        rates: true,
        category: true,
        discounts: true,
      },
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

  async findOne(id: number): Promise<DeepPartial<Product>> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        attributes: true,
        rates: true,
        category: true,
      },
    });

    if (!product) throw new NotFoundException();

    return product;
  }

  async update(id: number, dto: UpdateProductDto, image: Express.Multer.File) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) throw new NotFoundException('product not found');

    if (image) {
      await this.s3Service.deleteFile(product.image);

      const { key } = await this.s3Service.uploadFile(image);

      await this.productRepository.update({ id }, { ...dto, image: key });

      return {
        success: true,
      };
    } else {
      await this.productRepository.update({ id }, { ...dto });

      return {
        success: true,
      };
    }
  }

  async remove(id: number) {
    const { affected } = await this.productRepository.delete({ id });

    if (!affected) throw new NotFoundException();

    return { success: true };
  }

  async uploadFile(
    { productId }: UploadImageDto,
    image: Express.Multer.File,
  ): Promise<DeepPartial<Product>> {
    const { key } = await this.s3Service.uploadFile(image, 'online-shop');

    await this.productRepository.update({ id: productId }, { image: key });

    return await this.findOne(productId);
  }
}
