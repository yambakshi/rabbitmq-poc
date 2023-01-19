import { Injectable } from '@nestjs/common';
import { RabbitMQPublisher } from './services';

@Injectable()
export class AppService {
  constructor(private readonly rabbitMQPublisher: RabbitMQPublisher) { }

  async publishEvent({ routingKey, message }: { routingKey: string, message: any }) {
    console.log(`Publishing message: ${message} with routing key = ${routingKey}`)
    return this.rabbitMQPublisher.publish(message, routingKey);
  }
}