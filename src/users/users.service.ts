import { PrismaService } from '@/config/prisma/prisma.service';
import { calculateSalaryPerSecond } from '@/lib/salary-calculation';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'argon2';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto, SalaryInfo } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUserDto: CreateUserDto,
    salaryInfo: SalaryInfo,
  ): Promise<UserDto> {
    const { amount, paymentInterval, workedHoursPerWeek } = salaryInfo;
    const salaryPerSecond = calculateSalaryPerSecond(
      amount,
      paymentInterval,
      workedHoursPerWeek,
    );

    const password = await hash(createUserDto.password);

    const createdUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password,
        salaryPerSecond,
      },
    });
    return plainToInstance(UserDto, createdUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return plainToInstance(UserDto, users);
  }

  async findById(id: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return plainToInstance(UserDto, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
    return plainToInstance(UserDto, updatedUser);
  }

  async remove(id: string): Promise<UserDto> {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return plainToInstance(UserDto, deletedUser);
  }
}
