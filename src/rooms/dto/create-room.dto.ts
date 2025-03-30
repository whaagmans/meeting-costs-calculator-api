import { IsOptional, IsString, IsStrongPassword } from 'class-validator';
export class CreateRoomDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsStrongPassword({
    minLength: 4,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  roomPassword?: string | null;
}
