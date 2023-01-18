import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('GREETING_SERVICE') private client: ClientRMQ) { }

  async getHello() {
    console.log(`Sending RabbitMQ message 'Progressive Coder'`);
    return this.client.send({ cmd: 'greeting' }, 'Progressive Coder');
  }

  async getHelloAck() {
    console.log(`Sending RabbitMQ message 'Progressive Coder Ack'`);
    // this.client.setupChannel()
    // this.client.channel.assertExchange(
    //   'topic-test', 'topic', {
    //   durable: false
    // })
    return this.client.send({ cmd: 'greeting-ack' }, 'Progressive Coder Ack');
  }

  async getHelloAsync() {
    const message = await this.client.send({ cmd: 'greeting-async' }, 'Progressive Coder');
    return message;
  }

  async publishEvent() {
    this.client.emit('book-created', { 'bookName': 'The Way Of Kings', 'author': 'Brandon Sanderson' });
  }
}