import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserDto implements User {
  id: string;
  username: string;
  displayName: string;
  salaryPerSecond: number;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;

  @Exclude()
  password: string;
}
