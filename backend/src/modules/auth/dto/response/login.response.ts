import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({ example: 'evhdssthalc.asodmgseromrg.aopandg' })
  accessToken: string;
}
