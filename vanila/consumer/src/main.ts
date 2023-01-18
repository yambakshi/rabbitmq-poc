import { connect } from 'amqplib';

async function main() {
    const connection = await connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    const exchange = 'topic_exchange_test';
    const routingKey = 'anonymous.info';

    channel.assertExchange(exchange, 'topic', {
        durable: true
    });

    channel.assertQueue('topic_queue_test', {
        durable: true,
        // exclusive: true
    }).then((res) => {
        const queue = res.queue;
        channel.bindQueue(queue, exchange, routingKey);

        channel.consume(queue, (msg) => {
            console.log(`Received message: '${msg.content.toString()}'`);
            channel.ack(msg, false);
        // }, { noAck: true })
    })
    }, (err) => {
        console.error(err);
    })
}

main();