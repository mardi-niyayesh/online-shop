import { User } from '@app/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { Otp } from './entities/otp.entity';
import { Role } from './entities/role.entity';
import { AuthService } from './services/auth.service';
import { JwtAppService } from './services/jwt.service';
import { OtpService } from './services/otp.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User, Otp])],
  controllers: [AuthController],
  providers: [AuthService, OtpService, JwtAppService, JwtService],
})
export class AuthModule {}
