import { useState, useEffect } from 'react';
import { HiPencil, HiTrash, HiSearch, HiFilter, HiRefresh, HiEye } from 'react-icons/hi';
import axios from 'axios';

const AlertManagement = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [alertsPerPage] = useState(10);
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAlert, setCurrentAlert] = useState(null);

  // Alert types and statuses for filtering
  const alertTypes = ['Price Drop', 'Back in Stock', 'New Release', 'Limited Edition', 'Restock'];
  const alertStatuses = ['Active', 'Sent', 'Failed', 'Cancelled'];

  // Mock data for now - would be replaced with API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockAlerts = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        product_name: `Product ${Math.floor(Math.random() * 20) + 1}`,
        product_id: Math.floor(Math.random() * 100) + 1,
        user_email: `user${Math.floor(Math.random() * 100) + 1}@example.com`,
        user_id: Math.floor(Math.random() * 100) + 1,
        alert_type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
        status: alertStatuses[Math.floor(Math.random() * alertStatuses.length)],
        target_price: Math.random() > 0.5 ? Math.floor(Math.random() * 200) + 50 : null,
        created_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        triggered_at: Math.random() > 0.7 ? new Date(Date.now() - Math.floor(Math.random() * 5000000000)).toISOString() : null,
      }));
      
      setAlerts(mockAlerts);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle status filter
  const handleStatusFilter = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  // Handle type filter
  const handleTypeFilter = (e) => {
    setSelectedType(e.target.value);
    setCurrentPage(1);
  };

  // Handle view alert details
  const handleViewAlert = (alert) => {
    setCurrentAlert(alert);
    setIsModalOpen(true);
  };

  // Handle delete alert
  const handleDeleteAlert = (id) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      setAlerts(alerts.filter(alert => alert.id !== id));
    }
  };

  // Filter alerts based on search term, status and type
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.product_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      alert.user_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === '' || alert.status === selectedStatus;
    const matchesType = selectedType === '' || alert.alert_type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Sort alerts
  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const indexOfLastAlert = currentPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = sortedAlerts.slice(indexOfFirstAlert, indexOfLastAlert);
  const totalPages = Math.ceil(sortedAlerts.length / alertsPerPage);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Alert Management</h2>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by product or user..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <HiSearch className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <HiFilter className="text-gray-500 dark:text-gray-400" />
            <select
              value={selectedStatus}
              onChange={handleStatusFilter}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              {alertStatuses.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <HiFilter className="text-gray-500 dark:text-gray-400" />
            <select
              value={selectedType}
              onChange={handleTypeFilter}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {alertTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedStatus('');
              setSelectedType('');
              setSortField('created_at');
              setSortDirection('desc');
            }}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Reset filters"
          >
            <HiRefresh />
          </button>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('id')}
              >
                ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('product_name')}
              >
                Product {sortField === 'product_name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('user_email')}
              >
                User {sortField === 'user_email' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('alert_type')}
              >
                Type {sortField === 'alert_type' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('created_at')}
              >
                Created {sortField === 'created_at' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                </td>
              </tr>
            ) : currentAlerts.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No alerts found
                </td>
              </tr>
            ) : (
              currentAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {alert.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {alert.product_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {alert.user_email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {alert.alert_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      alert.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                        : alert.status === 'Sent'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                        : alert.status === 'Failed'
                        ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(alert.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleViewAlert(alert)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                      title="View Details"
                    >
                      <HiEye className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      title="Delete Alert"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing <span className="font-medium">{indexOfFirstAlert + 1}</span> to{" "}
          <span className="font-medium">
            {indexOfLastAlert > filteredAlerts.length ? filteredAlerts.length : indexOfLastAlert}
          </span>{" "}
          of <span className="font-medium">{filteredAlerts.length}</span> alerts
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Previous
          </button>
          {[...Array(Math.min(totalPages, 5))].map((_, i) => {
            // Show 5 pages max with current page in the middle when possible
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={i}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === pageNum
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Alert Details Modal */}
      {isModalOpen && currentAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Alert Details
                </h3>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentAlert(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Alert ID</p>
                    <p className="text-gray-900 dark:text-white">{currentAlert.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      currentAlert.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                        : currentAlert.status === 'Sent'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                        : currentAlert.status === 'Failed'
                        ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {currentAlert.status}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Alert Type</p>
                  <p className="text-gray-900 dark:text-white">{currentAlert.alert_type}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Product</p>
                    <p className="text-gray-900 dark:text-white">{currentAlert.product_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Product ID</p>
                    <p className="text-gray-900 dark:text-white">{currentAlert.product_id}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">User Email</p>
                    <p className="text-gray-900 dark:text-white">{currentAlert.user_email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">User ID</p>
                    <p className="text-gray-900 dark:text-white">{currentAlert.user_id}</p>
                  </div>
                </div>
                
                {currentAlert.target_price && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Target Price</p>
                    <p className="text-gray-900 dark:text-white">${currentAlert.target_price}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</p>
                    <p className="text-gray-900 dark:text-white">{formatDate(currentAlert.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Triggered At</p>
                    <p className="text-gray-900 dark:text-white">{formatDate(currentAlert.triggered_at)}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentAlert(null);
                  }}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg"
                >
                  Close
                </button>
                {currentAlert.status === 'Active' && (
                  <button
                    onClick={() => {
                      const updatedAlerts = alerts.map(alert => 
                        alert.id === currentAlert.id ? { ...alert, status: 'Cancelled' } : alert
                      );
                      setAlerts(updatedAlerts);
                      setIsModalOpen(false);
                      setCurrentAlert(null);
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    Cancel Alert
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertManagement; 