import { Injectable } from '@nestjs/common';
import { RabbitMQPublisher } from './modules/rabbitmq/rabbitmq-publisher.service';

@Injectable()
export class AppService {
  constructor(private readonly rabbitMQPublisher: RabbitMQPublisher) { }

  async publishEvent(event: { routingKey: string, message: any }) {
    console.log(`Publishing message: ${event.message} with routing key = ${event.routingKey}`);
    return this.rabbitMQPublisher.publish(event);
  }
}