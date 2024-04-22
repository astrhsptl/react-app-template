import { ToastProvider } from '@/shared/';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../shared/styles/base.css';

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            {/* <WebsocketProvider>{children}</WebsocketProvider> */}
            {children}
          </ToastProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};
