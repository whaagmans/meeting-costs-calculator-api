import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaService } from './config/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [RoomsModule, UsersModule, TerminusModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
