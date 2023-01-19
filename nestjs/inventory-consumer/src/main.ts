import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { RabbitMQTransporter } from './transporters';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    strategy: new RabbitMQTransporter('iot_events', 'inventory.info', 'inventory_queue')
  });

  app.listen().then(() => {
    console.log('Inventory consumer microservice is listening')
  })
}
bootstrap();
