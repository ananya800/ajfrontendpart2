const AlertToggle = ({ enabled, onToggle }) => (
  <div className="flex items-center space-x-2">
    <span className="text-gray-700 dark:text-gray-200">Alerts</span>
    <button
      onClick={onToggle}
      className={`w-10 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 duration-300 focus:outline-none ${enabled ? 'bg-blue-600' : ''}`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${enabled ? 'translate-x-4' : ''}`}
      />
    </button>
  </div>
);

export default AlertToggle; 