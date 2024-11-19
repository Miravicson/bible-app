import { GlobalContext } from "@/context/context";
import { NotificationCircle, Send2 } from "iconsax-react";
import { useContext, useState } from "react";

const Speech = () => {
    const {  verse, setVerse, setToast, history, setHistory } =
      useContext(GlobalContext);
  
  
    const [isListening, ] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
  
  
  
  
    const fetchBibleVerses = async (_verseVal: string) => {
      setLoading(true);
      try {
    
  
        const mockResponse = {
          status: 200,
          data: {
            reference: "hello mock reference",
            text: "hello mock text"
          }
        }
        if (mockResponse.status === 200 || mockResponse.status === 204) {
          setLoading(false);
          setToast({
            duration: 2000,
            type: 'success',
            message: 'Successful',
          });
  
          if(history !== null){
              setHistory([...history, {
                  verse: mockResponse?.data?.reference,
                  message: mockResponse?.data?.text,
              }])
          }else{
              setHistory([{
                  verse: mockResponse?.data?.reference,
                  message: mockResponse?.data?.text,
              }])
          }
          localStorage.setItem('PAHistory', JSON.stringify(history))
        }
      } catch (err: any) {
        setLoading(false);
        setToast({
          duration: 2000,
          type: 'error',
          message: 'Oops! Something went wrong',
        });
        console.log('axios error');
      }
    };
  
    const postIPCMessage = (val: string) => {
      console.log('value: ', val);
      fetchBibleVerses(val);
    };
  
  
  
  
  
  
    return (
      <div className="relative flex flex-col items-center justify-center w-full h-full min-h-screen text-white">
        <div className="fixed flex flex-col items-center justify-center w-full transform -translate-y-1/2 top-1/2">
          <h1 className="mb-4 text-center text-white opacity-10 ">
            Tap on <br /> "Start Listening" <br /> to begin
          </h1>
  
          <div className="flex items-center gap-2 ">
            {isListening ? (
              <button
                className="text-sm round-btn bg-whiteTrans3 hover-active"
                onClick={function stopListening() {}}
                disabled={!isListening}
              >
                Stop Listening
              </button>
            ) : (
              <button
                className="text-sm round-btn bg-grad"
                onClick={function startListening() {}}
                disabled={isListening}
              >
                Start Listening
              </button>
            )}
          </div>
        </div>
  
        <div className="flex items-end w-full h-full px-4 pb-4">
          <div className="w-full">
            <form action="" className="relative w-full">
              <input
                type="text"
                className="w-full px-4 py-3 text-sm rounded-full bg-whiteTrans3 placeholder:text-whiteTrans3"
                value={verse}
                placeholder="Start speaking to see the transcription..."
                onChange={(e) => setVerse(e.target.value)}
              />
              <div className="absolute flex items-center justify-center w-8 h-8 transform -translate-y-1/2 rounded-full bg-whiteTrans3 hover-active-abs top-1/2 right-2">
                {loading ? (
                  <div className="spin">
                    <NotificationCircle />
                  </div>
                ) : (
                  <button
                    onClick={() => postIPCMessage(verse)}
                    disabled={verse === '' || loading}
                    className="flex items-center justify-center w-full h-full"
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
  };


  export default Speech