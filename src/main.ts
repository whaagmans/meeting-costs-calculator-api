import { ValidationPipe, type INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

function swaggerSetup(app: INestApplication) {
  const SWAGGER_API_PATH = 'swagger';
  const config = new DocumentBuilder()
    .setTitle('Meeting Wasted Calculator')
    .setDescription('Backend for meeting wasted calculator')
    .setVersion('1.0')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_API_PATH, app, documentFactory);
}

function createFastifyAdapter(): FastifyAdapter {
  return new FastifyAdapter();
}

function createValidationPipe(): ValidationPipe {
  return new ValidationPipe();
}

async function serverSetup() {
  const port = process.env.PORT ?? 3000;

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    createFastifyAdapter(),
  );

  // sets up the global validation pipe to use class-validator
  app.useGlobalPipes(createValidationPipe());

  swaggerSetup(app);
  await app.listen(+port);
}

void serverSetup();
