import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserBody } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { PaymentInterval } from './users.interface';
import { PrismaService } from '@/config/prisma/prisma.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        PrismaService,
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findById: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findById', () => {
    it('should return a user', async () => {
      const result = new UserDto();
      jest.spyOn(service, 'findById').mockResolvedValue(result);
      expect(await controller.findById('1')).toBe(result);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(null);
      await expect(controller.findById('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserBody: CreateUserBody = {
        user: {
          username: '',
          displayName: '',
          password: '',
        },
        salaryInfo: {
          amount: 0,
          paymentInterval: PaymentInterval.Hour,
          workedHoursPerWeek: 0,
        },
      };
      const result = new UserDto();
      jest.spyOn(service, 'create').mockResolvedValue(result);
      expect(await controller.create(createUserBody)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {};
      const result = new UserDto();
      jest.spyOn(service, 'update').mockResolvedValue(result);
      expect(await controller.update('1', updateUserDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = new UserDto();
      jest.spyOn(service, 'remove').mockResolvedValue(result);
      expect(await controller.remove('1')).toBe(result);
    });
  });
});
