import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Dashboard = () => {
  const [url, setUrl] = useState("");
  const [products, setProducts] = useState([]);
  const [addError, setAddError] = useState("");
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3008/producthome", {
        withCredentials: true,
      });
      console.log("Fetched products:", response.data);

      setProducts(response.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setAddError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setAddError("");
    setAddLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3008/producthome/add_Product",
        { url },
        { withCredentials: true }
      );
      console.log("API response:", response.data);
      setUrl("");
      await fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
      setAddError(
        err.response?.data?.message ||
          "Failed to add product. Make sure the URL is valid."
      );
    } finally {
      setAddLoading(false);
    }
  };

  const handleRemove = async (product_id) => {
    setLoading(true);
    setAddError("");
    try {
      await axios.delete(
        `http://localhost:3008/producthome/remove/${product_id}`,
        {
          withCredentials: true,
        }
      );
      await fetchProducts();
    } catch (err) {
      console.error("Error removing product:", err.response || err.message);
      setAddError("Failed to remove product.");
    } finally {
      setLoading(false);
    }
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
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-2 rounded-l border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <button
          type="submit"
          disabled={addLoading}
          className={`px-6 py-2 rounded-r transition ${
            addLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {addLoading ? "Processing..." : "Add"}
        </button>
      </form>

      {addError && (
        <div className="text-red-600 text-center mt-2">{addError}</div>
      )}

      <div className="flex flex-wrap gap-6 justify-center mt-10">
        {loading && products.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">
            No products added yet.
          </div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.product_id}
              product={product}
              onRemove={() => handleRemove(product.product_id)}
              isTracked={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
