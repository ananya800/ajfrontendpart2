import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [dark, setDark] = useState(() => localStorage.getItem('ajtracker_dark') === 'true');
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('aj_logged_in') === 'true');
  const [showDropdown, setShowDropdown] = useState(false);
  const avatarRef = useRef(null);
  const navigate = useNavigate();

  // Handle dark mode toggle
  const handleThemeToggle = () => {
    setDark((prev) => {
      localStorage.setItem('ajtracker_dark', !prev);
      if (!prev) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return !prev;
    });
  };

  // Track login state
  useEffect(() => {
    const checkLogin = () => setLoggedIn(localStorage.getItem('aj_logged_in') === 'true');
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const handleLogout = () => {
    localStorage.removeItem('aj_logged_in');
    setLoggedIn(false);
    setShowDropdown(false);
    navigate('/');
  };

  // Ensure dark mode is set on mount
  if (dark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      <div className="text-2xl font-bold text-blue-600">AJtracker</div>
      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:text-blue-500 font-medium">Home</Link>
        <Link to="/premium" className="font-bold text-white bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded transition shadow">Premium</Link>
        {loggedIn ? (
          <>
            <Link to="/dashboard" className="hover:text-blue-500 font-medium">Dashboard</Link>
            <div className="relative" ref={avatarRef}>
              <button
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 ml-2"
                onClick={() => setShowDropdown((v) => !v)}
                aria-label="User menu"
              >
                <span className="text-xl text-white font-bold select-none">👤</span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 animate-fade-in z-50">
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-500 font-medium">Login</Link>
            <Link to="/signup" className="hover:text-blue-500 font-medium">Signup</Link>
          </>
        )}
        <button
          onClick={handleThemeToggle}
          className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 transition"
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.95 7.05l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 