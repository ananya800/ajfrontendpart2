import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import LoadingScreen from "../components/LoadingScreen";
import { useRef, useCallback } from "react";

const BATCH_SIZE = 12;

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [addError, setAddError] = useState("");
  const [loading, setLoading] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const loader = useRef();

  // Fetch products in batches
  const fetchProducts = useCallback(async (reset = false) => {
    setLoading(true);
    setAddError("");
    try {
      const response = await axios.get(
        `http://localhost:3008/category/${category}?skip=${reset ? 0 : page * BATCH_SIZE}&limit=${BATCH_SIZE}`,
        { withCredentials: true }
      );
      const newProducts = response.data || [];
      setProducts(prev => reset ? newProducts : [...prev, ...newProducts]);
      setHasMore(newProducts.length === BATCH_SIZE);
      if (reset) setPage(1); else setPage(prev => prev + 1);
    } catch (err) {
      console.error("Error fetching products:", err);
      setAddError("Failed to load products.");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [category, page]);

  // Reset on category change
  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
    fetchProducts(true);
  }, [category]);

  // Remove infinite scroll observer

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {loading && products.length === 0 && !skipLoading ? (
        <LoadingScreen 
          message={`Finding best ${category} deals...`} 
          onSkip={() => setSkipLoading(true)} 
        />
      ) : (
        <>
          <Navbar />
          <div className="w-full mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 capitalize">{category}</h2>

            {addError && (
              <div className="text-center text-red-600 mb-4">{addError}</div>
            )}

            <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.length > 0 ? (
                products.map(product => (
                  <ProductCard key={product.product_id} product={product} />
                ))
              ) : !loading ? (
                <div className="col-span-full text-center text-gray-500">
                  No products found.
                </div>
              ) : null}
            </div>
            {/* Show More Products Button */}
            {hasMore && products.length > 0 && !loading && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => fetchProducts()}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-pink-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Show More Products
                </button>
              </div>
            )}
            {/* Loading spinner or text when loading more */}
            {loading && products.length > 0 && (
              <div className="flex justify-center my-6">
                <span className="text-gray-500 text-lg font-medium">Loading...</span>
              </div>
            )}
            {/* End message */}
            {!hasMore && products.length > 0 && (
              <div className="text-center text-gray-400 mt-6">You've reached the end</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPage;
