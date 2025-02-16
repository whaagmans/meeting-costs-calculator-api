import { Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createRoomDto: CreateRoomDto): Promise<Room> {
    const random = Math.random().toString(36).substring(7);

    return this.prisma.room.create({
      data: {
        ...createRoomDto,
        roomCode: random,
      },
    });
  }

  findAll(): Promise<Room[]> {
    return this.prisma.room.findMany();
  }

  findByRoomCode(roomCode: string): Promise<Room | null> {
    return this.prisma.room.findUnique({
      where: {
        roomCode,
      },
    });
  }

  update(roomCode: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    return this.prisma.room.update({
      where: {
        roomCode,
      },
      data: updateRoomDto,
    });
  }

  async remove(roomCode: string): Promise<Room> {
    return await this.prisma.room.delete({
      where: {
        roomCode,
      },
    });
  }
}
