import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import ProductRow from "../components/ProductRow";
import { mockProducts } from "../data/mockProducts";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

const categories = ["Mobiles", "Laptops", "Audio"];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = mockProducts.filter(p =>
    (!selectedCategory || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <CategoryFilter selected={selectedCategory} onCategoryChange={cat => setSelectedCategory(cat === selectedCategory ? null : cat)} />
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 shadow-2xl p-10 text-center flex flex-col items-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">Track Prices. Save Money. Shop Smart.</h1>
          <p className="text-lg sm:text-xl text-white/90 mb-6 max-w-2xl mx-auto">AJtracker helps you monitor prices, get instant alerts, and never miss a deal again. Join thousands of smart shoppers today!</p>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-lg font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Start Tracking Now
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <SearchBar value={search} onSearch={setSearch} />
        <div className="space-y-12 mt-8">
          {categories.map(cat => (
            <div
              key={cat}
              className="rounded-2xl shadow-xl p-6 bg-white dark:bg-gray-900"
            >
              <ProductRow
                title={cat}
                products={filtered.filter(p => p.category === cat)}
              />
            </div>
          ))}
        </div>
        {/* About Us Section */}
        <div className="mt-20 mb-10 rounded-3xl shadow-2xl bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 dark:from-blue-900 dark:via-pink-900 dark:to-purple-900 p-1">
          <div className="rounded-2xl bg-white dark:bg-gray-900 p-4 md:p-8">
            <AboutUs />
          </div>
        </div>
        {/* Contact Us Section */}
        <div className="mt-20 mb-10 rounded-3xl shadow-2xl bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100 dark:from-purple-900 dark:via-blue-900 dark:to-pink-900 p-1">
          <div className="rounded-2xl bg-white dark:bg-gray-900 p-4 md:p-8">
            <ContactUs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 