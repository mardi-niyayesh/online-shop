import { PUBLIC_KEY } from '@common/decorators/public.decorator';
import { ROLE_KEY } from '@common/decorators/role.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.get(PUBLIC_KEY, context.getHandler());
    if (skipAuth) return true;

    const userRole: string = context.switchToHttp().getRequest().user.role;
    const requiredRoles: string[] = this.reflector.get(
      ROLE_KEY,
      context.getHandler(),
    );

    return requiredRoles.includes(userRole);
  }
}
