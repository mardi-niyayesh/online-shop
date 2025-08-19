import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { DeepPartial, Repository } from 'typeorm';
import { CreateFeedBackDto } from '../dto/feedback/create-feedback.dto';
import { UpdateFeedbackDto } from '../dto/feedback/update-feedback.dto';
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

  async findAll(query: PaginateQuery): Promise<Paginated<Rate>> {
    return paginate(query, this.feedbackRepository, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      relations: ['product', 'user'],
      filterableColumns: {
        productId: [FilterOperator.EQ],
      },
    });
  }

  async findOne(id: number): Promise<DeepPartial<Rate>> {
    const comment = await this.feedbackRepository.findOne({ where: { id } });

    if (!comment) throw new NotFoundException();

    return comment;
  }

  async update(dto: UpdateFeedbackDto): Promise<DeepPartial<Rate>> {
    const comment = await this.feedbackRepository.findOne({
      where: { productId: dto.productId, userId: dto.userId },
    });

    if (!comment) throw new NotFoundException('Comment not found');

    comment.rate = dto.rate;

    return await this.feedbackRepository.save(comment);
  }

  async remove(productId: number, userId: number) {
    const { affected } = await this.feedbackRepository.delete({
      productId,
      userId,
    });

    if (!affected) throw new NotFoundException();

    return { success: true };
  }
}
