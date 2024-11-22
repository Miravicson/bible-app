import { Link } from 'react-router-dom';

export function Welcome() {
  const locationPath = window.location.pathname;

  return (
    <main className="flex h-screen w-full items-center justify-center ">
      {locationPath === '/' && (
        <div className="">
          <div className="Hello">
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
    </main>
  );
}
