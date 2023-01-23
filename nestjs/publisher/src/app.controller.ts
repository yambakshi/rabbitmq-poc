import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern('greeting')
  getNotifications(@Payload() data: any, @Ctx() context: MqttContext) {
    console.log(`Received MQTT message (Topic = '${context.getTopic()}')`);
    return this.appService.publishEvent(data);
  }
}
