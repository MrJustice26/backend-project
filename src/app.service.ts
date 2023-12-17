import { Injectable } from '@nestjs/common';
import { ServerStatus } from './server-status.type';

@Injectable()
export class AppService {
  getServerStatus(): ServerStatus {
    return {
      "status": "OK"
    };
  }
}
