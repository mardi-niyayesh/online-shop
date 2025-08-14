import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateFeedBackDto } from '../dto/feedback/create-feedback.dto';
import { Rate } from '../entities/rate.entity';

@Injectable()
export class FeedBackService {
  constructor(
    @InjectRepository(Rate)
    private readonly feedbackRepository: Repository<Rate>,
  ) {}

  async create(dto: CreateFeedBackDto): Promise<DeepPartial<Rate>> {
    const feedback = await this.feedbackRepository.findOne({
      where: { userId: dto.userId, productId: dto.productId },
    });

    if (feedback)
      throw new BadRequestException('You sent your feedback before !');

    const newFeedback = this.feedbackRepository.create(dto);

    return await this.feedbackRepository.save(newFeedback);
  }
}
