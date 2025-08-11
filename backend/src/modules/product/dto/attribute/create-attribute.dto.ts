import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateAttributeDto {
  @ApiProperty({ example: 60, required: false })
  @IsString()
  @IsOptional()
  size: string;

  @ApiProperty({ example: 'blue', required: false })
  @IsString()
  @IsOptional()
  color: string;

  @ApiProperty({ example: 190, required: false })
  @IsPositive()
  @IsOptional()
  height: number;

  @ApiProperty({ example: 'IDK', required: false })
  @IsString()
  @IsOptional()
  mentality: string;

  @ApiProperty({ example: 'classic', required: false })
  @IsString()
  @IsOptional()
  design: string;

  @ApiProperty({ example: 23 })
  @IsInt()
  @IsPositive()
  stock: number;
}
