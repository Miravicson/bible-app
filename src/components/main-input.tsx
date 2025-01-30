import { NotificationCircle, Send2 } from 'iconsax-react';
import { Button } from './ui/button';
import React, { useEffect, useState } from 'react';
import { predictBibleBook } from '@/lib/utils';
import { MainInputMode } from '@/lib/types';

type MainInputProp = {
  onSend: React.FormEventHandler<HTMLElement>;
  loading: boolean;
  disabled: boolean;
  inputText: string;
  onChange(text: string): void;
};

export function MainInput({
  onSend,
  loading,
  disabled,
  inputText,
  onChange,
}: MainInputProp) {
  const [_inputMode, setInputMode] = useState<MainInputMode>(
    MainInputMode.ManualMode,
  );

  useEffect(() => {
    const biblePrediction = predictBibleBook(inputText);
    console.log(`Bible prediction: ${biblePrediction}`);
    if (!biblePrediction) {
      setInputMode(MainInputMode.IntelligenceMode);
    }
  }, [inputText]);

  return (
    <div className="flex size-full items-end px-4 pb-4">
      <div className="w-full">
        <form action="" className="relative w-full">
          <input
            type="text"
            className="w-full rounded-full bg-whiteTrans3 px-4 py-3 text-sm placeholder:text-whiteTrans3"
            value={inputText}
            placeholder="Start speaking to see the transcription..."
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="hover-active-abs absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-whiteTrans3">
            {loading ? (
              <div className="spin">
                <NotificationCircle />
              </div>
            ) : (
              <Button
                onClick={onSend}
                disabled={disabled || loading}
                className="flex size-full items-center justify-center rounded-full"
              >
                <Send2 className="rounded-full" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
