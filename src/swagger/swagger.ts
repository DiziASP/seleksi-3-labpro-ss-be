import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Initialize Swagger API
 * @param app INestApplication
 */
export function SwaggerInit(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Single Service Backend - Seleksi 3 Labpro')
    .setDescription('The eCommerce API Contract and Description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
}
