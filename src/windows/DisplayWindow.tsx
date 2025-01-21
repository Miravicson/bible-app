import { DisplayScreen } from '@/components/DisplayScreen';
import { listen } from '@tauri-apps/api/event';
import { useEffect, useState } from 'react';

export type Scripture = {
  message: string;
  verse: string;
};

function DisplayWindow() {
  const [scripture, setScripture] = useState<Scripture | null>(null);

  useEffect(() => {
    const unlisten = listen<Scripture>('show_scripture', (event) => {
      const scripture = event.payload;
      setScripture(scripture);
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  return <DisplayScreen scripture={scripture} />;
}

export default DisplayWindow;
