import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import { appDataDir } from '@tauri-apps/api/path';
import MainWindow from './windows/MainWindow';
import '@/db/seed/bible-books';
import '@/lib/utils';
import { migrate } from './db/migrate';
import { runSeed } from './db/seed';

(async function () {
  try {
    await migrate();
    await runSeed();
    const appDataDirPath = await appDataDir();
    console.log(`App Data Directory path`, appDataDirPath);
  } catch (error) {
    console.log(error);
  }
})();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainWindow />
  </React.StrictMode>,
);
