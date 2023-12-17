import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ServerStatus } from './server-status.type';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({summary: 'Get server status.'})
  getHello(): ServerStatus {
    return this.appService.getServerStatus();
  }
}
