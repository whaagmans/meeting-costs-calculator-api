import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import { PrismaService } from '@/config/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from '@prisma/client';

describe('RoomsService', () => {
  let service: RoomsService;
  let prismaService: PrismaService;
  const room: Room = {
    id: '1',
    name: 'Test Room',
    roomCode: 'random',
    roomPassword: null,
    meetingStatus: 'NOT_STARTED',
    startedAt: null,
    endedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsService, PrismaService],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a room', async () => {
      const createRoomDto: CreateRoomDto = { name: 'Test Room' };

      jest.spyOn(prismaService.room, 'create').mockResolvedValue(room);

      expect(await service.create(createRoomDto)).toEqual(room);
    });
  });

  describe('findAll', () => {
    it('should return an array of rooms', async () => {
      const rooms: Room[] = [room];

      jest.spyOn(prismaService.room, 'findMany').mockResolvedValue(rooms);

      expect(await service.findAll()).toEqual(rooms);
    });
  });

  describe('findByRoomCode', () => {
    it('should return a room by room code', async () => {
      jest.spyOn(prismaService.room, 'findUnique').mockResolvedValue(room);

      expect(await service.findByRoomCode('random')).toEqual(room);
    });

    it('should return null if room not found', async () => {
      jest.spyOn(prismaService.room, 'findUnique').mockResolvedValue(null);

      expect(await service.findByRoomCode('nonexistent')).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a room', async () => {
      const updateRoomDto: UpdateRoomDto = { name: 'Updated Room' };
      const updatedRoom: Room = { ...room, name: 'Updated Room' };
      jest.spyOn(prismaService.room, 'update').mockResolvedValue(updatedRoom);

      expect(await service.update('random', updateRoomDto)).toEqual(
        updatedRoom,
      );
    });
  });

  describe('remove', () => {
    it('should remove a room', async () => {
      jest.spyOn(prismaService.room, 'delete').mockResolvedValue(room);

      expect(await service.remove('random')).toEqual(room);
    });
  });
});
