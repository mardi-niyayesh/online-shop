import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { UpdateCategoryDto } from '../dto/category/update-category.dto';
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
      relations: { discounts: true },
    });
  }

  async findOne(id: number): Promise<ProductCategory> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { discounts: true },
    });

    if (!category) throw new NotFoundException();

    return category;
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<ProductCategory> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) throw new NotFoundException();

    // For check is unique or not
    const isUniqueTitle = await this.categoryRepository.findOne({
      where: { title: dto.title },
    });

    if (isUniqueTitle && isUniqueTitle.id !== id)
      throw new ConflictException('There is another category by this title');

    category.title = dto.title;
    category.description = dto.description;

    return await this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const { affected } = await this.categoryRepository.delete({ id });

    if (!affected) throw new NotFoundException();

    return { success: !!affected };
  }
}
