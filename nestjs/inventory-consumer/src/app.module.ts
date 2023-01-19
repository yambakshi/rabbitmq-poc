import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { RabbitMQConsumer } from './services';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    // RabbitMQConsumer
  ],
})
export class AppModule { }
