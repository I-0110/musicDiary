import { Link } from 'react-router-dom';
import { type MouseEvent } from 'react';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="relative bg-[url('/jungle.jpg')] bg-cover bg-top py-12 px-4 text-center">
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70 z-0" />
      <div className="relative z-10 text-center">
      <Link to="/" className="flex items-center justify-center gap-4 text-light">
          <div className="flex items-center gap-3">
            <h1 className="text-5xl font-bold text-white dark:text-dark-accent">
              𝄞 Music Diary
            </h1>
            <img
              src="/diary.svg"
              alt="Logo"
              className="h-8 w-auto animate-bounce"
            />
          </div>
        </Link>
        <Link className="text-light" to="/">
          <p className="bg-dark-background text-white px-6 py-2 rounded shadow-md hover:opacity-90 transition" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
            Start to track your practice here.
          </p>
        </Link>
        <div className='flex flex-col items-center gap-4 mt-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4'>
          <Link className='btn btn-lg m-2 bg-light-accent text-dark-text hover:brightness-110 transition' to="/flutists"> 
            Flutists
          </Link>
          <Link className='btn btn-lg m-2 bg-light-accent text-dark-text hover:brightness-110 transition' to="/metronome"> 
            Metronome
          </Link>
          <Link className='btn btn-lg m-2 bg-light-accent text-dark-text hover:brightness-110 transition' to="/tuner"> 
            Tuner
          </Link>
          <div>
            {Auth.loggedIn() ? (
              <>
                <Link className="btn btn-lg m-2 bg-light-primary text-white dark:bg-dark-primary dark:text-white hover:opacity-90 transition" to="/me">
                  View My Practice Logs
                </Link>
                <button className="btn btn-lg m-2 bg-gray-200 text-light-text dark:bg-gray-700 dark:text-dark-text hover:opacity-90 transition" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-lg btn-primary m-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-lg btn-light m-2" to="/signup">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
