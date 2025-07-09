import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import ProductRowByCategory from "../components/ProductRowByCategory";  // NEW
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

const categories = ["Mobiles", "Laptops", "Audio","Books","Home","Kitchen","Clothing","Footwear","Camera"];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [search, setSearch] = useState(params.get("search") || "");

  useEffect(() => {
    setSearch(params.get("search") || "");
  }, [location.search]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <CategoryFilter
        selected={selectedCategory}
        onCategoryChange={(cat) => setSelectedCategory(cat === selectedCategory ? null : cat)}
      />
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 shadow-2xl p-10 text-center flex flex-col items-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
            Track Prices. Save Money. Shop Smart.
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            AJtracker helps you monitor prices, get instant alerts, and never miss a deal again. Join thousands of smart shoppers today!
          </p>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-lg font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-300"
            onClick={() => navigate("/Dashboard")}
          >
            Start Tracking Now
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Remove SearchBar from here, since it's now in Navbar */}

        <div className="space-y-12 mt-8">
          {categories.map((cat) => (
            <div
              key={cat}
              className="rounded-2xl shadow-xl p-6 bg-white dark:bg-gray-900"
            >
              <ProductRowByCategory category={cat} search={search} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
