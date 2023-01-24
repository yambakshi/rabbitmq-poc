export default () => ({
    nodeEnv: process.env.NODE_ENV,
    rabbitMq: {
        host: process.env.RABBITMQ_HOST,
        exchangeName: process.env.RABBITMQ_EXCHANGE_NAME
    }
})