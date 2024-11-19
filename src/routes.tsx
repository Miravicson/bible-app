import { useContext, useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes as LibRoutes, Route, Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from './context/context';
import { Note, NotificationCircle, Send2 } from 'iconsax-react';
import { invoke } from '@tauri-apps/api/core';


function Hello() {

  console.log(window.location)
  const locationPath = window.location.pathname;

  return (
    <main className='flex items-center justify-center w-full h-screen '>
      {
        locationPath === '/' && (
          <div className=''>
          <div className="Hello">
            {/* <img width="200" alt="icon" src={icon} /> */}
            <h1 className='logotext'>PA</h1>
          </div>
          <h1 className='text-white welcometext'>Welcome to Preacher Assistant <br /> ScriptureSpotter 1.0</h1>
          <div className="Hello">
            <Link
              to="/home"
              rel="noreferrer"
            >
              <button className="flex items-center gap-1 text-sm text-white bg-grad round-btn">
                <span role="img" aria-label="folded hands">
                  🙏
                </span>
                Get Started
              </button>
            </Link>
            <Link
              to="/learn"
              rel="noreferrer"
            >
              <button className="text-sm text-white round-btn bg-whiteTrans3">
                Learn More...
              </button>
            </Link>
          </div>
        </div>)
      }
      {
        locationPath === '/home' && (<Screen/>)
      }
    </main>
  );
}


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

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex w-full'>
        {/* LEFT */}
        <div className='flex-[1] min-w-[250px] max-w-[300px]'>
            <History />
        </div>


        {/* MIDDLE */}
        <div className='flex-[4]'>
            { children }
        </div>

        {/* RIGHT */}
        {/* <div className='flex-[1] min-w-[250px] max-w-[300px]'>
            <Chapters/>
        </div> */}
    </div>
  )
}

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

const Home = () => {

  return (
    
      <Layout>
        <Speech/>
      </Layout>
  )
}

function Screen() {

  // const [scripture, setScripture] =  useState<verseType | null>(null)
  // const [verse, setVerse] =  useState<string>('')

  // window.electron?.ipcRenderer.on('incoming', (arg) => {
  //   // eslint-disable-next-line no-console
  //   setScripture(arg as unknown as verseType)
  //   // setVerse('')
  //   console.log(arg);
  // });

  const scripture = {
    message: "Hello world",
  verse: "Hi people"  }

  return (
    <div className='relative flex items-center justify-center w-full h-full px-6 bg-green-500'>
        <div className="w-full h-full absolute bg-black z-[1] opacity-35">

        </div>
      <div className="absolute z-0 w-full h-full">
        <video src="https://cdn.pixabay.com/video/2016/09/13/5200-183786525_large.mp4" autoPlay loop className="object-cover w-full h-full"/>
      </div>
      <div className="z-50 flex flex-col w-full gap-5">

        {/* SCRIPTURE TEXT */}
        <h1 className="font-bold text-[#262626] !text-white text-4xl">
         { scripture && scripture?.message}
        </h1>

        {/* VERSE LOCATION */}
        <p className="text-right text-[#262626] !text-white text-2xl font-semibold">{ 
          scripture && scripture.verse
        }</p>
      </div>
    </div>
  );
}


const LearnMore = () => {
  const router = useNavigate()

  const goBack = () => {
      router(-1)
  }

return (
  <div>
      <button onClick={goBack} className='round-btn bg-whiteTrans3 hover-active'>Go Back</button>
      <p className='text-white'>This is the page where we learn more about how to use this Software</p>
  </div>
)
}

export function Routes() {

  return (
    <Router>
    <LibRoutes>
      <Route path="/" element={<Hello />} />
      <Route path="/home" element={<Home />} />
      <Route path="/learn" element={<LearnMore />} />
    </LibRoutes>
  </Router>
  )
}