const categories = ["Mobiles", "Laptops", "Audio"];

const CategoryFilter = ({ selected, onCategoryChange }) => (
  <div className="flex space-x-4 my-4 px-6">
    {categories.map((cat) => (
      <button
        key={cat}
        className={`px-4 py-2 rounded-full font-medium transition shadow-sm border border-gray-200 dark:border-gray-700 ${selected === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
        onClick={() => onCategoryChange(cat)}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter; 