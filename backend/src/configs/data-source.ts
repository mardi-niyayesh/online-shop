import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  host: process.env.MY_SQL_HOST,
  username: process.env.MY_SQL_USERNAME,
  password: process.env.MY_SQL_PASSWORD,
  port: Number(process.env.MY_SQL_PORT),
  type: 'mysql',
  database: process.env.MY_SQL_DATABASE,
  entities: ['dist/**/**/**/*.entity{.ts,.js}', 'dist/**/**/*.entity{.ts,.js}'],
  dropSchema: false,
  logging: false,
  logger: 'file',
});
