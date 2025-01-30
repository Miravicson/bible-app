import { GlobalContext } from '@/context/context';
import { useContext, useState } from 'react';
import { MainInput } from './main-input';

export function Speech() {
  const { verse, setVerse } = useContext(GlobalContext);

  const [isListening] = useState<boolean>(false);
  const [loading] = useState<boolean>(false);
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
      </div>

      <MainInput
        onSend={(e) => {
          e.preventDefault();
        }}
        onChange={(text: string) => {
          setVerse(text);
        }}
        loading={loading}
        disabled={!verse}
        inputText={verse}
      />
    </div>
  );
}
