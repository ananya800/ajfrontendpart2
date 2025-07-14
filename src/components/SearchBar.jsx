import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ value, onSearch, placeholder, onSubmit }) => {
  const [searchValue, setSearchValue] = useState(value || "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = searchValue.trim();
    
    if (trimmedValue) {
      // If onSubmit prop is provided, use it (for Home page)
      if (onSubmit) {
        onSubmit(trimmedValue);
      } else {
        // Otherwise, navigate to search results page
        navigate(`/search/${encodeURIComponent(trimmedValue)}`);
      }
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    if (onSearch) {
      onSearch(newValue);
    }
  };

  return (
    <div className="w-full flex justify-center my-0 px-0">
      <form onSubmit={handleSubmit} className="relative w-full max-w-md">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-blue-500">
          <FiSearch className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder={placeholder || "Search products..."}
          className="w-full pl-8 pr-3 py-2 rounded-lg border-2 border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg focus:outline-none focus:ring-0 focus:border-gradient-to-r focus:from-blue-400 focus:to-pink-400 transition-all text-base"
          style={{ borderImage: 'linear-gradient(90deg, #3b82f6, #a21caf, #ec4899) 1' }}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 hover:text-blue-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar; 