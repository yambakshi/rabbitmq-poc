import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  postEvent(@Body() body: { routingKey: string, message: any }): Promise<boolean> {
    return this.appService.publishEvent(body);
  }
}
