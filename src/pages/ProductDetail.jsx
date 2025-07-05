import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PriceGraph from "../components/PriceGraph";
import AlertToggle from "../components/AlertToggle";
import axios from "axios";


const ProductDetail = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    console.log("started")
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3008/producthome/product/${product_id}`,
        { withCredentials: true }
      );
        console.log("API response:", response.data);
        const data = response.data;
        setProduct(data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  if (loading) return <div className="text-center mt-20 text-gray-500">Loading...</div>;
  if (error || !product) return <div className="text-center mt-20 text-red-500">Error: {error || "Product not found."}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="flex flex-col md:flex-row gap-8 w-full h-full p-8 md:p-16">
        <img src={product.product_image} alt={product.product_name} className="w-64 h-64 object-cover rounded-lg shadow-lg" />
        <div className="flex-1 flex flex-col gap-4 justify-center">
          <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{product.product_name}</div>
          <div className="text-blue-600 font-bold text-2xl">₹{product.product_price}</div>
          <div className="text-gray-600 dark:text-gray-300">{product.max_price || "No description available."}</div>
          <AlertToggle enabled={alert} onToggle={() => setAlert(a => !a)} />
          <div className="mt-4">
            <div className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Price Trend</div>
            <PriceGraph history={product.priceHistory || []} />
          </div> 
          <div className="mt-4">
            <div className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Price Timeline</div>
            <div className="flex flex-wrap gap-2 text-sm">
              {(product.priceHistory || []).map((price, i) => (
                <span key={i} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">₹{price.product_price}</span>
              ))}
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default ProductDetail;
