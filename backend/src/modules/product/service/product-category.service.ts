import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { ProductCategory } from '../entities/product-category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly categoryRepository: Repository<ProductCategory>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<ProductCategory> {
    const newCategory = this.categoryRepository.create(dto);

    return await this.categoryRepository.save(newCategory);
  }
}
