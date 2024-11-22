import { GlobalContext } from '@/context/context';
import { invoke } from '@tauri-apps/api/core';
import { Note } from 'iconsax-react';

import { useContext, useEffect } from 'react';

export function History() {
  const { history, setHistory } = useContext(GlobalContext);

  const handleHistoryVerse = async (verseNumber: string, message: string) => {
    await invoke('show_scripture', { verse: verseNumber, message });
  };

  useEffect(() => {
    const histories = [
      {
        verse: 'Genesis 1:1',
        message: 'In the beginning, God created the heavens and earth',
      },
      {
        verse: 'Revelation 13:12',
        message: 'He exercises all the authority of the first beast',
      },
      {
        verse: 'John 1:1',
        message:
          'In the beginning was the Word, and the Word was with God and the word was God.',
      },
    ];

    setHistory([...histories]);
  }, [setHistory]);

  return (
    <div className="h-screen w-full p-3">
      <div className="flex size-full flex-col rounded-lg bg-whiteTrans3 py-2 pr-1">
        <div className="flex h-10 w-full items-center gap-2 border-whiteTrans3 px-2 pb-2">
          <Note size="24" className="text-white" />
          <p className="text-lg text-white ">History</p>
        </div>
        <div className="scroll h-[600px] w-full px-2">
          <div className="flex w-full flex-col gap-2">
            {history !== null && history.length ? (
              history.map((item, index) => (
                <div
                  onClick={async () =>
                    await handleHistoryVerse(item.verse, item.message)
                  }
                  className="w-full cursor-pointer rounded bg-whiteTrans3 px-2 py-1 hover:bg-whiteTrans4 active:bg-whiteTrans3"
                  key={index}
                >
                  <p className="text-sm font-bold text-white">{item?.verse}</p>
                  <p className="line-clamp-2 text-ellipsis break-words text-sm text-white">
                    {item.message}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-white">No history</p>
            )}
          </div>
          <div className="h-[3000px]"></div>
        </div>
      </div>
    </div>
  );
}
