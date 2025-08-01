import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { Repository } from 'typeorm';
import { Otp } from '../entities/otp.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
  ) {}
  //private services
  CheckExpireOtp(otp: Otp): boolean {
    return otp.expiresAt < new Date(Date.now());
  }

  generateOtp(): string {
    return randomInt(10000, 99999).toString();
  }

  async validateOtp(phone: string, otp: string): Promise<Otp | null> {
    const otpEntity = await this.otpRepository.findOne({ where: { phone } });

    if (!otp) throw new BadRequestException('No otp for this user');

    return otpEntity;
  }

  async checkRate(phone: string): Promise<void> {
    const otp = await this.otpRepository.findOne({
      where: { phone },
      order: { createdAt: 'DESC' },
    });

    if (otp) {
      const expireResult = this.CheckExpireOtp(otp);

      if (!expireResult)
        throw new HttpException(
          'You can get otp every',
          HttpStatus.TOO_MANY_REQUESTS,
        );
    }
  }
}
