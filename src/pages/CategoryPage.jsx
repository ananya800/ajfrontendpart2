import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import LoadingScreen from "../components/LoadingScreen";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [addError, setAddError] = useState("");
  const [loading, setLoading] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setAddError("");

      try {
        const response = await axios.get(
          `http://localhost:3008/category/${category}`,  // dynamic route!
          { withCredentials: true }
        );
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setAddError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {loading && !skipLoading ? (
        <LoadingScreen 
          message={`Finding best ${category} deals...`} 
          onSkip={() => setSkipLoading(true)} 
        />
      ) : (
        <>
          <Navbar />
          <div className="w-full mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 capitalize">{category}</h2>

            {loading && skipLoading && (
              <div className="text-center text-blue-500 mb-4">Loading products...</div>
            )}

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
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPage;
