import { Inject, Injectable } from '@nestjs/common';
import { ClientMqtt } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('MQTT_SERVICE') private client: ClientMqtt) { }

  sendMqttMessage(body: { routingKey: string, message: any }): Observable<any> {
    console.log(`Sending message '${body.message}' (Routing Key = '${body.routingKey}') over MQTT`);
    return this.client.send(body.routingKey, body);
  }
}
