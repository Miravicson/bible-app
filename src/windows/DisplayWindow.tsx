import { listen } from '@tauri-apps/api/event';
import { useEffect, useState } from 'react';

function Screen({ scripture }: { scripture: Scripture | null }) {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-green-500 px-6">
      <div className="absolute z-[1] size-full bg-black opacity-35"></div>
      <div className="absolute z-0 size-full">
        <video
          src="https://cdn.pixabay.com/video/2016/09/13/5200-183786525_large.mp4"
          autoPlay
          loop
          className="size-full object-cover"
        />
      </div>
      <div className="z-50 flex w-full flex-col gap-5">
        {/* SCRIPTURE TEXT */}
        <h1 className="text-4xl font-bold text-white">
          {scripture && scripture?.message}
        </h1>

        {/* VERSE LOCATION */}
        <p className="text-right text-2xl font-semibold text-white">
          {scripture && scripture.verse}
        </p>
      </div>
    </div>
  );
}

export type Scripture = {
  message: string;
  verse: string;
};

function DisplayWindow() {
  const [scripture, setScripture] = useState<Scripture | null>(null);

  useEffect(() => {
    const unlisten = listen<Scripture>('show_scripture', (event) => {
      console.log(`Message received: ${JSON.stringify(event)}`);
      const scripture = event.payload;
      setScripture(scripture);
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  return <Screen scripture={scripture} />;
}

export default DisplayWindow;
