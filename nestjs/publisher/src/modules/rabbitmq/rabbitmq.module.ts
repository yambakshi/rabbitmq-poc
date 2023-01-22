import { Module } from '@nestjs/common';
import { RabbitMQPublisher } from './rabbitmq-publisher.service';

@Module({
  imports: [],
  controllers: [],
  providers: [RabbitMQPublisher],
  exports: [RabbitMQPublisher]
})
export class RabbitMQModule { }
