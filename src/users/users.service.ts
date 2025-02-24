import { Injectable } from '@nestjs/common';
import { CreateUserDto, SalaryInfo } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/service/prisma.service';
import { PaymentInterval } from './users.interface';
import { hash } from 'argon2';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';

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

function calculateSalaryPerSecond(
  amount: number,
  paymentInterval: PaymentInterval,
  workedHoursPerWeek: number,
): number {
  const MONTHS_PER_YEAR = 12;
  const SECONDS_PER_HOUR = 3600;
  const workedHoursPerMonth = workedHoursPerWeek * 4;
  switch (paymentInterval) {
    case PaymentInterval.Hour: {
      return amount / SECONDS_PER_HOUR;
    }
    case PaymentInterval.Month: {
      return amount / workedHoursPerMonth / SECONDS_PER_HOUR;
    }
    case PaymentInterval.Year: {
      const workedHoursPerYear = workedHoursPerMonth * MONTHS_PER_YEAR;
      return amount / workedHoursPerYear / SECONDS_PER_HOUR;
    }
  }
}
