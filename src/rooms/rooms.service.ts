import { Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from '@/config/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import ShortUniqueId from 'short-unique-id';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const roomCode = await this.generateRoomCode();

    return this.prisma.room.create({
      data: {
        ...createRoomDto,
        roomCode,
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
