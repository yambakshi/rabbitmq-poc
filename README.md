# RabbitMQ POC
## Technologies
- NestJS `9.0.0`
- RabbitMQ `3.11.6`
- Docker `20.10.21`
- Typescript `4.7.4`

## Installation
1. Install `RabbitMQ` docker image ([source](https://hub.docker.com/_/rabbitmq))
   ```
   docker run -d --name some-rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
   ```
   
   Make sure `RabbitMQ` is installed correctly by going to `RabbitMQ` management on `http://localhost:15672`.

   Default username is `guest` and default password is `guest`.

2. Clone `NestJS` starter code for consumer and publisher ([source](https://docs.nestjs.com/))
   ```
   git clone https://github.com/nestjs/typescript-starter.git consumer
   git clone https://github.com/nestjs/typescript-starter.git publisher
   ```

3. Install `npm` packages
   ```
   cd consumer
   npm i

   cd ../publisher
   npm i
   ```
   
4. Install `NestJS` microservice ([source](https://www.npmjs.com/package/@nestjs/microservices))
   ```
   npm i @nestjs/microservices
   ```

5. Install `NestJS`'s `RabbitMQ` microservice ([source](https://docs.nestjs.com/microservices/rabbitmq))
   ```
   npm i --save amqplib amqp-connection-manager
   ```

6. Install `amqplib` types ([source](https://www.npmjs.com/package/@types/amqplib))
   ```
   npm install --save @types/amqplib
   ```

## Running
1. Run both publisher and consumer project by pressing `F5`
2. Send a `GET` request to `http://localhost:8000`
   
## Links
- [Fireship - NestJS](https://www.youtube.com/watch?v=0M8AYU_hPas&t=33s&ab_channel=Fireship)
- [Fireship - RabbitMQ](https://www.youtube.com/watch?v=NQ3fZtyXji0&ab_channel=Fireship)
- [NestJS Microservice Full Course](https://www.youtube.com/watch?v=IsubcKdZPyE&t=2004s)
- [How to create a NestJS RabbitMQ Microservice?](https://progressivecoder.com/how-to-create-a-nestjs-rabbitmq-microservice/)
- [NestJS - RabbitMQ](https://docs.nestjs.com/microservices/rabbitmq)
- [NestJS - Microservices](https://docs.nestjs.com/microservices/basics#client)
- [Topics - NodeJS](https://www.rabbitmq.com/tutorials/tutorial-five-javascript.html)
- [Consumer Acknowledgements and Publisher Confirms](https://www.rabbitmq.com/confirms.html#acknowledgement-modes)