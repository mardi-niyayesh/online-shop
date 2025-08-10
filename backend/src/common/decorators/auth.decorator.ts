import { AuthGuard } from '@app/auth/guard/auth.guard';
import { RoleGuard } from '@common/guards/role.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';

export const Auth = () => {
  return applyDecorators(UseGuards(AuthGuard, RoleGuard));
};
