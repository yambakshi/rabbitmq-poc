import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQPublisher } from './services';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    RabbitMQPublisher
  ]
})
export class AppModule { }
