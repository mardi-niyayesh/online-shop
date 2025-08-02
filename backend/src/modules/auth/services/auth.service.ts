import { User } from '@app/user/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetOtpDto } from '../dto/get-otp.dto';
import { getOtpResponse } from '../dto/response/get-otp.response';
import { LoginResponse } from '../dto/response/login.response';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { Otp } from '../entities/otp.entity';
import { JwtAppService } from './jwt.service';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private readonly otpService: OtpService,
    private readonly JwtService: JwtAppService,
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

  async verifyOtp(dto: VerifyOtpDto): Promise<LoginResponse> {
    const otp = (await this.otpService.validateOtp(dto.phone, dto.code)) as Otp;

    const expireResult = this.otpService.CheckExpireOtp(otp);

    if (expireResult) throw new BadRequestException('otp has expired !');

    await this.otpService.removeOtp(otp);

    const user = await this.userRepository.findOne({
      where: { phone: dto.phone },
    });

    if (user)
      return {
        accessToken: await this.JwtService.generateAccessToken({
          sub: user.id,
        }),
      };

    const newUser = this.userRepository.create({
      phone: dto.phone,
      firstname: dto.firstname,
      lastname: dto.lastname,
    });
    await this.userRepository.save(newUser);

    return {
      accessToken: await this.JwtService.generateAccessToken({
        sub: newUser.id,
      }),
    };
  }
}
