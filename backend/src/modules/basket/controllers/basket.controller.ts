import { Auth } from '@common/decorators/auth.decorator';
import { getUser } from '@common/decorators/get-user.decorator';
import { Role } from '@common/decorators/role.decorator';
import { RoleEnum } from '@common/enum/role.enum';
import { JwtPayload } from '@common/interfaces/jwt-payload.interface';
import { Body, Controller, Post } from '@nestjs/common';
import { AddManyItemsDto } from '../dto/add-many-items.dto';
import { BasketService } from '../services/basket.service';

@Controller('baskets')
@Auth()
export class BasketController {
  constructor(private readonly service: BasketService) {}

  @Post()
  @Role([RoleEnum.USER])
  async create(@Body() dto: AddManyItemsDto, @getUser() user: JwtPayload) {
    return await this.service.create(dto, user.sub);
  }
}
