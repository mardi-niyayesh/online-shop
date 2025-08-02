import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, Length } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({ example: '94356' })
  @IsString()
  @Length(5, 5)
  code: string;

  @ApiProperty({ example: '09921810208' })
  @IsPhoneNumber('IR')
  phone: string;

  @ApiProperty({ example: 'firstname' })
  @IsString()
  firstname: string;

  @ApiProperty({ example: 'lastname' })
  @IsString()
  lastname: string;
}
