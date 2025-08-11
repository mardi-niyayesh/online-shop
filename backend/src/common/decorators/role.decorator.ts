import { RoleEnum } from '@common/enum/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role-key';

export const Role = (roles: RoleEnum[]) => {
  return SetMetadata(ROLE_KEY, roles);
};
