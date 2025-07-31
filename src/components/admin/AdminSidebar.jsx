import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HiChartPie,
  HiUsers,
  HiShoppingBag,
  HiBell,
  HiCreditCard,
  HiMenuAlt2,
  HiX
} from 'react-icons/hi';

const AdminSidebar = ({ isMobileOpen, toggleMobile }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: <HiChartPie className="w-6 h-6" />
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: <HiUsers className="w-6 h-6" />
    },
    {
      name: 'Products',
      path: '/admin/products',
      icon: <HiShoppingBag className="w-6 h-6" />
    },
    {
      name: 'Analytics',
      path: '/admin/analytics',
      icon: <HiChartPie className="w-6 h-6" />
    },
  ];

  const NavItem = ({ item }) => {
    const isItemActive = isActive(item.path);
    return (
      <div className="mb-1">
        <Link
          to={item.path}
          className={`flex items-center px-4 py-3 rounded-lg transition-colors font-medium ${
            isItemActive
              ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          <span className="mr-3">{item.icon}</span>
          <span>{item.name}</span>
        </Link>
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleMobile}
        ></div>
      )}

      {/* Mobile toggle button */}
      <button
        className="fixed top-4 left-4 z-30 p-2 rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 lg:hidden"
        onClick={toggleMobile}
      >
        {isMobileOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt2 className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 w-64 transition-transform ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
          <div className="flex items-center justify-center mb-8 p-4">
            <Link to="/admin/dashboard" className="flex items-center space-x-3">
              <img src="/images/logo.png" className="h-8" alt="AJ Tracker Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">
                Admin Panel
              </span>
            </Link>
          </div>

          <div className="space-y-1 flex-1">
            {navItems.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar; 