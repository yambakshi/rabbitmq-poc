import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('GREETING_SERVICE') private client: ClientProxy) { }

  sendMqttMessage(body: { routingKey: string, message: any }): Observable<any> {
    console.log(`Sending message '${body.message}' (Routing Key = '${body.routingKey}') over MQTT`);
    return this.client.send('greeting', body);
  }
}
