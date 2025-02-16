import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':roomCode')
  findOne(@Param('roomCode') roomCode: string) {
    return this.roomsService.findByRoomCode(roomCode);
  }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Patch(':roomCode')
  update(
    @Param('roomCode') roomCode: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomsService.update(roomCode, updateRoomDto);
  }

  @Delete(':roomCode')
  async remove(@Param('roomCode') roomCode: string) {
    return this.roomsService.remove(roomCode);
  }
}
