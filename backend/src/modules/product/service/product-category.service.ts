import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
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

  async findAll(query: PaginateQuery): Promise<Paginated<ProductCategory>> {
    return paginate(query, this.categoryRepository, {
      sortableColumns: ['createdAt', 'updatedAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      select: ['id', 'createdAt', 'updatedAt', 'title', 'description'],
    });
  }

  async findOne(id: number): Promise<ProductCategory> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) throw new NotFoundException();

    return category;
  }
}
