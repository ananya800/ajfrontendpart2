import { useState } from "react";
import Navbar from "../components/Navbar";
import CategoryFilter from "../components/CategoryFilter";
import ProductRowByCategory from "../components/ProductRowByCategory";  
import HeroSection from "../components/HeroSection";

const categories = ["Mobiles", "Laptops", "Audio","Books","Home","Kitchen","Clothing","Footwear","Camera"];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <CategoryFilter
        selected={selectedCategory}
        onCategoryChange={(cat) => setSelectedCategory(cat === selectedCategory ? null : cat)}
      />
      
      <HeroSection/>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-12 mt-8">
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
