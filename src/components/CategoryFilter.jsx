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
  <div className="w-full bg-primary  dark:bg-blue-950 shadow-sm border-b border-blue-200 dark:border-blue-900">
    <div className="flex flex-wrap justify-start gap-2 px-4 py-2 overflow-x-auto scrollbar-hide sm:justify-between">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          to={`/category/${cat.name}`}
          className="flex items-center px-3 py-1 hover:bg-blue-200 dark:hover:bg-blue-900 transition font-medium text-white dark:text-gray-200 whitespace-nowrap text-sm rounded-md"
          style={{ textDecoration: 'none' }}
        >
          <span className="text-base mr-1">{cat.icon}</span> {cat.name}
        </Link>
      ))}
    </div>
  </div>
);

export default CategoryFilter;
