import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsPositive } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsPositive()
  salaryPerSecond: number;
}
