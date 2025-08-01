import { ApiProperty } from '@nestjs/swagger';

export class getOtpResponse {
  @ApiProperty({ example: '54687' })
  code: string;
}
