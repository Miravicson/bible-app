"use client";


import { verseType } from "@/lib/types";
import React, {
  createContext,
  SetStateAction,
  Dispatch,
  useState,
} from "react";


interface toastData {
  type: 'error' | 'success',
  message: string;
  duration: number;
}


interface ContextProps {
  scripture: string;
  setScripture: Dispatch<SetStateAction<string>>;
  verse: string;
  setVerse: Dispatch<SetStateAction<string>>;
  toast: toastData | null;
  setToast:  Dispatch<SetStateAction<toastData | null>>;
  history: verseType[] | null;
  setHistory: Dispatch<SetStateAction<verseType[] | null>>;
  verses: verseType[] | null;
  setVerses: Dispatch<SetStateAction<verseType[] | null>>;
}

export const GlobalContext = createContext<ContextProps>({
    scripture: "",
    setScripture: ():string => "",
    verse: "",
    setVerse: () : string => "",
    toast: null,
    setToast: (): toastData | null => null,
    history: null,
    setHistory: (): verseType[] | null => null,
    verses: null,
    setVerses: () : verseType | null => null
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ scripture, setScripture ] = useState<string>("");
  const [ verse, setVerse] = useState<string>("");
  const [toast, setToast ] = useState<toastData | null>(null)
  const [history, setHistory ] = useState<verseType[] | null>(null)
  const [verses, setVerses ] = useState<verseType[] | null>(null)

  return (
    <GlobalContext.Provider
      value={{
        scripture,
        setScripture,
        verse,
        setVerse,
        toast,
        setToast,
        history,
        setHistory,
        verses,
        setVerses
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

