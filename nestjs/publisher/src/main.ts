import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 1883;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.MQTT,
    options: {
      url: `mqtt://127.0.0.1:${port}`,
    },
  });
  
  await app.listen().then(() => {
    console.log(`RabbitMQ publisher microservice is listening on ${port}`);
  });
}
bootstrap();
