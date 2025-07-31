import { AppModule } from '@app/app/app.module';
import dataSource from '@config/data-source';
import { InitializeSwagger } from '@config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );

  await dataSource.initialize();

  app.setGlobalPrefix('api');

  InitializeSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
