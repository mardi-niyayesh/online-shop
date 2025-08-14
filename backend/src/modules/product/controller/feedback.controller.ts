import { Auth } from '@common/decorators/auth.decorator';
import { getUser } from '@common/decorators/get-user.decorator';
import { Role } from '@common/decorators/role.decorator';
import { RoleEnum } from '@common/enum/role.enum';
import { JwtPayload } from '@common/interfaces/jwt-payload.interface';
import { Body, Controller, Post } from '@nestjs/common';
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
}
