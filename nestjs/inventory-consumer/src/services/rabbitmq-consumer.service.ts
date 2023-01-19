import { Injectable } from "@nestjs/common";
import { Channel } from "amqp-connection-manager";
import { connect } from 'amqplib';

@Injectable()
export class RabbitMQConsumer {
    channel: Channel;
    exchange: string;

    constructor() {
        this.connect();
    }

    async connect(): Promise<void> {
        const connection = await connect('amqp://localhost:5672');
        this.channel = await connection.createChannel();
        this.exchange = 'iot_events';

        const routingKey = 'inventory.info';
        this.channel.assertExchange(this.exchange, 'topic', {
            durable: true
        });
    
        this.channel.assertQueue('inventory_queue', {
            durable: true,
            // exclusive: true
        }).then((res) => {
            const queue = res.queue;
            this.channel.bindQueue(queue, this.exchange, routingKey);
    
            this.channel.consume(queue, (msg) => {
                console.log(`Received message: '${msg.content.toString()}'`);
                this.channel.ack(msg, false);
            // }, { noAck: true })
        })
        }, (err) => {
            console.error(err);
        })
    }
}