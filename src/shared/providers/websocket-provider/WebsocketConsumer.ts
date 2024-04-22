import { WS_SERVER_URL } from '@/shared';

export class WebsocketConsumer {
  public connection = new WebSocket(`${WS_SERVER_URL}/notification/ws/`);

  constructor() {
    this.connection.addEventListener('error', this.reconnect);
    this.connection.addEventListener('close', this.reconnect);
  }

  reconnect() {
    this.connection = new WebSocket(`${WS_SERVER_URL}/notification/ws/`);
  }
}
