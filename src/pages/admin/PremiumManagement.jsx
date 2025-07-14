import { useState, useMemo } from 'react';

const mockPremiumUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    subscriptionDate: '2024-05-01',
    expiryDate: '2025-05-01',
    paymentMethod: 'Credit Card',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    subscriptionDate: '2023-04-15',
    expiryDate: '2024-04-15',
    paymentMethod: 'PayPal',
    status: 'Expired',
  },
  {
    id: 3,
    name: 'Carol Lee',
    email: 'carol@example.com',
    subscriptionDate: '2024-01-10',
    expiryDate: '2025-01-10',
    paymentMethod: 'UPI',
    status: 'Active',
  },
];

const Premium = () => {
  const [filter, setFilter] = useState('All');
  const [users, setUsers] = useState(mockPremiumUsers);

  const filteredUsers = useMemo(() => {
    if (filter === 'All') return users;
    return users.filter(u => u.status === filter);
  }, [users, filter]);

  const handleRevoke = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'Expired' } : u));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Premium Users</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subscription Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Expiry Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment Method</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.subscriptionDate}</td>
                <td className="px-4 py-3">{user.expiryDate}</td>
                <td className="px-4 py-3">{user.paymentMethod}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>{user.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  {user.status === 'Active' && (
                    <button
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded shadow"
                      onClick={() => handleRevoke(user.id)}
                    >
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Premium; 