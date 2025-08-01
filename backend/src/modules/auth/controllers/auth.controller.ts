import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetOtpDto } from '../dto/get-otp.dto';
import { getOtpResponse } from '../dto/response/get-otp.response';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('get-otp')
  @ApiOkResponse({ type: getOtpResponse })
  async getOtp(@Query() dto: GetOtpDto) {
    return await this.authService.getOtp(dto);
  }
}
