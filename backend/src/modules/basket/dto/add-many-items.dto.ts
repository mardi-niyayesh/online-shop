import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateBasketDto } from './create-basket.dto';

export class AddManyItemsDto {
  @ApiProperty({ type: () => CreateBasketDto, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => CreateBasketDto)
  items: CreateBasketDto[];
}
