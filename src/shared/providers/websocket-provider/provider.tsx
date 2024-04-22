import React, { ReactNode } from 'react';
import { WebsocketConsumer } from './WebsocketConsumer';
import { WebsocketContext } from './context';

interface WebsocketProviderProps {
  children: ReactNode;
}

export const WebsocketProvider: React.FC<WebsocketProviderProps> = ({
  children,
}) => {
  const consumer = new WebsocketConsumer();

  return (
    <WebsocketContext.Provider value={consumer.connection}>
      {children}
    </WebsocketContext.Provider>
  );
};
