import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import type { Room } from '@prisma/client';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':roomCode')
  async findOne(@Param('roomCode') roomCode: string): Promise<Room> {
    const room = await this.roomsService.findByRoomCode(roomCode);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomsService.create(createRoomDto);
  }

  @Patch(':roomCode')
  update(
    @Param('roomCode') roomCode: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    return this.roomsService.update(roomCode, updateRoomDto);
  }

  @Delete(':roomCode')
  async remove(@Param('roomCode') roomCode: string): Promise<Room> {
    return this.roomsService.remove(roomCode);
  }
}
