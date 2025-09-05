import { JwtAppService } from '@app/auth/services/jwt.service';
import { Product } from '@app/product/entities/product.entity';
import { User } from '@app/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketController } from './controllers/basket.controller';
import { BasketItem } from './entities/basket-item.entity';
import { Basket } from './entities/basket.entity';
import { BasketService } from './services/basket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Basket, BasketItem, User, Product])],
  controllers: [BasketController],
  providers: [BasketService, JwtAppService, JwtService],
})
export class BasketModule {}
