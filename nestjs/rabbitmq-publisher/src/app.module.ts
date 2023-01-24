import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQPublisher } from './services';
import { env } from './config';

@Module({
  imports: [ConfigModule.forRoot({
    load: [env],
  })],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'RABBITMQ_PUBLISHER',
      useFactory: async (configService: ConfigService) => {
        const rabbitMQPublisher = new RabbitMQPublisher(configService);
        await rabbitMQPublisher.connect();
        return rabbitMQPublisher;
      },
      inject: [ConfigService]
    }
  ]
})
export class AppModule { }
