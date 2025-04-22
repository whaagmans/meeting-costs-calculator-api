import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma';
import type { FastifyReply } from 'fastify';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<FastifyReply>();
    switch (exception.code) {
      case 'P2002': // When trying to insert/update a record with a duplicate unique field
        response.status(409).send({
          statusCode: 409,
          message: 'Record with the same unique field already exists',
          error: 'Conflict',
        });
        break;
      case 'P2025': // When trying to update or delete a non-existing record
        response.status(404).send({
          statusCode: 404,
          message: 'Record you tried to update/delete does not exist',
          error: 'Not Found',
        });
        break;
      default:
        // If the error is not handled, let the default exception handler handle it
        super.catch(exception, host);
    }
  }
}
