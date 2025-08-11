import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'public-key';

export const Public = () => {
  return SetMetadata(PUBLIC_KEY, true);
};
