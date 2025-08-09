import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { SQLiteProvider } from './context/SQLiteContext';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <SQLiteProvider>
      <App />
    </SQLiteProvider>
  </React.StrictMode>
);