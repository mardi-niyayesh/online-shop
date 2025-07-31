import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function InitializeSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('online-shop api')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);
}
