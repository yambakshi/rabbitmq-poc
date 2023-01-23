import { Injectable } from '@nestjs/common';
import { RabbitMQPublisher } from './services';

@Injectable()
export class AppService {
  constructor(private readonly rabbitMQPublisher: RabbitMQPublisher) { }

  async publishEvent(event: { routingKey: string, message: any }) {
    console.log(`Publishing RabbitMQ message: '${event.message}' (Routing Key = '${event.routingKey}')`);
    return this.rabbitMQPublisher.publish(event);
  }
}