import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerInit } from './swagger';
import { TransformInterceptor } from './interceptors';
import { HttpExceptionFilter } from './interceptors/error.filters';

const port = process.env.PORT || 8080;
const client = process.env.CLIENT_URL || 'http://localhost:3000';
async function run(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors({
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Origin',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    origin: client,
  });

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  SwaggerInit(app);
  await app.listen(port);
}

run().then(() =>
  console.log(
    `Server is running on http://localhost:${port} and client is ${client}`,
  ),
);
