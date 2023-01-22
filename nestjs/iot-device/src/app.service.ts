import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('GREETING_SERVICE') private client: ClientProxy) { }

  sendMqttMessage(msg): Observable<any> {
    return this.client.send('greeting', msg);
  }
}
