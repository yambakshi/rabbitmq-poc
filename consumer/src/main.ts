import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'main_queue',
      noAck: false,
      queueOptions: {
        durable: true
      }
    },
  });

  app.listen().then(() => {
    console.log('Consumer microservice is listening')
  })
}
bootstrap();
