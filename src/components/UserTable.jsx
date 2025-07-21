import React from 'react';
const UserTable = ({ users, onEdit, currentPage = 1, totalPages = 1, onPageChange }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Signup Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tracked Products</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tokens</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user, idx) => (
            <tr key={user.id || idx}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{idx + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.phone_number}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : user.signup_date ? new Date(user.signup_date).toLocaleDateString() : ''}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.products_tracking}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.tokens || user.tokens_left || ''}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.role === 'admin' ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">Admin</span>
                ) : user.role === 'premium' ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">Premium</span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">Free</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 mr-2"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* Pagination Controls */}
    <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700">
      <div className="text-sm text-gray-700 dark:text-gray-300">
        Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  </div>
);
export default UserTable; 