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
  HiChevronDown,
  HiChevronUp,
  HiMenuAlt2,
  HiX
} from 'react-icons/hi';

const AdminSidebar = ({ isMobileOpen, toggleMobile }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState({
    products: false,
    users: false,
    settings: false
  });

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const toggleCollapse = (section) => {
    setCollapsed(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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
      icon: <HiUsers className="w-6 h-6" />,
      children: [
        { name: 'All Users', path: '/admin/users' },
        { name: 'Premium Users', path: '/admin/users/premium' },
        { name: 'Banned Users', path: '/admin/users/banned' }
      ]
    },
    {
      name: 'Products',
      path: '/admin/products',
      icon: <HiShoppingBag className="w-6 h-6" />,
      children: [
        { name: 'All Products', path: '/admin/products' },
        { name: 'Add Product', path: '/admin/products/add' },
        { name: 'Categories', path: '/admin/products/categories' }
      ]
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
      icon: <HiCog className="w-6 h-6" />,
      children: [
        { name: 'General', path: '/admin/settings' },
        { name: 'Admin Users', path: '/admin/settings/admins' },
        { name: 'API Keys', path: '/admin/settings/api-keys' }
      ]
    }
  ];

  const NavItem = ({ item }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isItemActive = isActive(item.path);
    const isExpanded = collapsed[item.name.toLowerCase()];
    
    return (
      <div className="mb-1">
        <div
          className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors ${
            isItemActive
              ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
          onClick={() => hasChildren ? toggleCollapse(item.name.toLowerCase()) : null}
        >
          <Link 
            to={hasChildren ? '#' : item.path}
            onClick={(e) => {
              if (hasChildren) {
                e.preventDefault();
              }
            }}
            className="flex items-center flex-1"
          >
            <span className="mr-3">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
          {hasChildren && (
            <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {isExpanded ? <HiChevronUp /> : <HiChevronDown />}
            </button>
          )}
        </div>

        {/* Dropdown items */}
        {hasChildren && isExpanded && (
          <div className="pl-12 mt-1 space-y-1">
            {item.children.map((child, idx) => (
              <Link
                key={idx}
                to={child.path}
                className={`block py-2 px-3 rounded-lg ${
                  location.pathname === child.path
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {child.name}
              </Link>
            ))}
          </div>
        )}
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
        className={`fixed top-0 left-0 z-30 w-64 h-screen transition-transform bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="flex items-center justify-center mb-8 p-4">
            <Link to="/admin/dashboard" className="flex items-center space-x-3">
              <img src="/images/logo.png" className="h-8" alt="AJ Tracker Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">
                Admin Panel
              </span>
            </Link>
          </div>

          <div className="space-y-1">
            {navItems.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </div>

          <div className="pt-4 mt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/admin/logout"
              className="flex items-center px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
            >
              <HiLogout className="w-6 h-6 mr-3" />
              <span className="font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar; 