import {
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      omit: {
        user: {
          password: true,
        },
        room: {
          roomPassword: true,
        },
      },
    });
  }
  async onModuleInit() {
    try {
      await this.$connect();
    } catch {
      console.error('Error connecting to the database');
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
