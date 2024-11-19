import { useContext, useEffect, useState } from 'react';
import {
  MemoryRouter as Router,
  Routes as LibRoutes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import { GlobalContext } from './context/context';
import { Note, NotificationCircle, Send2 } from 'iconsax-react';
import { invoke } from '@tauri-apps/api/core';

function Hello() {
  console.log(window.location);
  const locationPath = window.location.pathname;

  return (
    <main className="flex h-screen w-full items-center justify-center ">
      {locationPath === '/' && (
        <div className="">
          <div className="Hello">
            {/* <img width="200" alt="icon" src={icon} /> */}
            <h1 className="logotext">PA</h1>
          </div>
          <h1 className="welcometext text-white">
            Welcome to Preacher Assistant <br /> ScriptureSpotter 1.0
          </h1>
          <div className="Hello">
            <Link to="/home" rel="noreferrer">
              <button className="bg-grad round-btn flex items-center gap-1 text-sm text-white">
                <span role="img" aria-label="folded hands">
                  🙏
                </span>
                Get Started
              </button>
            </Link>
            <Link to="/learn" rel="noreferrer">
              <button className="round-btn bg-whiteTrans3 text-sm text-white">
                Learn More...
              </button>
            </Link>
          </div>
        </div>
      )}
      {locationPath === '/home' && <Screen />}
    </main>
  );
}

const History = () => {
  const { history, setHistory } = useContext(GlobalContext);

  const handleHistoryVerse = async (verse: string, message: string) => {
    console.log('Clicking the verse');
    await invoke('show_scripture', { verse, message });
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
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full">
      {/* LEFT */}
      <div className="min-w-[250px] max-w-[300px] flex-[1]">
        <History />
      </div>

      {/* MIDDLE */}
      <div className="flex-[4]">{children}</div>

      {/* RIGHT */}
      {/* <div className='flex-[1] min-w-[250px] max-w-[300px]'>
            <Chapters/>
        </div> */}
    </div>
  );
};

const Speech = () => {
  const { verse, setVerse, setToast, history, setHistory } =
    useContext(GlobalContext);

  const [isListening] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
};

const Home = () => {
  return (
    <Layout>
      <Speech />
    </Layout>
  );
};

const LearnMore = () => {
  const router = useNavigate();

  const goBack = () => {
    router(-1);
  };

  return (
    <div>
      <button
        onClick={goBack}
        className="round-btn hover-active bg-whiteTrans3"
      >
        Go Back
      </button>
      <p className="text-white">
        This is the page where we learn more about how to use this Software
      </p>
    </div>
  );
};

export function Routes() {
  return (
    <Router>
      <LibRoutes>
        <Route path="/" element={<Hello />} />
        <Route path="/home" element={<Home />} />
        <Route path="/learn" element={<LearnMore />} />
      </LibRoutes>
    </Router>
  );
}
