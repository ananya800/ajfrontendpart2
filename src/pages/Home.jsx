import { useState } from "react";
import Navbar from "../components/Navbar";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import ProductRow from "../components/ProductRow";
import { mockProducts } from "../data/mockProducts";

const categories = ["Mobiles", "Laptops", "Audio"];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = mockProducts.filter(p =>
    (!selectedCategory || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <CategoryFilter selected={selectedCategory} onCategoryChange={cat => setSelectedCategory(cat === selectedCategory ? null : cat)} />
      <SearchBar value={search} onSearch={setSearch} />
      {categories.map(cat => (
        <ProductRow
          key={cat}
          title={cat}
          products={filtered.filter(p => p.category === cat)}
        />
      ))}
    </div>
  );
};

export default Home; 