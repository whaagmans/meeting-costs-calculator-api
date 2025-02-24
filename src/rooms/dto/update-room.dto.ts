import { PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';
import { IsString } from 'class-validator';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @IsString()
  name: string;
}
