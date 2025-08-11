import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'new title', required: false })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ example: 'new description', required: false })
  @IsString()
  @IsOptional()
  description: string;
}
