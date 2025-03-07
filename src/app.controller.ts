import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWelcome(): { message: string } {
    return { message: 'Welcome to the Meeting Costs Calculator API' };
  }

  @Get('health')
  getHealth(): string {
    return this.appService.getHealth();
  }
}
