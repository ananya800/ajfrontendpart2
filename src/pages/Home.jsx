import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ProductRowByCategory from "../components/ProductRowByCategory";  
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";

const categories = ["Mobiles", "Laptops", "Audio", "Books", "Home", "Kitchen", "Clothing", "Footwear", "Camera"];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-background text-text dark:bg-darkbg dark:text-lighttext transition-colors duration-300">
      
      {/* Header with category selector */}
      <div className="backdrop-blur-sm bg-white/60 dark:bg-black/30 border-b border-gray-300 dark:border-red-900">
        <Header
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Hero section */}
      <HeroSection />

      {/* Products by category */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="space-y-12">
          {categories.map((cat) => (
            <div key={cat}>
              <ProductRowByCategory category={cat} search={search} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
