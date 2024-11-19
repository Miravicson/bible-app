
import { Link } from 'react-router-dom';

function Hello() {

    console.log(window.location)
  
    return (
      <main className='flex items-center justify-center w-full h-screen '>
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
          </div>
      </main>
    );
  }
  

  export default Hello