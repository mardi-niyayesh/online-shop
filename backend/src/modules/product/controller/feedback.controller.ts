import { Auth } from '@common/decorators/auth.decorator';
import { getUser } from '@common/decorators/get-user.decorator';
import { PaginationOptions } from '@common/decorators/pagination-options.decorator';
import { Role } from '@common/decorators/role.decorator';
import { RoleEnum } from '@common/enum/role.enum';
import { JwtPayload } from '@common/interfaces/jwt-payload.interface';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateFeedBackDto } from '../dto/feedback/create-feedback.dto';
import { UpdateFeedbackDto } from '../dto/feedback/update-feedback.dto';
import { FeedBackService } from '../service/feedback.service';

@Controller('feedbacks')
@Auth()
export class FeedBackController {
  constructor(private readonly feedbackService: FeedBackService) {}

  @Post()
  @Role([RoleEnum.USER, RoleEnum.ADMIN])
  async create(@Body() dto: CreateFeedBackDto, @getUser() user: JwtPayload) {
    dto.userId = user.sub;
    return await this.feedbackService.create(dto);
  }

  @Get()
  @PaginationOptions({
    sortOptions: [{ example: 'createdAt:DESC' }],
    filterOptions: [{ field: 'productId', example: '$eq:1' }],
  })
  @Role([RoleEnum.USER, RoleEnum.ADMIN])
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.feedbackService.findAll(query);
  }

  @Get(':id')
  @Role([RoleEnum.USER, RoleEnum.ADMIN])
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.feedbackService.findOne(id);
  }

  @Put()
  @Role([RoleEnum.USER, RoleEnum.ADMIN])
  async update(@Body() dto: UpdateFeedbackDto, @getUser() user: JwtPayload) {
    dto.userId = user.sub;
    return await this.feedbackService.update(dto);
  }
}
