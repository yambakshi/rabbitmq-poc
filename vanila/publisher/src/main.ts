import { connect } from 'amqplib';

async function main() {
    const connection = await connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    const exchange = 'topic_exchange_test';
    const routingKey = 'anonymous.info';
    const message = 'Hi Mom!';

    channel.assertExchange(exchange, 'topic', {
        durable: true
    });

    channel.publish(exchange, routingKey, Buffer.from(message));
}

main();