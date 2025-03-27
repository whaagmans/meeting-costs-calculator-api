import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PrismaService } from './config/prisma/prisma.service';
import { PrismaHealthIndicator, HealthCheckService } from '@nestjs/terminus';

describe('AppController', () => {
  let appController: AppController;
  let prismaService: PrismaService;
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
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getWelcome', () => {
    it('should return "Welcome to the Meeting Costs Calculator API"', () => {
      expect(appController.getWelcome()).toEqual({
        message: 'Welcome to the Meeting Costs Calculator API',
      });
    });
  });

  describe('healthCheck', () => {
    it('should return the health status of the application', async () => {
      const checkSpy = jest.spyOn(healthCheckService, 'check');
      const pingSpy = jest
        .spyOn(prismaHealthIndicator, 'pingCheck')
        .mockResolvedValue({ prisma: { status: 'up' } });

      await appController.healthCheck();

      // Ensure health.check was called exactly once
      expect(checkSpy).toHaveBeenCalledTimes(1);

      // Called with an array of indicator functions
      expect(checkSpy).toHaveBeenCalledWith([expect.any(Function)]);

      // To fully test the inner indicator, manually call it:
      const indicatorFn = checkSpy.mock.calls[0][0][0];
      await indicatorFn();

      expect(pingSpy).toHaveBeenCalledWith('prisma', prismaService);
    });
  });
});
