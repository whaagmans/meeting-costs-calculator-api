import { Injectable } from '@nestjs/common';
import {
  type HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from './config/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: PrismaHealthIndicator,
    private readonly prisma: PrismaService,
  ) {}
  getHealth(): Promise<HealthCheckResult> {
    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
    return this.health.check([
      () => this.http.pingCheck('frontend web-app', frontendUrl),
      () => this.db.pingCheck('prisma', this.prisma),
    ]);
  }
}
