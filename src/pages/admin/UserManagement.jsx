import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  HiSearch, 
  HiFilter, 
  HiDotsVertical, 
  HiBan, 
  HiOutlineEye, 
  HiOutlineStar, 
  HiOutlineTrash,
  HiChevronLeft,
  HiChevronRight
} from 'react-icons/hi';
import Toast from '../../components/Toast';
import UserTable from '../../components/UserTable';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const usersPerPage = 10;

  // 1. Add state for modal and editing user
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  // Update editForm state to include all fields
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '', createdAt: '', trackedProducts: '', tokensLeft: '' });
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState(null);

  // 2. Helper for toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // 3. Open edit modal
  const openEditModal = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role || (user.isPremium ? 'premium' : 'free'),
      createdAt: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '',
      trackedProducts: user.trackedProducts || '',
      tokensLeft: user.tokensLeft || '',
    });
    setFormError('');
    setShowEditModal(true);
  };

  // 4. Close modal
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
    setFormError('');
  };

  // 5. Handle form change
  const handleEditChange = (e) => {
    const { name, value, type } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  // 6. Validate email
  const isValidEmail = (email) => /.+@.+\..+/.test(email);

  // 7. Save edited user
  const handleEditSave = async (updated) => {
    // updated is the form values from EditFormSection
    try {
      const res = await axios.put(
        `http://localhost:3008/admin/admin_user_update/${editingUser.email}`,
        {
          name: updated.name,
          phone_number: updated.phone_number,
          products_tracking: updated.products_tracking,
          role: updated.role,
          active_alerts: updated.active_alerts,
          billing: updated.billing,
          signup_date: updated.createdAt || updated.signup_date,
        },
        { withCredentials: true }
      );
      if (res.data && res.data.message === 'SUCCESS') {
        setUsers((prev) => prev.map((u) =>
          u.email === editingUser.email
            ? { ...u, ...updated, signup_date: updated.createdAt || updated.signup_date }
            : u
        ));
        showToast('User updated successfully!', 'success');
        closeEditModal();
      } else {
        showToast(res.data.message || 'Update failed', 'error');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Update failed', 'error');
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3008/admin/allusersdetails", 
          { withCredentials: true }
        );
        // Use backend userdetails directly
        const users = response.data.userdetails;
        console.log('Fetched users:', users);
        setUsers(users);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...users];
    // Filter by user type
    if (userTypeFilter === 'premium') {
      result = result.filter(user => user.isPremium);
    } else if (userTypeFilter === 'free') {
      result = result.filter(user => !user.isPremium);
    } else if (userTypeFilter === 'banned') {
      result = result.filter(user => user.isBanned);
    }
    // Apply search
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(lowerCaseSearch) || 
        user.email.toLowerCase().includes(lowerCaseSearch)
      );
    }
    // Apply sorting
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setTotalPages(Math.ceil(result.length / usersPerPage));
    setCurrentPage(1); // Reset to first page when filters change
  }, [users, searchTerm, userTypeFilter, sortConfig]);

  // Calculate paginated users
  const paginatedUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">User Management</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
          <span className="mr-2">Export Users</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
        </button>
      </div>
      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <HiFilter className="text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by:</span>
            <div className="relative">
              <select
                value={userTypeFilter}
                onChange={(e) => setUserTypeFilter(e.target.value)}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
              >
                <option value="all">All Users</option>
                <option value="premium">Premium</option>
                <option value="free">Free</option>
                <option value="banned">Banned</option>
              </select>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <HiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full md:w-64 p-2.5 pl-10 text-sm text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search users..."
            />
          </div>
        </div>
      </div>
      {/* Users Table */}
      <UserTable
        users={paginatedUsers}
        onEdit={openEditModal}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8 w-full max-w-md max-h-[90vh] flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Edit User</h3>
            <form onSubmit={handleEditSave} className="space-y-4 overflow-y-auto flex-1" style={{ maxHeight: '60vh' }}>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" name="name" value={editForm.name || ''} onChange={handleEditChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" name="email" value={editForm.email || ''} onChange={handleEditChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input type="text" name="phone_number" value={editForm.phone_number || ''} onChange={handleEditChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Signup Date</label>
                <input type="date" name="createdAt" value={editForm.createdAt || ''} onChange={handleEditChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tracked Products</label>
                <input type="number" name="products_tracking" value={editForm.products_tracking || ''} onChange={handleEditChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tokens</label>
                <input type="number" name="tokens" value={editForm.tokens || ''} onChange={handleEditChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select name="role" value={editForm.role || ''} onChange={handleEditChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required>
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="premium">Premium</option>
                  <option value="free">Free</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 mt-6 sticky bottom-0 bg-white dark:bg-gray-900 pt-4">
                <button type="button" className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={closeEditModal}>Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Toast notification */}
      <Toast toast={toast} />
    </div>
  );
};

export default UserManagement; 
