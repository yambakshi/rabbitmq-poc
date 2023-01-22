import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  handleMqttMessage(@Body() body: { routingKey: string, message: any }): Observable<any> {
    return this.appService.sendMqttMessage(body);
  }
}
