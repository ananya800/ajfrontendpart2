import { useState } from "react";
import Navbar from "../components/Navbar";
import CategoryFilter from "../components/CategoryFilter";
import ProductRowByCategory from "../components/ProductRowByCategory";  
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";

const categories = ["Mobiles", "Laptops", "Audio","Books","Home","Kitchen","Clothing","Footwear","Camera"];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  
  return (
    <div className="min-h-screen bg-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      

      <Header
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}/>
        
      
      
      
      <HeroSection/>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className=" mt-8">
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
