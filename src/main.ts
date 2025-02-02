import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import type { INestApplication } from '@nestjs/common';

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

async function serverSetup() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  swaggerSetup(app);

  await app.listen(+port);
}

void serverSetup();
