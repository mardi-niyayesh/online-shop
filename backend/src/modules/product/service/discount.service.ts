import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
