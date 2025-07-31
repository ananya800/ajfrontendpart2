import { Link } from "react-router-dom";
import styles from "./CategoryFilter.module.css";

const categories = [
  { name: "Mobiles", icon: "📱" },
  { name: "Laptops", icon: "💻" },
  { name: "Audio", icon: "🎧" },
  { name: "Books", icon: "📚" },
  { name: "Home", icon: "🏠" },
  { name: "Kitchen", icon: "🍳" },
  { name: "Clothing", icon: "👕" },
  { name: "Footwear", icon: "👟" },
  { name: "Watches", icon: "⌚" },
  { name: "Camera", icon: "📷" },
];

const CategoryFilter = () => (
  <div className="w-full bg-secondary dark:bg-blue-950 shadow-sm border-b border-blue-200 dark:border-blue-900">
    <div className="flex justify-between items-center px-4 py-2">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          to={`/category/${cat.name}`}
          className="flex items-center px-3 py-1 hover:bg-blue-200 dark:hover:bg-blue-900 transition font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap text-sm"
          style={{ textDecoration: 'none' }}
        >
          <span className="text-base mr-1">{cat.icon}</span> {cat.name}
        </Link>
      ))}
    </div>
  </div>
);

export default CategoryFilter;