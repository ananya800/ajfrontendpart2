import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import { Menu, X } from "lucide-react"; // icons for mobile menu

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3008/logout", { withCredentials: true });
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const getTokenInfo = () => {
    if (!user) return { isFree: false, tokens: null };
    const details = user.details || user;
    const isPremium = details.role === 'premium' || details.isPremium;
    const tokens = typeof details.tokens === 'number' ? details.tokens : (typeof details.tokensLeft === 'number' ? details.tokensLeft : 100);
    return { isFree: !isPremium, tokens };
  };

  const { isFree, tokens } = getTokenInfo();

  return (
    <header className="bg-white/30 backdrop-blur-md border-b border-red-300 dark:bg-black/20 dark:border-red-500 dark:backdrop-blur-md shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
        
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold text-tertiary">AJ Tracker</span>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-accent focus:outline-none">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Search + Links */}
        <div className="hidden md:flex items-center flex-1 ml-6">
          
          {/* SearchBar */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-lg">
              <SearchBar
                value={searchValue}
                onSearch={setSearchValue}
                placeholder="Search item..."
              />
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-4 ml-8">
            <Link to="/" className="text-primary hover:text-secondary font-medium">Home</Link>

            {isLoggedin ? (
              <>
                <Link to="/dashboard" className="text-primary hover:text-secondary font-medium">Dashboard</Link>
                <Link to="/premium" className="text-primary hover:text-secondary font-medium">Premium</Link>

                {isFree && (
                  <span className="text-sm font-semibold text-yellow-600 bg-yellow-100 rounded-full px-3 py-1 ml-2">
                    {tokens} tokens left
                  </span>
                )}

                <div className="relative">
                  <button
                    onClick={() => setShowDropdown((v) => !v)}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-700"
                    aria-label="User menu"
                  >
                    <span className="text-xl text-white font-bold">👤</span>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-accent py-2 z-50">
                      <Link to="/profile" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-primary hover:bg-accent hover:text-white rounded-md">Profile</Link>
                      <Link to="/admin" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-primary hover:bg-accent hover:text-white rounded-md">Admin Panel</Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 mt-2 text-white font-semibold rounded-md bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 shadow">Logout</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <span className="text-sm font-semibold text-yellow-600 bg-yellow-100 rounded-full px-3 py-1 ml-2">100 tokens left</span>
                <Link to="/login" className="text-accent hover:text-secondary font-medium">Login</Link>
                <Link to="/signup" className="text-accent hover:text-secondary font-medium">Signup</Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-black backdrop-blur-lg border-t border-accent px-4 py-4 flex flex-col space-y-4 md:hidden z-50">
            <SearchBar value={searchValue} onSearch={setSearchValue} placeholder="Search item..." />

            <Link to="/" className="text-tertiary font-medium" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            {isLoggedin ? (
              <>
                <Link to="/dashboard" className="text-tertiary font-medium" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                <Link to="/premium" className="text-tertiary font-medium" onClick={() => setMobileMenuOpen(false)}>Premium</Link>
                {isFree && (
                  <span className="text-sm font-semibold text-yellow-600 bg-yellow-100 rounded-full px-3 py-1">
                    {tokens} tokens left
                  </span>
                )}
                <Link to="/profile" className="text-primary" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                <Link to="/admin" className="text-primary" onClick={() => setMobileMenuOpen(false)}>Admin Panel</Link>
                <button onClick={handleLogout} className="text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 px-4 py-2 rounded-md">
                  Logout
                </button>
              </>
            ) : (
              <>
                <span className="text-sm font-semibold text-yellow-600 bg-yellow-100 rounded-full px-3 py-1">100 tokens left</span>
                <Link to="/login" className="text-accent font-medium" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="text-accent font-medium" onClick={() => setMobileMenuOpen(false)}>Signup</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
