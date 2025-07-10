import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PriceGraph from "../components/PriceGraph";
import AlertToggle from "../components/AlertToggle";
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";


const ProductDetail = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [alertSettings, setAlertSettings] = useState(null);
  const [skipLoading, setSkipLoading] = useState(false);

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
        
        // Calculate max price from price history
        if (data.priceHistory && data.priceHistory.length > 0) {
          const maxPriceValue = Math.max(...data.priceHistory.map(item => item.product_price));
          setMaxPrice(maxPriceValue);
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  const handleAlertToggle = (enabled, settings = null) => {
    setAlert(enabled);
    if (enabled && settings) {
      setAlertSettings(settings);
      // Here you would typically send this to your backend
      console.log("Alert set with settings:", settings);
      // Show a toast notification
      showToast("Alert set successfully!");
    }
  };

  const showToast = (message) => {
    // Create a toast element
    const toast = document.createElement("div");
    toast.className = "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-up";
    toast.textContent = message;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.add("animate-fade-out");
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  };

  if (loading && !skipLoading) {
    return <LoadingScreen message="Fetching product details..." onSkip={() => setSkipLoading(true)} />;
  }
  
  if (error || !product) return <div className="text-center mt-20 text-red-500">Error: {error || "Product not found."}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="flex flex-col md:flex-row gap-8 w-full h-full p-8 md:p-16">
        <img src={product.product_image} alt={product.product_name} className="w-64 h-64 object-cover rounded-lg shadow-lg" />
        <div className="flex-1 flex flex-col gap-4 justify-center">
          <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{product.product_name}</div>
          
          <div className="flex items-center gap-3">
          <div className="text-blue-600 font-bold text-2xl">₹{product.product_price}</div>
            {maxPrice > product.product_price && (
              <div className="text-gray-500 line-through text-lg">MRP: ₹{maxPrice}</div>
            )}
          </div>
          
          <div className="text-gray-600 dark:text-gray-300">{product.max_price || "No description available."}</div>
          <AlertToggle enabled={alert} onToggle={handleAlertToggle} />
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
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
        
        .animate-fade-out {
          animation: fadeOut 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
