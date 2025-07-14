import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiMenuAlt2 } from 'react-icons/hi';

const AdminNavbar = ({ onSidebarToggle }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  // Mock admin user
  const adminUser = {
    name: 'Admin User',
    email: 'admin@ajtracker.com',
  };

  const handleLogout = () => {
    // Implement logout logic if needed
    navigate("/login");
  };

  return (
    <header className="bg-indigo-700 dark:bg-gray-900 shadow-md sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Sidebar toggle for mobile */}
        <button
          className="lg:hidden p-2 rounded-md text-white hover:bg-indigo-800 mr-2"
          onClick={onSidebarToggle}
        >
          <HiMenuAlt2 className="w-6 h-6" />
        </button>
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold text-white">AJ Tracker Admin</span>
        </div>
        {/* SearchBar center, links right */}
        <div className="flex-1 flex items-center">
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              placeholder="Search admin..."
              className="w-full max-w-md pl-8 pr-3 py-2 rounded-lg border-2 border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg focus:outline-none focus:ring-0 focus:border-gradient-to-r focus:from-indigo-400 focus:to-pink-400 transition-all text-base"
              style={{ borderImage: 'linear-gradient(90deg, #6366f1, #a21caf, #ec4899) 1' }}
            />
          </div>
          <div className="flex items-center space-x-4 ml-8">
            <Link to="/admin/dashboard" className="hover:text-yellow-300 text-white font-medium">
              Dashboard
            </Link>
            <Link to="/admin/users" className="hover:text-yellow-300 text-white font-medium">
              Users
            </Link>
            <Link to="/admin/products" className="hover:text-yellow-300 text-white font-medium">
              Products
            </Link>
            <div className="relative">
              <button
                className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 ml-2"
                onClick={() => setShowProfile((v) => !v)}
                aria-label="Admin menu"
              >
                <span className="text-xl text-white font-bold select-none">
                  {adminUser.name.charAt(0)}
                </span>
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-accent py-2 animate-fade-in z-50">
                  <span className="block w-full text-left px-4 py-2 text-primary font-semibold">{adminUser.name}</span>
                  <span className="block w-full text-left px-4 py-2 text-primary text-xs">{adminUser.email}</span>
                  <button
                    className="w-full text-left px-4 py-2 text-primary hover:bg-secondary hover:text-white rounded-lg transition"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminNavbar; 