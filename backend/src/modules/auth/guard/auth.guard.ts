import { PUBLIC_KEY } from '@common/decorators/public.decorator';
import { JwtPayload } from '@common/interfaces/jwt-payload.interface';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtAppService } from '../services/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtAppService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.get(PUBLIC_KEY, context.getHandler());
    if (skipAuth) return true;
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    try {
      const payload: JwtPayload =
        await this.jwtService.verifyAccessToken(token);

      console.log(payload);
      request.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  private extractToken(request: Request): string {
    const token = request.headers.authorization;

    if (!token || (token && !token.startsWith('Bearer')))
      throw new UnauthorizedException('Invalid token');

    return token.split(' ')[1];
  }
}
