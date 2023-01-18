import { connect } from 'amqplib';

async function main() {
    const connection = await connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    const queue = 'topic_queue_test';
    const exchange = 'topic_exchange_test';
    var key = 'anonymous.info';
    const message = 'Hi Mom!';

    channel.assertExchange(exchange, 'topic', {
        durable: true
    });


    // await channel.assertQueue(queue, {
    //     durable: false
    // })

    // channel.sendToQueue(queue, Buffer.from(message));
    channel.publish(exchange, key, Buffer.from(message));
}

main();