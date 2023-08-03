import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): boolean {
    return true;
  }
}
