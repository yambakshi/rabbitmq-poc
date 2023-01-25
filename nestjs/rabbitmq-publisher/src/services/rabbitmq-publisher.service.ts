import { Injectable } from '@nestjs/common';
import { Channel } from 'amqp-connection-manager';
import { connect } from 'amqplib';

@Injectable()
export class RabbitMQPublisher {
    host: string;
    channel: Channel;
    exchangeName: string;

    constructor({ host, exchangeName }: { host: string, exchangeName: string }) {
        this.host = host;
        this.exchangeName = exchangeName;
    }

    async connect(): Promise<void> {
        const connection = await connect(this.host);
        console.log('Connected to RabbitMQ');

        this.channel = await connection.createChannel();
        this.channel.assertExchange(this.exchangeName, 'topic', {
            durable: true
        });
    }

    publish({ routingKey, message }: { routingKey: string, message: any }): boolean {
        return this.channel.publish(this.exchangeName, routingKey, Buffer.from(message));
    }
}