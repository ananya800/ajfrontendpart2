import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const getMerchantLogo = (url) => {
  if (!url) return null;
  if (url.includes('amazon')) return 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg';
  
};

const ProductCard = ({ product, onViewDetail, onRemove }) => {

  const navigate = useNavigate();

  
  const handleCardClick = (e) => {
    if (e.target.closest("button[title='Remove product']")) return;
    navigate(`/product/${product.product_id}`);
  };

  const merchantLogo = getMerchantLogo(product.product_url);

  return (
    <motion.div
  whileHover={{
    scale: 1.03,
    boxShadow: "0 8px 24px rgba(255, 0, 0, 0.15)",
    // borderColor: "#ef4444", // Tailwind red-500
    backgroundColor: "#fff1f2" // red-50 background on hover
  }}
  transition={{ type: "spring", stiffness: 180, damping: 18 }}
  className="bg-white dark:bg-gray-800 shadow-md p-4 w-72 flex-shrink-0 flex flex-col items-center transition-all border  relative"
  onClick={handleCardClick}
>
  {/* Merchant Logo */}
  {merchantLogo && (
    <img src={merchantLogo} alt="Merchant" className="absolute top-2 left-2 w-8 h-8 object-contain bg-white rounded-full border border-gray-200 dark:border-gray-700 shadow" />
  )}

  {/* Remove Button */}
  {onRemove && (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemove(product.product_id);
      }}
      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 bg-white dark:bg-gray-900 rounded-full p-1 shadow"
      title="Remove product"
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )}

  {/* Full Width Product Image */}
  <img
    src={product.product_image}
    alt={product.product_name}
    className="w-full h-40 object-contain bg-white rounded mb-3 border border-gray-100 dark:border-gray-700"
  />

  {/* Product Name */}
  <div className="font-semibold  text-center mb-1 text-tertiary dark:text-gray-100 line-clamp-2 w-full px-2">
    {product.product_name}
  </div>

  {/* Price */}
  <div className="text-blue-600 font-bold text-xl mb-2">
    ₹{product.product_price}
  </div>

  {/* View Details Button */}
  <Link
    to={`/product/${product.product_id}`}
    className="mt-auto px-3 py-1 bg-primary text-white rounded hover:bg-blue-700 transition text-sm"
    onClick={e => e.stopPropagation()}
  >
    View Details
  </Link>
</motion.div>

  );
};

export default ProductCard;
