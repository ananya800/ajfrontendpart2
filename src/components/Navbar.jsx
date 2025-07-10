// Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    

    if (storedUser) {
      setIsLoggedin(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsLoggedin(false);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    const res = axios.get("http://localhost:3008/logout", { withCredentials: true });
    console.log(res)
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold text-blue-600">AJ Tracker</span>
        </div>
        {/* SearchBar center, links right */}
        <div className="flex-1 flex items-center">
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-lg">
              <SearchBar value={searchValue} onSearch={setSearchValue} placeholder="Search item..." />
            </div>
          </div>
          <div className="flex items-center space-x-4 ml-8">
          <Link to="/" className="hover:text-blue-500 font-medium">
            Home
          </Link>
          {isLoggedin ? (
            <>
                <Link to="/dashboard" className="hover:text-blue-500 font-medium">
                  Dashboard
                </Link>
                <Link to="/premium" className="hover:text-blue-500 font-medium">
                  Premium
                </Link>
                <div className="relative">
                  <button
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 ml-2"
                    onClick={() => setShowDropdown((v) => !v)}
                    aria-label="User menu"
                  >
                    <span className="text-xl text-white font-bold select-none">👤</span>
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-accent py-2 animate-fade-in z-50">
                      <Link
                        to="/profile"
                        className="block w-full text-left px-4 py-2 text-primary hover:bg-accent hover:text-white rounded-lg transition"
                        onClick={() => setShowDropdown(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/admin"
                        className="block w-full text-left px-4 py-2 text-primary hover:bg-accent hover:text-white rounded-lg transition"
                        onClick={() => setShowDropdown(false)}
                      >
                        Admin Panel
                      </Link>
              <button
                        className="w-full text-left px-4 py-2 text-primary hover:bg-secondary hover:text-white rounded-lg transition"
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
              <Link to="/login" className="hover:text-blue-500 font-medium">
                Login
              </Link>
              <Link to="/signup" className="hover:text-blue-500 font-medium">
                Signup
              </Link>
            </>
          )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
