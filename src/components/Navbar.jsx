// Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);

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
    
    localStorage.removeItem("user");
    navigate("/logout"); // Optional: or "/login"
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold text-blue-600">AJ Tracker</span>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-blue-500 font-medium">
            Home
          </Link>

          {isLoggedin ? (
            <>
              <span className="text-gray-700 dark:text-gray-300">
                Hello, {user?.details?.name?.split(" ")[0] || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline font-medium"
              >
                Logout
              </button>
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
      </nav>
    </header>
  );
};

export default Navbar;
