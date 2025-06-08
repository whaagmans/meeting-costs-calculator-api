import { PrismaService } from '@/config/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import ShortUniqueId from 'short-unique-id';
import { RoomDto } from './dto/room.dto';

import type { Room } from '@prisma/client';
import type { CreateRoomDto } from './dto/create-room.dto';
import type { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRoomDto: CreateRoomDto): Promise<RoomDto> {
    const roomCode = await this.generateRoomCode();

    const room = await this.prisma.room.create({
      data: {
        ...createRoomDto,
        roomCode,
      },
    });
    return plainToInstance(RoomDto, room);
  }

  async findAll(): Promise<RoomDto[]> {
    const rooms = await this.prisma.room.findMany();
    return plainToInstance(RoomDto, rooms);
  }

  async findByRoomCode(roomCode: string): Promise<RoomDto | null> {
    const room = await this.prisma.room.findUnique({
      where: {
        roomCode,
      },
    });
    return plainToInstance(RoomDto, room);
  }

  async update(roomCode: string, updateRoomDto: UpdateRoomDto): Promise<RoomDto> {
    const room = await this.prisma.room.update({
      where: {
        roomCode,
      },
      data: updateRoomDto,
    });
    return plainToInstance(RoomDto, room);
  }

  async remove(roomCode: string): Promise<RoomDto> {
    const room = await this.prisma.room.delete({
      where: {
        roomCode,
      },
    });
    return plainToInstance(RoomDto, room);
  }

  private async generateRoomCode(): Promise<string> {
    for (let i = 0; i < 8; i++) {
      const { randomUUID } = new ShortUniqueId({
        length: 7,
        dictionary: 'alphanum',
      });
      const randomCode = randomUUID();

      // Check if the room code already exists in the database
      const roomExists = await this.prisma.room.findUnique({
        where: {
          roomCode: randomCode,
        },
      });

      if (!roomExists) {
        return randomCode;
      }
    }
    throw new Error(
      'Failed to generate a unique room code after multiple attempts.',
    );
  }
}
