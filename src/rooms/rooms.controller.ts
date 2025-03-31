import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';

import type { CreateRoomDto } from './dto/create-room.dto';
import type { RoomDto } from './dto/room.dto';
import type { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  findAll(): Promise<RoomDto[]> {
    return this.roomsService.findAll();
  }

  @Get(':roomCode')
  async findOne(@Param('roomCode') roomCode: string): Promise<RoomDto> {
    const room = await this.roomsService.findByRoomCode(roomCode);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<RoomDto> {
    return this.roomsService.create(createRoomDto);
  }

  @Patch(':roomCode')
  update(
    @Param('roomCode') roomCode: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<RoomDto> {
    return this.roomsService.update(roomCode, updateRoomDto);
  }

  @Delete(':roomCode')
  async remove(@Param('roomCode') roomCode: string): Promise<RoomDto> {
    return this.roomsService.remove(roomCode);
  }
}
