import { FiSearch } from "react-icons/fi";

const SearchBar = ({ value, onSearch, placeholder }) => (
  <div className="w-full flex justify-center my-0 px-0">
    <div className="relative w-full max-w-md">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-blue-500">
        <FiSearch className="w-4 h-4" />
      </span>
      <input
        type="text"
        value={value}
        onChange={e => onSearch(e.target.value)}
        placeholder={placeholder || "Search products..."}
        className="w-full pl-8 pr-3 py-2 rounded-lg border-2 border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg focus:outline-none focus:ring-0 focus:border-gradient-to-r focus:from-blue-400 focus:to-pink-400 transition-all text-base"
        style={{ borderImage: 'linear-gradient(90deg, #3b82f6, #a21caf, #ec4899) 1' }}
      />
    </div>
  </div>
);

export default SearchBar; 