import { CustomTransportStrategy, Server } from "@nestjs/microservices";
import { Channel } from "amqp-connection-manager";
import { connect } from 'amqplib';

export class RabbitMQTransporter extends Server implements CustomTransportStrategy {
    channel: Channel;
    exchange: string;
    routingKey: string;
    queue: string;

    constructor(exchange: string, routingKey: string, queue: string) {
        super();
        this.exchange = exchange;
        this.routingKey = routingKey;
        this.queue = queue;
    }

    /**
       * This method is triggered when you run "app.listen()".
       */
    async listen(callback: () => void) {
        const connection = await connect('amqp://localhost:5672');
        console.log('RabbitMQ is connected');
        this.channel = await connection.createChannel();
        this.channel.assertExchange(this.exchange, 'topic', {
            durable: true
        });

        const { queue } = await this.channel.assertQueue(this.queue, {
            durable: true,
            // exclusive: true
        })

        console.log(`${this.queue} queue is asserted`);
        this.channel.bindQueue(queue, this.exchange, this.routingKey);

        this.channel.consume(queue, (msg) => {
            console.log(`Received message: '${msg.content.toString()}'`);
            this.channel.ack(msg, false);
            // }, { noAck: true })
        })

        callback();
    }

    /**
     * This method is triggered on application shutdown.
     */
    close() { }
}