import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { DeepPartial, Repository } from 'typeorm';
import { CreateDiscountDto } from '../dto/discount/create-discount.dto';
import { Discount } from '../entities/discount.entity';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {}

  async create(dto: CreateDiscountDto): Promise<DeepPartial<Discount>> {
    const newDiscount = this.discountRepository.create(dto);

    return await this.discountRepository.save(newDiscount);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Discount>> {
    return await paginate(query, this.discountRepository, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      relations: { product: true, category: true },
      filterableColumns: {
        productId: [FilterOperator.EQ],
        categoryId: [FilterOperator.EQ],
      },
    });
  }

  async findOne(id: number): Promise<DeepPartial<Discount>> {
    const discount = await this.discountRepository.findOne({
      where: { id },
      relations: { product: true, category: true },
    });

    if (!discount) throw new NotFoundException();

    return discount;
  }

  async remove(id: number) {
    const { affected } = await this.discountRepository.delete({ id });

    if (!affected) throw new NotFoundException();

    return { success: true };
  }
}
