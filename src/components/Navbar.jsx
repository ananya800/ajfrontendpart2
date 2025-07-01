import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const Navbar = () => {
  const [dark, setDark] = useState(() => localStorage.getItem("ajtracker_dark") === "true");
  const [auth, setAuth] = useState(() => !!localStorage.getItem("ajtracker_auth"));
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("ajtracker_dark", dark);
  }, [dark]);

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    if (dropdown) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [dropdown]);

  useEffect(() => {
    const onStorage = () => setAuth(!!localStorage.getItem("ajtracker_auth"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ajtracker_auth");
    setAuth(false);
    setDropdown(false);
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      <div className="text-2xl font-bold text-blue-600">AJtracker</div>
      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:text-blue-500 font-medium">Home</Link>
        {!auth && <Link to="/login" className="hover:text-blue-500 font-medium">Login</Link>}
        {!auth && <Link to="/signup" className="hover:text-blue-500 font-medium">Signup</Link>}
        <button
          onClick={() => setDark(d => !d)}
          className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 transition"
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.95 7.05l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
          )}
        </button>
        {auth && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdown(d => !d)}
              className="ml-4 p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 transition flex items-center"
              title="Account"
            >
              <svg className="h-8 w-8 text-gray-500 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-2.2 3.6-4 8-4s8 1.8 8 4" />
              </svg>
            </button>
            {dropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow-lg py-2 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 