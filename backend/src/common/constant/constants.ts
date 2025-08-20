import { config } from 'dotenv';

config();

export const Jwt_Expire = '7d';

export const S3_BASE_PATH = `https://${process.env.S3_BUCKET}.storage.c2.liara.space/`;
