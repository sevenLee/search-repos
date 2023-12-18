/* c8 ignore start */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/tailwind.css';
import { ApolloProvider } from '@apollo/client';
import client from './client.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
/* c8 ignore stop */
