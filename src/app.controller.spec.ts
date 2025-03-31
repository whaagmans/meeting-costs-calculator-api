import {
  type HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './config/prisma/prisma.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

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
          provide: HttpHealthIndicator,
          useValue: {
            pingCheck: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {},
        },
        AppService,
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('getWelcome', () => {
    it('should return "Welcome to the Meeting Costs Calculator API"', () => {
      expect(appController.getWelcome()).toEqual({
        message: 'Welcome to the Meeting Costs Calculator API',
      });
    });
  });

  describe('healthCheck', () => {
    it('should call AppService.getHealth and return the result', async () => {
      const getHealthMock = jest.spyOn(appService, 'getHealth');
      const mockHealthCheckResult: HealthCheckResult = {
        status: 'ok',
        info: { prisma: { status: 'up' } },
        error: {},
        details: { prisma: { status: 'up' } },
      };

      getHealthMock.mockResolvedValue(mockHealthCheckResult);

      // Invoke the controller method
      const result = await appController.healthCheck();

      // Ensure the service was called and the controller returned the same data
      expect(getHealthMock).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockHealthCheckResult);
    });
  });
});
