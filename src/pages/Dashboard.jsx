import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { mockProducts } from "../data/mockProducts";

const Dashboard = () => {
  const [url, setUrl] = useState("");
  const [products, setProducts] = useState([]);
  const [addError, setAddError] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ajtracker_products") || "[]");
    setProducts(saved);
  }, []);

  const handleAdd = e => {
    e.preventDefault();
    setAddError("");
    // Try to find a mock product by URL
    const newProduct = mockProducts.find(p => p.url === url.trim());
    if (!newProduct) {
      setAddError("No product found for this URL (mocked). Try one from the homepage.");
      return;
    }
    // Prevent duplicate
    if (products.some(p => p.url === newProduct.url)) {
      setAddError("Product already added.");
      return;
    }
    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem("ajtracker_products", JSON.stringify(updated));
    setUrl("");
  };

  const handleRemove = (product) => {
    const updated = products.filter(p => p.id !== product.id);
    setProducts(updated);
    localStorage.setItem("ajtracker_products", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <form onSubmit={handleAdd} className="max-w-xl mx-auto mt-8 flex gap-2">
        <input
          type="url"
          required
          placeholder="Paste Amazon product URL..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="flex-1 px-4 py-2 rounded-l border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition">Add</button>
      </form>
      {addError && <div className="text-red-600 text-center mt-2">{addError}</div>}
      <div className="flex flex-wrap gap-6 justify-center mt-10">
        {products.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">No products added yet.</div>
        ) : (
          products.map((product, i) => (
            <ProductCard key={i} product={product} onRemove={handleRemove} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard; 