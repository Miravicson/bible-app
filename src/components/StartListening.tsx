import { GlobalContext } from '@/context/context';
import { useContext, useState } from 'react';
import { NotificationCircle, Send2 } from 'iconsax-react';
import { invoke } from '@tauri-apps/api/core';

export function StartListening() {
  const { verse, setVerse, setToast, history, setHistory } =
    useContext(GlobalContext);

  const [isListening] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function showDisplay() {
    await invoke('open_display_window');
  }

  const fetchBibleVerses = async (_verseVal: string) => {
    setLoading(true);

    const mockResponse = {
      status: 200,
      data: {
        reference: 'hello mock reference',
        text: 'hello mock text',
      },
    };
    if (mockResponse.status === 200 || mockResponse.status === 204) {
      setLoading(false);
      setToast({
        duration: 2000,
        type: 'success',
        message: 'Successful',
      });

      if (history !== null) {
        setHistory([
          ...history,
          {
            verse: mockResponse?.data?.reference,
            message: mockResponse?.data?.text,
          },
        ]);
      } else {
        setHistory([
          {
            verse: mockResponse?.data?.reference,
            message: mockResponse?.data?.text,
          },
        ]);
      }
      localStorage.setItem('PAHistory', JSON.stringify(history));
    }

    setLoading(false);
  };

  const postIPCMessage = (val: string) => {
    console.log('value: ', val);
    fetchBibleVerses(val);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col items-center justify-center text-white">
      <div className="fixed top-1/2 flex w-full -translate-y-1/2 flex-col items-center justify-center">
        <h1 className="mb-4 text-center text-white opacity-10 ">
          Tap on <br /> "Start Listening" <br /> to begin
        </h1>

        <div className="flex items-center gap-2 ">
          {isListening ? (
            <button
              className="round-btn hover-active bg-whiteTrans3 text-sm"
              onClick={function stopListening() {}}
              disabled={!isListening}
            >
              Stop Listening
            </button>
          ) : (
            <button
              className="round-btn bg-grad text-sm"
              onClick={function startListening() {}}
              disabled={isListening}
            >
              Start Listening
            </button>
          )}
        </div>
        <div className="mt-3 flex items-center gap-2 ">
          <button
            className="round-btn bg-grad text-sm"
            onClick={showDisplay}
            disabled={isListening}
          >
            Show Display
          </button>
        </div>
      </div>

      <div className="flex size-full items-end px-4 pb-4">
        <div className="w-full">
          <form action="" className="relative w-full">
            <input
              type="text"
              className="w-full rounded-full bg-whiteTrans3 px-4 py-3 text-sm placeholder:text-whiteTrans3"
              value={verse}
              placeholder="Start speaking to see the transcription..."
              onChange={(e) => setVerse(e.target.value)}
            />
            <div className="hover-active-abs absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-whiteTrans3">
              {loading ? (
                <div className="spin">
                  <NotificationCircle />
                </div>
              ) : (
                <button
                  onClick={() => postIPCMessage(verse)}
                  disabled={verse === '' || loading}
                  className="flex size-full items-center justify-center"
                >
                  <Send2 />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
