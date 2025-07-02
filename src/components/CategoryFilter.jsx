import { Link } from "react-router-dom";

const categories = [
  { name: "Mobiles", icon: "📱" },
  { name: "Laptops", icon: "💻" },
  { name: "Audio", icon: "🎧" },
];

const CategoryFilter = () => (
  <div className="flex bg-blue-100 dark:bg-blue-950 shadow-sm border-b border-blue-200 dark:border-blue-900 overflow-x-auto">
    {categories.map((cat) => (
      <Link
        key={cat.name}
        to={`/category/${cat.name}`}
        className="flex items-center px-6 py-1 hover:bg-blue-200 dark:hover:bg-blue-900 transition font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap border-r border-blue-200 dark:border-blue-900 last:border-r-0"
        style={{ textDecoration: 'none' }}
      >
        <span className="text-xl mr-2">{cat.icon}</span> {cat.name}
      </Link>
    ))}
  </div>
);

export default CategoryFilter; 