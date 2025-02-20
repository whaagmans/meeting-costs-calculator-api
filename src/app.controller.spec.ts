import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotImplementedException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('welcome', () => {
    it('should return "Welcome to the Meeting Costs Calculator API"', () => {
      expect(appController.getWelcome()).toEqual({
        message: 'Welcome to the Meeting Costs Calculator API',
      });
    });
  });
  describe('health', () => {
    it('should throw NotImplementedException', () => {
      expect(() => appController.getHealth()).toThrow(
        new NotImplementedException('getHealth not implemented yet.'),
      );
    });
  });
});
