import { GlobalContext } from "@/context/context";
import { invoke } from "@tauri-apps/api/core";
import { Note } from "iconsax-react";
import { useContext, useEffect } from "react";

const History = () => {
    const { history, setHistory } = useContext(GlobalContext);
  
    const handleHistoryVerse = async (verse: string, message: string) => {
      console.log('Clicking the verse');
      await invoke('show_scripture', {verse, message});
    };
  
    const histories = [
      {
        verse: "Genesis 1:1",
        message:"In the beginning, God created the heavens and earth"
      },
      {
        verse: "Revelation 13:12",
        message:"He exercises all the authority of the first beast"
      },
      {
        verse: "John 1:1",
        message:"In the beginning was the Word, and the Word was with God and the word was God."
      }
    ]
  
    useEffect(() => {
      setHistory([...histories]);
    }, []);
  
    return (
      <div className="w-full p-3 h-100vh">
        <div className="flex flex-col w-full h-full py-2 pr-1 rounded-lg bg-whiteTrans3">
          <div className="flex items-center w-full h-10 gap-2 px-2 pb-2 borer-b border-whiteTrans3">
            <Note size="24" className="text-white" />
            <p className="text-lg text-white ">History</p>
          </div>
          <div className="w-full h-[600px] scroll px-2">
            <div className='flex flex-col w-full gap-2'>
            {history !== null && history.length ? (
              history.map((item, index) => (
                <div
                  onClick={async () => await handleHistoryVerse(item.verse, item.message)}
                  className="w-full px-2 py-1 rounded cursor-pointer bg-whiteTrans3 hover:bg-whiteTrans4 active:bg-whiteTrans3"
                  key={index}
                >
                  <p className="text-sm font-bold text-white">{item?.verse}</p>
                  <p className="text-sm text-white break-words line-clamp-2 text-ellipsis">
                    {item.message}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-center text-white">No history</p>
            )}
            </div>
            <div className="h-[3000px]"></div>
          </div>
        </div>
      </div>
    );
  };

  export default History;