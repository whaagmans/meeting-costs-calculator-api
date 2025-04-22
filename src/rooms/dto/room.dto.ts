import { MeetingStatus } from '@prisma';
import { Exclude } from 'class-transformer';

export class RoomDto {
  id: string;
  name: string;
  roomCode: string;
  meetingStatus: MeetingStatus;
  startedAt: Date | null;
  endedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  roomPassword: string | null;
}
