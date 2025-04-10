import { ValidationPipe, type INestApplication } from '@nestjs/common';
import {
  HttpAdapterHost,
  NestFactory,
  type AbstractHttpAdapter,
} from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './exception-filters/prisma-client-exception/prisma-client-exception.filter';

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
  return new ValidationPipe({
    whitelist: true, // Remove any additional properties that are not defined in the DTO.
    transform: true, // Automatically transform incoming data to the DTO type.
    forbidNonWhitelisted: true, // Throw an error if any non-whitelisted properties are present.
  });
}

function createPrismaClientExceptionFilter(
  httpAdapterHost: AbstractHttpAdapter,
): PrismaClientExceptionFilter {
  return new PrismaClientExceptionFilter(httpAdapterHost);
}

async function serverSetup() {
  const port = process.env.PORT ?? 3000;

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    createFastifyAdapter(),
  );

  // Retrieve the HTTP adapter from the application instance.
  const { httpAdapter } = app.get(HttpAdapterHost);

  // Set up global validation for incoming requests.
  app.useGlobalPipes(createValidationPipe());

  // Apply Prisma exception handling globally.
  app.useGlobalFilters(createPrismaClientExceptionFilter(httpAdapter));

  if (process.env.SWAGGER_ENABLED) {
    // Initialize Swagger API documentation.
    swaggerSetup(app);
  }

  // Start the server and listen on the given port.
  await app.listen(+port, '0.0.0.0');

  console.log(`🚀 Server running at http://localhost:${port}`);
}

void serverSetup();
