import { invoke } from '@tauri-apps/api/core';
import { useEffect } from 'react';
import { Routes } from '@/routes';
import { GlobalContextProvider } from '@/context/context';
import { getBibleVerses } from '@/api/bible';
import { predictBibleBook } from '@/lib/utils';

function MainWindow() {
  useEffect(() => {
    getBibleVerses({
      book: 'genesis',
      chapter: 1,
      startVerse: 1,
      endVerse: 2,
    }).then((verses) => {
      console.log(`Retrieved verses`, verses[1].verseText);
    });
  }, []);

  useEffect(() => {
    console.log(predictBibleBook('haba'));
  }, []);

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
