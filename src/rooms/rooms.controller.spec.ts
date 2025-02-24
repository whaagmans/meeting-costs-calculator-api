import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { PrismaService } from '@/config/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from '@prisma/client';

describe('RoomsController', () => {
  let controller: RoomsController;
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [RoomsService, PrismaService],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of rooms', async () => {
      const result: Room[] = [
        {
          id: '1',
          name: 'Room 1',
          roomCode: '',
          roomPassword: null,
          meetingStatus: 'NOT_STARTED',
          startedAt: null,
          endedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single room', async () => {
      const result: Room = {
        id: '1',
        name: 'Room 1',
        roomCode: '',
        roomPassword: null,
        meetingStatus: 'NOT_STARTED',
        startedAt: null,
        endedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'findByRoomCode').mockResolvedValue(result);

      expect(await controller.findOne('roomCode')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new room', async () => {
      const createRoomDto: CreateRoomDto = { name: 'New Room' };
      const result: Room = {
        id: '1',
        ...createRoomDto,
        roomCode: '',
        roomPassword: null,
        meetingStatus: 'NOT_STARTED',
        startedAt: null,
        endedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createRoomDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a room', async () => {
      const updateRoomDto: UpdateRoomDto = { name: 'New Room' };
      const result: Room = {
        ...updateRoomDto,
        id: '1',
        roomCode: '',
        roomPassword: null,
        meetingStatus: 'NOT_STARTED',
        startedAt: null,
        endedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('roomCode', updateRoomDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a room', async () => {
      const result: Room = {
        id: '1',
        name: 'Room 1',
        roomCode: '',
        roomPassword: null,
        meetingStatus: 'NOT_STARTED',
        startedAt: null,
        endedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('roomCode')).toBe(result);
    });
  });
});
