import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsUUID } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsUUID()
  id: string;
}
