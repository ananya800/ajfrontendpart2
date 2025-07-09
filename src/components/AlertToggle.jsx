import { useState } from 'react';

const AlertToggle = ({ enabled, onToggle }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [alertType, setAlertType] = useState('any');
  const [customAmount, setCustomAmount] = useState('');

  const handleToggle = () => {
    if (!enabled) {
      setShowDropdown(true);
    } else {
      onToggle(false);
    }
  };

  const saveAlert = () => {
    onToggle(true, { type: alertType, amount: alertType === 'custom' ? customAmount : null });
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 dark:text-gray-200">Alerts</span>
        <button
          onClick={handleToggle}
          className={`w-10 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 duration-300 focus:outline-none ${enabled ? 'bg-blue-600' : ''}`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${enabled ? 'translate-x-4' : ''}`}
          />
        </button>
      </div>

      {showDropdown && (
        <div className="absolute z-10 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-sm font-semibold mb-3 text-gray-800 dark:text-gray-200">Notify me when price drops by:</h3>
          
          <div className="space-y-2">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="alertType" 
                value="any" 
                checked={alertType === 'any'}
                onChange={() => setAlertType('any')} 
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Any price drop</span>
            </label>
            
            <label className="flex items-center">
              <input 
                type="radio" 
                name="alertType" 
                value="50" 
                checked={alertType === '50'}
                onChange={() => setAlertType('50')} 
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">₹50</span>
            </label>
            
            <label className="flex items-center">
              <input 
                type="radio" 
                name="alertType" 
                value="100" 
                checked={alertType === '100'}
                onChange={() => setAlertType('100')} 
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">₹100</span>
            </label>
            
            <label className="flex items-center">
              <input 
                type="radio" 
                name="alertType" 
                value="500" 
                checked={alertType === '500'}
                onChange={() => setAlertType('500')} 
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">₹500</span>
            </label>
            
            <label className="flex items-center">
              <input 
                type="radio" 
                name="alertType" 
                value="custom" 
                checked={alertType === 'custom'}
                onChange={() => setAlertType('custom')} 
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Custom amount</span>
            </label>
            
            {alertType === 'custom' && (
              <div className="ml-6 mt-2">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button 
              onClick={() => setShowDropdown(false)}
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mr-2"
            >
              Cancel
            </button>
            <button 
              onClick={saveAlert}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Alert
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertToggle; 