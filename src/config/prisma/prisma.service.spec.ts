import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should connect on module init', async () => {
    const connectSpy = jest
      .spyOn(service, '$connect')
      .mockResolvedValue(undefined);
    await service.onModuleInit();
    expect(connectSpy).toHaveBeenCalled();
  });

  it('should console log the error when the connection fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    jest
      .spyOn(service, '$connect')
      .mockRejectedValue(new Error('Connection failed'));
    await service.onModuleInit();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error connecting to the database',
    );
    consoleErrorSpy.mockRestore();
  });

  it('should disconnect on module destroy', async () => {
    const disconnectSpy = jest
      .spyOn(service, '$disconnect')
      .mockResolvedValue(undefined);
    await service.onModuleDestroy();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
