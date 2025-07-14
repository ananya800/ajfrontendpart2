import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HiChartPie,
  HiUsers,
  HiShoppingBag,
  HiBell,
  HiCreditCard,
  HiCog,
  HiSupport,
  HiLogout,
  HiMenuAlt2,
  HiX,
  HiChevronLeft,
  HiChevronRight
} from 'react-icons/hi';

const AdminSidebar = ({ isMobileOpen, toggleMobile }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      name: 'Alerts',
      path: '/admin/alerts',
      icon: <HiBell className="w-6 h-6" />
    },
    {
      name: 'Premium',
      path: '/admin/premium',
      icon: <HiCreditCard className="w-6 h-6" />
    },
    {
      name: 'Support',
      path: '/admin/support',
      icon: <HiSupport className="w-6 h-6" />
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: <HiCog className="w-6 h-6" />
    }
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
          } ${isCollapsed ? 'justify-center px-2' : ''}`}
        >
          <span className="mr-3">{item.icon}</span>
          {!isCollapsed && <span>{item.name}</span>}
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

      {/* Desktop collapse/expand button */}
      <button
        className={`hidden lg:block fixed top-4 z-40 transition-all left-64 ${isCollapsed ? 'left-20' : ''}`}
        onClick={() => setIsCollapsed((v) => !v)}
        style={{ left: isCollapsed ? '5rem' : '16rem' }}
      >
        {isCollapsed ? (
          <HiChevronRight className="w-6 h-6 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow p-1" />
        ) : (
          <HiChevronLeft className="w-6 h-6 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow p-1" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-screen transition-all bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 ${
          isMobileOpen
            ? 'w-64 translate-x-0'
            : isCollapsed
            ? 'w-20 -translate-x-0'
            : 'w-64 -translate-x-full lg:translate-x-0'
        }`}
        style={{ width: isCollapsed ? '5rem' : '16rem' }}
      >
        <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
          <div className={`flex items-center justify-center mb-8 p-4 ${isCollapsed ? 'justify-center' : ''}`}>
            <Link to="/admin/dashboard" className="flex items-center space-x-3">
              <img src="/images/logo.png" className="h-8" alt="AJ Tracker Logo" />
              {!isCollapsed && (
                <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">
                  Admin Panel
                </span>
              )}
            </Link>
          </div>

          <div className="space-y-1 flex-1">
            {navItems.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </div>

          <div className="pt-4 mt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/admin/logout"
              className={`flex items-center px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg ${isCollapsed ? 'justify-center px-2' : ''}`}
            >
              <HiLogout className="w-6 h-6 mr-3" />
              {!isCollapsed && <span className="font-medium">Logout</span>}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar; 