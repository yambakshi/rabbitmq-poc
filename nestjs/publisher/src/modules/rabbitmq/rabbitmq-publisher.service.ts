import { Injectable } from '@nestjs/common';
import { Channel } from 'amqp-connection-manager';
import { connect } from 'amqplib';

@Injectable()
export class RabbitMQPublisher {
    channel: Channel;
    exchange: string;

    constructor() {
        this.connect();
    }

    async connect(): Promise<void> {
        const connection = await connect('amqp://localhost:5672');
        this.channel = await connection.createChannel();
        this.exchange = 'iot_events';

        this.channel.assertExchange(this.exchange, 'topic', {
            durable: true
        });
    }

    publish({ routingKey, message }: { routingKey: string, message: any }): boolean {
        return this.channel.publish(this.exchange, routingKey, Buffer.from(message));
    }
}