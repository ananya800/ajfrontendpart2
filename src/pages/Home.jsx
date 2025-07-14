import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import ProductRowByCategory from "../components/ProductRowByCategory";  // NEW
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

const categories = ["Mobiles", "Laptops", "Audio","Books","Home","Kitchen","Clothing","Footwear","Camera"];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (searchTerm) => {
    navigate(`/search/${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <CategoryFilter
        selected={selectedCategory}
        onCategoryChange={(cat) => setSelectedCategory(cat === selectedCategory ? null : cat)}
      />
      {/* Hero Section */}
      <div className="relative max-w-5xl mx-auto px-4 pt-10 pb-8">
        {/* Animated Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <svg className="absolute top-0 left-1/2 transform -translate-x-1/2 opacity-40 animate-float-rotate" width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="300" cy="150" rx="220" ry="80" fill="url(#paint0_radial)" />
            <defs>
              <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(300 150) scale(220 80)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a5b4fc" />
                <stop offset="1" stopColor="#f0abfc" stopOpacity="0.7" />
              </radialGradient>
            </defs>
          </svg>
          <svg className="absolute bottom-0 right-0 opacity-30 animate-float-fast" width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="100" fill="url(#paint1_radial)" />
            <defs>
              <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientTransform="translate(100 100) scale(100)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f472b6" />
                <stop offset="1" stopColor="#818cf8" stopOpacity="0.5" />
              </radialGradient>
            </defs>
          </svg>
          <svg className="absolute top-10 left-10 opacity-20 animate-float-slow" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="100" height="100" rx="30" fill="#f472b6" fillOpacity="0.5" />
          </svg>
        </div>
        <div className="rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 shadow-2xl p-10 text-center flex flex-col items-center relative z-10">
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
        {/* <SearchBar value={search} onSearch={setSearch} onSubmit={handleSearchSubmit} /> */}

        <div className="space-y-12 mt-8">
          {categories.map((cat) => (
            <div key={cat}>
              <ProductRowByCategory category={cat} search={search} />
            </div>
          ))}
        </div>

        {/* About & Contact */}
        <div className="mt-20 mb-10 bg-gradient-to-r ... p-1">
          <div className="rounded-2xl bg-white dark:bg-gray-900 p-4 md:p-8">
            <AboutUs />
          </div>
        </div>
        <div className="mt-20 mb-10 bg-gradient-to-r ... p-1">
          <div className="rounded-2xl bg-white dark:bg-gray-900 p-4 md:p-8">
            <ContactUs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
