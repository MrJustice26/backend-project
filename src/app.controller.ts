import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ServerStatus } from './server-status.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ServerStatus {
    return this.appService.getServerStatus();
  }
}
