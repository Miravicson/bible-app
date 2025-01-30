import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import MainWindow from './windows/MainWindow';
import '@/db/seed/bible-books';
import '@/lib/utils';
import { configureDatabase } from './db';
import { Debug } from './components/debug';

await configureDatabase();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <>
      <MainWindow />
      <Debug />
    </>
  </React.StrictMode>,
);
