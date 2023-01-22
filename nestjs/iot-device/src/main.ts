import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port,() => {
    console.log(`MQTT publisher listening on port ${port}`)
  });
}
bootstrap();
