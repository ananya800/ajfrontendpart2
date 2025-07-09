import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product, onViewDetail, onRemove }) => {
  const showPercent =
    product.percentage_change !== undefined &&
    !isNaN(product.percentage_change);
  const navigate = useNavigate();

  // Calculate price change if available
  const showPriceChange = 
    product.priceHistory && 
    product.priceHistory.length > 1 &&
    product.product_price !== undefined;
  
  let priceChange = 0;
  if (showPriceChange && product.priceHistory.length >= 2) {
    const currentPrice = product.product_price;
    const previousPrice = product.priceHistory[product.priceHistory.length - 2].product_price;
    priceChange = currentPrice - previousPrice;
  }

  const handleCardClick = (e) => {
    // Prevent navigation if clicking the remove button
    if (e.target.closest("button[title='Remove product']")) return;
    navigate(`/product/${product.product_id}`);
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        boxShadow: "0 8px 32px rgba(37,99,235,0.15)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-72 h-92 flex-shrink-0 flex flex-col items-center hover:shadow-lg transition relative cursor-pointer"
      onClick={handleCardClick}
    >
      {onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(product); }}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 bg-white dark:bg-gray-900 rounded-full p-1 shadow"
          title="Remove product"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* Price change indicator badge */}
      {priceChange !== 0 && (
        <div className={`absolute top-2 right-2 font-bold text-sm px-2 py-1 rounded-full shadow-md ${
          priceChange < 0 
            ? "bg-green-500 text-white" 
            : "bg-red-500 text-white"
        }`}>
          {priceChange < 0 ? "↓" : "↑"} ₹{Math.abs(priceChange)}
        </div>
      )}

      <img
        src={product.product_image}
        alt={product.product_name}
        className="w-28 h-28 object-cover rounded mb-2"
      />

      {/* Product name - clamped to 2 lines */}
      <div className="font-semibold text-lg text-center mb-1 text-gray-900 dark:text-gray-100 line-clamp-2 w-full px-2">
        {product.product_name}
      </div>

      <div className="text-blue-600 font-bold text-xl mb-1">
        ₹{product.product_price}
      </div>

      {/* Price drop percent if provided */}
      {showPercent && (
        <div
          className={`text-xs mb-2 ${
            product.percentage_change < 0
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {product.percentage_change < 0 ? "↓" : "↑"}{" "}
          {Math.abs(product.percentage_change).toFixed(2)}%
        </div>
      )}

      <Link
        to={`/product/${product.product_id}`}
        className="mt-auto px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
        onClick={e => e.stopPropagation()}
      >
        View Details
      </Link>
    </motion.div>
  );
};

export default ProductCard;
