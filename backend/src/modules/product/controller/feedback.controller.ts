import { Auth } from '@common/decorators/auth.decorator';
import { getUser } from '@common/decorators/get-user.decorator';
import { PaginationOptions } from '@common/decorators/pagination-options.decorator';
import { Role } from '@common/decorators/role.decorator';
import { RoleEnum } from '@common/enum/role.enum';
import { JwtPayload } from '@common/interfaces/jwt-payload.interface';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateFeedBackDto } from '../dto/feedback/create-feedback.dto';
import { FeedBackService } from '../service/feedback.service';

@Controller('feedbacks')
@Auth()
export class FeedBackController {
  constructor(private readonly feedbackService: FeedBackService) {}

  @Post()
  @Role([RoleEnum.USER])
  async create(@Body() dto: CreateFeedBackDto, @getUser() user: JwtPayload) {
    dto.userId = user.sub;
    return await this.feedbackService.create(dto);
  }

  @Get()
  @PaginationOptions({
    sortOptions: [{ example: 'createdAt:DESC' }],
    filterOptions: [{ field: 'productId', example: '$eq:1' }],
  })
  @Role([RoleEnum.USER])
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.feedbackService.findAll(query);
  }
}
