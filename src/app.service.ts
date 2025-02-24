import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    throw new NotImplementedException('getHealth not implemented yet.');
  }
}
