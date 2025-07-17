import { useState } from "react";
import { motion } from "framer-motion";
import { PlusIcon } from '@heroicons/react/24/solid';
import axios from "axios";

const TrackableProductCard = ({ product, isTracked, onTrack, loggedInUserEmail }) => {
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState(null);

  // Open product link in new tab
  const handleCardClick = (e) => {
    // Prevent navigation if clicking the + button
    if (e.target.closest("button[title='Track this product']")) return;
    window.open(product.product_url, '_blank', 'noopener');
  };

  // Handle + button click
  const handleTrack = async (e) => {
    e.stopPropagation();
    if (isTracked || adding) return;
    setAdding(true);
    setToast(null);
    try {
      // Real API call to add_searched_product
      const response = await axios.post(
        `http://localhost:3008/producthome/add_searched_product/${product.product_id}`,
        {},
        { withCredentials: true }
      );
      if (response.data && response.data.status === "success") {
        setToast({ type: 'success', message: 'Tracking started successfully ✅' });
        if (onTrack) onTrack(product);
      } else if (response.data && response.data.message === "PRODUCT ALREADY SEARCHING") {
        setToast({ type: 'error', message: 'Product already being tracked.' });
      } else {
        setToast({ type: 'error', message: response.data.message || 'Failed to start tracking ❌' });
      }
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to start tracking ❌' });
    } finally {
      setAdding(false);
      setTimeout(() => setToast(null), 2500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(37,99,235,0.15)" }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 max-w-xs w-full flex flex-col justify-between items-center hover:shadow-xl transition relative group m-auto"
    >
      {/* Floating + button */}
      <button
        title="Track this product"
        className={`absolute top-4 right-4 z-10 rounded-full bg-blue-600 text-white p-2 shadow-lg hover:bg-blue-700 transition-all border-4 border-white dark:border-gray-800 ${isTracked ? 'opacity-60 cursor-not-allowed' : ''}`}
        onClick={handleTrack}
        disabled={isTracked || adding}
      >
        {adding ? (
          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <PlusIcon className="h-5 w-5" />
        )}
      </button>

      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>{toast.message}</div>
      )}

      <img
        src={product.product_image}
        alt={product.product_name}
        className="w-full h-48 object-contain bg-white rounded-xl mb-4 border border-gray-200 dark:border-gray-700"
      />

      <div className="flex flex-col justify-between flex-1 w-full">
        <div>
          <div className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 w-full">
            {product.product_name}
          </div>
          <div className="text-blue-600 font-bold text-xl mb-2">₹{product.product_price}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrackableProductCard; 