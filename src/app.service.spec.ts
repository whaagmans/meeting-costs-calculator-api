import {
  HealthCheckService,
  HttpHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { PrismaService } from './config/prisma/prisma.service';

describe('AppService', () => {
  let appService: AppService;
  let healthCheckService: HealthCheckService;
  let httpHealthIndicator: HttpHealthIndicator;
  let prismaHealthIndicator: PrismaHealthIndicator;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: HealthCheckService,
          useValue: { check: jest.fn() },
        },
        {
          provide: HttpHealthIndicator,
          useValue: { pingCheck: jest.fn() },
        },
        {
          provide: PrismaHealthIndicator,
          useValue: { pingCheck: jest.fn() },
        },
        {
          provide: PrismaService,
          useValue: {}, // mock as necessary
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);
    httpHealthIndicator = module.get<HttpHealthIndicator>(HttpHealthIndicator);
    prismaHealthIndicator = module.get<PrismaHealthIndicator>(
      PrismaHealthIndicator,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.FRONTEND_URL;
  });

  it('should call both http and prisma pingCheck when FRONTEND_URL is set', async () => {
    process.env.FRONTEND_URL = 'http://example.com';

    const expectedHealthResult = { status: 'ok' };

    // Configure the health.check mock to execute the checks passed to it.
    (healthCheckService.check as jest.Mock).mockImplementation(
      async (checks: Array<() => Promise<any>>) => {
        // Execute all check functions.
        for (const check of checks) {
          await check();
        }
        return expectedHealthResult;
      },
    );

    const pingSpy = jest.spyOn(httpHealthIndicator, 'pingCheck');
    const prismaSpy = jest.spyOn(prismaHealthIndicator, 'pingCheck');

    const result = await appService.getHealth();
    expect(result).toEqual(expectedHealthResult);

    // Ensure that pingCheck for the frontend web app is called.
    expect(pingSpy).toHaveBeenCalledTimes(1);
    expect(pingSpy).toHaveBeenCalledWith(
      'frontend web-app',
      process.env.FRONTEND_URL,
    );

    // Ensure that the Prisma pingCheck is called.
    expect(prismaSpy).toHaveBeenCalledTimes(1);
    expect(prismaSpy).toHaveBeenCalledWith('prisma', prismaService);
  });

  it('should call only prisma pingCheck when FRONTEND_URL is not set', async () => {
    // Ensure FRONTEND_URL is not defined.
    delete process.env.FRONTEND_URL;

    const expectedHealthResult = { status: 'ok' };

    (healthCheckService.check as jest.Mock).mockImplementation(
      async (checks: Array<() => Promise<any>>) => {
        for (const check of checks) {
          await check();
        }
        return expectedHealthResult;
      },
    );

    const pingSpy = jest.spyOn(httpHealthIndicator, 'pingCheck');
    const prismaSpy = jest.spyOn(prismaHealthIndicator, 'pingCheck');

    const result = await appService.getHealth();
    expect(result).toEqual(expectedHealthResult);

    // http.pingCheck should not be called because FRONTEND_URL is undefined.

    expect(pingSpy).not.toHaveBeenCalled();

    expect(prismaSpy).toHaveBeenCalledTimes(1);
    expect(prismaSpy).toHaveBeenCalledWith('prisma', prismaService);
  });

  it('should call only prisma pingCheck when FRONTEND_URL is empty', async () => {
    // Set FRONTEND_URL to an empty string (falsy value).
    process.env.FRONTEND_URL = '';

    const expectedHealthResult = { status: 'ok' };

    (healthCheckService.check as jest.Mock).mockImplementation(
      async (checks: Array<() => Promise<any>>) => {
        for (const check of checks) {
          await check();
        }
        return expectedHealthResult;
      },
    );

    const pingSpy = jest.spyOn(httpHealthIndicator, 'pingCheck');
    const prismaSpy = jest.spyOn(prismaHealthIndicator, 'pingCheck');

    const result = await appService.getHealth();
    expect(result).toEqual(expectedHealthResult);

    // With an empty FRONTEND_URL, the http pingCheck should not be called.
    expect(pingSpy).not.toHaveBeenCalled();

    expect(prismaSpy).toHaveBeenCalledTimes(1);
    expect(prismaSpy).toHaveBeenCalledWith('prisma', prismaService);
  });
});
