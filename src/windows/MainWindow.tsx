import { useEffect } from 'react';
import { Routes } from '@/routes';
import { GlobalContextProvider } from '@/context/context';
import { Window } from '@tauri-apps/api/window';
import { UnlistenFn } from '@tauri-apps/api/event';

function closeDisplayAlongsideMainWindowEffect() {
  let unlistenFn: UnlistenFn = () => {};
  const mainWindow = new Window('main');
  const displayWindow = new Window('display');
  (async () => {
    unlistenFn = await mainWindow.onCloseRequested(async (event) => {
      console.log('This is the close requested event', event);

      await displayWindow.close();
    });
  })();
  return () => unlistenFn();
}

function MainWindow() {
  useEffect(closeDisplayAlongsideMainWindowEffect, []);
  return (
    <GlobalContextProvider>
      <Routes />
    </GlobalContextProvider>
  );
}

export default MainWindow;
