import { Injectable } from '@nestjs/common';
import {
  type HealthCheckResult,
  type HealthIndicatorResult,
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
    const checks: Array<() => Promise<HealthIndicatorResult>> = [];
    const frontendUrl = process.env.FRONTEND_URL;
    if (frontendUrl) {
      checks.push(() => this.http.pingCheck('frontend web-app', frontendUrl));
    }

    checks.push(() => this.db.pingCheck('prisma', this.prisma));
    return this.health.check(checks);
  }
}
