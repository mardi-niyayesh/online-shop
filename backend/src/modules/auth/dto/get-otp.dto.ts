import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

export class GetOtpDto {
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
