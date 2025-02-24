import { Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsEnum,
  IsInt,
  IsISO4217CurrencyCode,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PaymentInterval } from '../users.interface';
class SalaryDto {
  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsEnum(PaymentInterval)
  paymentInterval: PaymentInterval;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  workedHoursPerWeek: number;

  @IsISO4217CurrencyCode()
  @IsOptional()
  currency?: string;
}
export class CreateUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  displayName: string;

  @IsStrongPassword()
  password: string;

  @ValidateNested()
  @Type(() => SalaryDto)
  salaryInfo: SalaryDto;
}
