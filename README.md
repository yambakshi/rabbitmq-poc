# RabbitMQ POC
This is a POC of the following flow:
1. A `POST` request is sent to the `MQTT` publisher (listening on `http://localhost:3000`).
2. The `MQTT` publisher sends the body of the `POST` request as a `MQTT` message.
3. The `RabbitMQ` publisher consumes the `MQTT` message and sends it as a `RabbitMQ` message.
4. The `RabbitMQ` exchange (named `iot_events`) routes the message to the right queue based on the routing key.
5. The `RabbitMQ` message is consumed by either the `Inventory Consumer` or the `Notifications Consumer`.

The microservices in this demo are:
- `MQTT` publisher - Acting both as REST API (listening on port 3000) and a `MQTT` publisher.
- `RabbitMQ` publisher - Acting as both a `MQTT` consumer and a `RabbitMQ` publisher.
- Inventory Consumer - A `RabbitMQ` consumer listening on queue `inventory_queue`.
- Notifications Consumer - A `RabbitMQ` consumer listening on queue `notifications_queue`.

## Technologies
- NestJS `9.0.0`
- RabbitMQ `3.11.6`
- Mosquitto `2.0.15`
- Docker `20.10.21`
- Typescript `4.7.4`

## Installation
### 1. Mosquitto (MQTT Broker)
1. Install `Mosquitto` docker image ([source](https://hub.docker.com/_/eclipse-mosquitto))
   ```
   docker run -d --name some-mosquito -p 1883:1883 eclipse-mosquitto
   ```
2. Configure `Mosquitto` in the `Docker` container
   1. Open the `Mosquitto` config
      ```
      vi /mosquitto/config/mosquitto.conf
      ```

   2. Look for the line:
      ```
      #listener
      ```

   3. And change it to:
      ```
      listener 1883
      allow_anonymous true
      ```
   4. Restart the `Mosquitto` container

   This allows unauthenticated communication with the `Mosquitto` container.
   
   To learn more about `Mosquitto` authentication visit [the official documentation](https://mosquitto.org/documentation/authentication-methods/)

### 2. RabbitMQ
1. Install `RabbitMQ` docker image ([source](https://hub.docker.com/_/rabbitmq))
   ```
   docker run -d --name some-rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
   ```
   
2. Make sure `RabbitMQ` is installed correctly by going to `RabbitMQ` management on `http://localhost:15672`.

   Default username is `guest` and default password is `guest`.

### 3. Microservices
1. Clone `NestJS` starter code for the consumers and publishers ([source](https://docs.nestjs.com/))
   ```
   git clone https://github.com/nestjs/typescript-starter.git mqtt-publisher
   git clone https://github.com/nestjs/typescript-starter.git rabbitmq-publisher
   git clone https://github.com/nestjs/typescript-starter.git inventory-consumer
   git clone https://github.com/nestjs/typescript-starter.git notifications-consumer
   ```

2. Install `npm` packages for each microservice
   ```
   cd nestjs/mqtt-publisher
   npm i
   
   cd ../rabbitmq-publisher
   npm i

   cd ../inventory-consumer
   npm i
   
   cd ../notifications-consumer
   npm i
   ```

## Running
1. Open the `MQTT` publisher in a separate `VSCode` instance and run it using `F5`
   ```
   code nestjs/mqtt-publisher
   ```
   
2. Run the `RabbitMQ` publisher in terminal
   ```
   cd nestjs/rabbitmq-publisher
   npx ts-node src/main.ts
   ```

3. Split the terminal and run the `Inventory Consumser`
   ```
   cd ../inventory-consumer
   npx ts-node src/main.ts
   ```
   
4. Split the terminal again and run the `Notifications Consumser`
   ```
   cd ../notifications-consumer
   npx ts-node src/main.ts
   ```
5. Use `Postman` or `curl` to send a `POST` request with the following body to `http://localhost:3000`
   ```
   {
        "routingKey": "inventory.info",
        "message": "Hello"
   }
   ```

6. If everything was installed and configured correctly you should see the following in the `Inventory Consumer` terminal
   ```
   Received RabbitMQ message: 'Hello'
   ```
   
## Links
- [Fireship - NestJS](https://www.youtube.com/watch?v=0M8AYU_hPas&t=33s&ab_channel=Fireship)
- [Fireship - RabbitMQ](https://www.youtube.com/watch?v=NQ3fZtyXji0&ab_channel=Fireship)
- [NestJS Microservice Full Course](https://www.youtube.com/watch?v=IsubcKdZPyE&t=2004s)
- [How to create a NestJS RabbitMQ Microservice?](https://progressivecoder.com/how-to-create-a-nestjs-rabbitmq-microservice/)
- [NestJS - MQTT](https://docs.nestjs.com/microservices/mqtt)
- [NestJS - RabbitMQ](https://docs.nestjs.com/microservices/rabbitmq)
- [NestJS - Microservices](https://docs.nestjs.com/microservices/basics)
- [Topics - NodeJS](https://www.rabbitmq.com/tutorials/tutorial-five-javascript.html)
- [Consumer Acknowledgements and Publisher Confirms](https://www.rabbitmq.com/confirms.html#acknowledgement-modes)
- [NPM - NestJS Microservices](https://www.npmjs.com/package/@nestjs/microservices)
- [NPM - MQTT](https://www.npmjs.com/package/mqtt)
- [NPM - AMQP Lib](https://www.npmjs.com/package/amqplib)
- [NPM - AMQP Lib Types](https://www.npmjs.com/package/@types/amqplib)