import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern('inventory.info')
  handleInventoryEvent(@Payload() data: any, @Ctx() context: MqttContext) {
    console.log(`Received Inventory MQTT message (Topic = '${context.getTopic()}')`);
    return this.appService.publishEvent(data);
  }

  @MessagePattern('notifications.info')
  handleNotificationsEvents(@Payload() data: any, @Ctx() context: MqttContext) {
    console.log(`Received Notifications MQTT message (Topic = '${context.getTopic()}')`);
    return this.appService.publishEvent(data);
  }
}
