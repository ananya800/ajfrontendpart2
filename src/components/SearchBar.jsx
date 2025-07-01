const SearchBar = ({ value, onSearch }) => (
  <div className="w-full flex justify-center my-4 px-6">
    <input
      type="text"
      value={value}
      onChange={e => onSearch(e.target.value)}
      placeholder="Search products..."
      className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm"
    />
  </div>
);

export default SearchBar; 