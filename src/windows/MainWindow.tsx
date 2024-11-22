import { invoke } from '@tauri-apps/api/core';
import { useEffect } from 'react';
import { Routes } from '@/routes';
import { GlobalContextProvider } from '@/context/context';

function MainWindow() {
  useEffect(() => {
    async function openDisplay() {
      await invoke('open_display_window');
    }
    openDisplay();
  }, []);
  return (
    <GlobalContextProvider>
      <Routes />
    </GlobalContextProvider>
  );
}

export default MainWindow;
