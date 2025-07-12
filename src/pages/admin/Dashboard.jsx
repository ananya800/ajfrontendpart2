import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from "socket.io-client";

const socket = io("http://localhost:3008");

import { 
  HiUsers, 
  HiShoppingBag, 
  HiBell, 
  HiTrendingDown,
  HiClock,
  HiExclamation
} from 'react-icons/hi';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    premiumUsers: 0,
    trackedProducts: 0,
    activeAlerts: 0,
    priceDrops: 0,
     priceIncreases: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3008/admin/admindashboard", 
        { withCredentials: true })
      ;
      const dashboard = response.data

      setStats({
        totalUsers: parseInt(dashboard.userdetails.total_users) || 0,
        premiumUsers: parseInt(dashboard.userdetails.premium_users) || 0,
        trackedProducts: parseInt(dashboard.productdetails.total_products) || 0,
        activeAlerts: parseInt(dashboard.userdetails.active_alerts) || 0,
        priceDrops: parseInt(dashboard.productdetails.negetive_discount) || 0,
        priceIncreases: parseInt(dashboard.productdetails.positive_discount) || 0
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();

  const handleUserCounts = (data) => {
    setStats((prev) => ({
      ...prev,
      totalUsers: parseInt(data.total_users) || 0,
      premiumUsers: parseInt(data.premium_users) || 0
    }));
  };

  socket.on("userCounts", handleUserCounts);

  
  return () => {
    socket.off("userCounts", handleUserCounts);
  };
}, []); 
      


      
        
        // setRecentActivity([
        //   { id: 1, type: 'alert', message: 'Price drop alert triggered for iPhone 13', time: '5 minutes ago', user: 'john@example.com' },
        //   { id: 2, type: 'user', message: 'New user registered', time: '10 minutes ago', user: 'sarah@example.com' },
        //   { id: 3, type: 'product', message: 'New product added to tracking', time: '25 minutes ago', user: 'mike@example.com' },
        //   { id: 4, type: 'premium', message: 'User upgraded to premium', time: '1 hour ago', user: 'lisa@example.com' },
        //   { id: 5, type: 'alert', message: 'Price drop alert triggered for Samsung TV', time: '2 hours ago', user: 'david@example.com' },
        // ]);
   

  // Chart data for price changes trend
  const priceChangesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Price Drops',
        data: [stats.priceDrops,25, 32, 18, 45, 37, 22],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Price Increases',
        data: [stats.priceIncreases,15, 22, 28, 18, 27, 32],
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Chart data for most tracked products
  
  const mostTrackedData = {
    labels: ['iPhone 13', 'Samsung TV', 'Sony PS5', 'MacBook Pro', 'AirPods Pro'],
    datasets: [
      {
        label: 'Number of Users Tracking',
        data: [320, 280, 245, 210, 185],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(217, 70, 239, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        borderWidth: 0
      }
    ]
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Price Changes'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Most Tracked Products'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Activity icon mapping
  const getActivityIcon = (type) => {
    switch (type) {
      case 'alert':
        return <HiBell className="w-5 h-5 text-orange-500" />;
      case 'user':
        return <HiUsers className="w-5 h-5 text-blue-500" />;
      case 'product':
        return <HiShoppingBag className="w-5 h-5 text-green-500" />;
      case 'premium':
        return <HiTrendingDown className="w-5 h-5 text-purple-500" />;
      default:
        return <HiClock className="w-5 h-5 text-gray-500" />;
    }
  };

  // Stat card component
  const StatCard = ({ title, value, icon, color, change }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value.toLocaleString()}</h3>
          {change && (
            <p className={`text-xs mt-2 ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change > 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/30`}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Last updated:</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={<HiUsers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />} 
          color="indigo" 
          change={5.2}
        />
        <StatCard 
          title="Premium Users" 
          value={stats.premiumUsers} 
          icon={<HiUsers className="w-6 h-6 text-purple-600 dark:text-purple-400" />} 
          color="purple" 
          change={8.1}
        />
        <StatCard 
          title="Products Tracked" 
          value={stats.trackedProducts} 
          icon={<HiShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />} 
          color="blue" 
          change={3.7}
        />
        <StatCard 
          title="Active Alerts" 
          value={stats.activeAlerts} 
          icon={<HiBell className="w-6 h-6 text-pink-600 dark:text-pink-400" />} 
          color="pink" 
          change={-2.3}
        />
      </div>

      {/* Price Drops Today Card */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Price Drops Today</h3>
            <p className="text-3xl font-bold mt-2">{stats.priceDrops}</p>
            <p className="text-sm opacity-80 mt-1">Across {stats.trackedProducts} products</p>
          </div>
          <div className="bg-white/20 p-4 rounded-full">
            <HiTrendingDown className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Changes Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Price Changes Trend</h3>
          <div className="h-80">
            <Line data={priceChangesData} options={lineChartOptions} />
          </div>
        </div>

        {/* Most Tracked Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Most Tracked Products</h3>
          <div className="h-80">
            <Bar data={mostTrackedData} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Recent Activity</h3>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="py-4 flex items-start">
              <div className="mr-4 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.message}</p>
                <div className="flex items-center mt-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.user}</p>
                  <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
              <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <HiExclamation className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;