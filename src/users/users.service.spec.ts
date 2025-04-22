/* eslint-disable @typescript-eslint/unbound-method */
import { PrismaService } from '@/config/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { PaymentInterval } from './users.interface';
import { UsersService } from './users.service';

import type { User } from '@prisma';
import type { CreateUserDto, SalaryInfo } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';

jest.mock('argon2', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const uuid = randomUUID();
      const createUserDto: CreateUserDto = {
        username: 'test',
        password: 'test',
        displayName: 'name',
      };
      const salaryInfo: SalaryInfo = {
        amount: 1000,
        paymentInterval: PaymentInterval.Month,
        workedHoursPerWeek: 40,
      };
      const createdUser = {
        id: uuid,
        username: 'test',
        password: 'hashedPassword',
        salaryPerSecond: 0.001736111111111111,
      };

      prismaService.user.create = jest.fn().mockResolvedValue(createdUser);

      const result = await service.create(createUserDto, salaryInfo);

      expect(result).toEqual(
        expect.objectContaining({ id: uuid, username: 'test' }),
      );
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...createUserDto,
          password: 'hashedPassword',
          salaryPerSecond: 0.001736111111111111,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const uuid = randomUUID();
      const users: User[] = [
        {
          id: uuid,
          username: 'test',
          password: 'hashedPassword',
          salaryPerSecond: 0.001736111111111111,
          displayName: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          lastLoginAt: null,
        },
      ];
      prismaService.user.findMany = jest.fn().mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: uuid, username: 'test' }),
        ]),
      );
      expect(prismaService.user.findMany).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      const uuid = randomUUID();
      const user: User = {
        id: uuid,
        username: 'test',
        password: 'hashedPassword',
        salaryPerSecond: 0.001736111111111111,
        displayName: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: null,
      };
      prismaService.user.findUnique = jest.fn().mockResolvedValue(user);

      const result = await service.findById(uuid);

      expect(result).toEqual(
        expect.objectContaining({ id: uuid, username: 'test' }),
      );
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: uuid },
      });
    });

    it('should return null if user not found', async () => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue(null);

      const uuid = randomUUID();
      const result = await service.findById(uuid);

      expect(result).toBeNull();
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: uuid },
      });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { username: 'updatedTest' };
      const uuid = randomUUID();
      const updatedUser: User = {
        id: uuid,
        username: 'updatedTest',
        password: 'hashedPassword',
        salaryPerSecond: 0.001736111111111111,
        displayName: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: null,
      };

      prismaService.user.update = jest.fn().mockResolvedValue(updatedUser);

      const result = await service.update(uuid, updateUserDto);

      expect(result).toEqual(
        expect.objectContaining({ id: uuid, username: 'updatedTest' }),
      );
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: uuid },
        data: updateUserDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const uuid = randomUUID();
      const deletedUser: User = {
        id: uuid,
        username: 'test',
        password: 'hashedPassword',
        salaryPerSecond: 0.001736111111111111,
        displayName: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: null,
      };

      prismaService.user.delete = jest.fn().mockResolvedValue(deletedUser);

      const result = await service.remove(uuid);

      expect(result).toEqual(
        expect.objectContaining({ id: uuid, username: 'test' }),
      );
      expect(prismaService.user.delete).toHaveBeenCalledWith({
        where: { id: uuid },
      });
    });
  });
});
