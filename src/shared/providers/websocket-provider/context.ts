import { createContext, useContext } from 'react';

export const WebsocketContext = createContext<WebSocket | null>(null);

export const useWebsocketConnection = () => {
  const connection = useContext(WebsocketContext);

  if (!connection) {
    throw new Error('No websocket connection!');
  }

  return connection;
};
