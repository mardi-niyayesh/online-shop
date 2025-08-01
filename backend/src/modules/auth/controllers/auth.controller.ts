import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetOtpDto } from '../dto/get-otp.dto';
import { getOtpResponse } from '../dto/response/get-otp.response';
import { LoginResponse } from '../dto/response/login.response';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('get-otp')
  @ApiOkResponse({ type: getOtpResponse })
  async getOtp(@Query() dto: GetOtpDto) {
    return await this.authService.getOtp(dto);
  }

  @Post('verify-token')
  @ApiOkResponse({ type: LoginResponse })
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    return await this.authService.verifyOtp(dto);
  }
}
