import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    throw new NotImplementedException('Method not implemented yet.');
  }
}
