import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PrismaService } from './config/prisma/prisma.service';
import { PrismaHealthIndicator, HealthCheckService } from '@nestjs/terminus';

describe('AppController', () => {
  let appController: AppController;
  let prismaHealthIndicator: PrismaHealthIndicator;
  let healthCheckService: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: {
            check: jest.fn(),
          },
        },
        {
          provide: PrismaHealthIndicator,
          useValue: {
            pingCheck: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    prismaHealthIndicator = module.get<PrismaHealthIndicator>(
      PrismaHealthIndicator,
    );
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);
  });

  describe('getWelcome', () => {
    it('should return "Welcome to the Meeting Costs Calculator API"', () => {
      expect(appController.getWelcome()).toEqual({
        message: 'Welcome to the Meeting Costs Calculator API',
      });
    });
  });

  describe('healthCheck', () => {
    it('should return the health status', async () => {
      jest.spyOn(prismaHealthIndicator, 'pingCheck').mockResolvedValue({
        prisma: { status: 'up' },
      });

      // Mock the final shape that HealthCheckService returns
      jest.spyOn(healthCheckService, 'check').mockResolvedValue({
        status: 'ok',
        info: { prisma: { status: 'up' } },
        error: {},
        details: { prisma: { status: 'up' } },
      });

      const result = await appController.healthCheck();

      expect(result).toEqual({
        status: 'ok',
        info: { prisma: { status: 'up' } },
        error: {},
        details: { prisma: { status: 'up' } },
      });
    });
  });
});
