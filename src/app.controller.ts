import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from './config/prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: PrismaHealthIndicator,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getWelcome(): { message: string } {
    return { message: 'Welcome to the Meeting Costs Calculator API' };
  }

  @Get('health')
  @HealthCheck()
  healthCheck() {
    return this.health.check([() => this.db.pingCheck('prisma', this.prisma)]);
  }
}
