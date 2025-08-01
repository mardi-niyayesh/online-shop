import { User } from '@app/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetOtpDto } from '../dto/get-otp.dto';
import { getOtpResponse } from '../dto/response/get-otp.response';
import { Otp } from '../entities/otp.entity';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private readonly otpService: OtpService,
  ) {}

  async getOtp(dto: GetOtpDto): Promise<getOtpResponse> {
    await this.otpService.checkRate(dto.phone);

    const newOtpCode = this.otpService.generateOtp();

    const newOtp = this.otpRepository.create({
      phone: dto.phone,
      code: newOtpCode,
    });
    await this.otpRepository.save(newOtp);

    return {
      code: newOtpCode,
    };
  }
}
