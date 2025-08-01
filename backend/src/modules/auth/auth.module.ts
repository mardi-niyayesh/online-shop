import { User } from '@app/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { Otp } from './entities/otp.entity';
import { Role } from './entities/role.entity';
import { AuthService } from './services/auth.service';
import { OtpService } from './services/otp.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User, Otp])],
  controllers: [AuthController],
  providers: [AuthService, OtpService],
})
export class AuthModule {}
