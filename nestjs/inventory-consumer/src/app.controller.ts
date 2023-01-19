import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'greeting' })
  getGreetingMessage(name: string): string {
    console.log(`Received RabbitMQ message '${name}'`);
    return `Hello ${name}`;
  }

  @MessagePattern({ cmd: 'greeting-ack' })
  getGreetingMessageAck(@Payload() data: string, @Ctx() context: RmqContext): string {
    console.log(`Received RabbitMQ message '${data}'`);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);
    return `Hello ${data}`;
  }

  @MessagePattern({ cmd: 'greeting-async' })
  async getGreetingMessageAysnc(name: string): Promise<string> {
    return `Hello ${name} Async`;
  }

  @EventPattern('book-created')
  async handleBookCreatedEvent(data: Record<string, unknown>) {
    console.log(data);
  }

  @EventPattern('inventory.info')
  async handleInventoryEvent(data: Record<string, unknown>) {
    console.log(data);
  }
}