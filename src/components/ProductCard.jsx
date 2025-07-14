import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const getMerchantLogo = (url) => {
  if (!url) return null;
  if (url.includes('amazon')) return 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg';
  if (url.includes('flipkart')) return 'https://upload.wikimedia.org/wikipedia/commons/1/13/Flipkart_logo.png';
  if (url.includes('apple')) return 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg';
  if (url.includes('dell')) return 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg';
  if (url.includes('asus')) return 'https://upload.wikimedia.org/wikipedia/commons/6/6e/ASUS_Logo.svg';
  if (url.includes('hp')) return 'https://upload.wikimedia.org/wikipedia/commons/2/2c/HP_logo_2012.svg';
  if (url.includes('bose')) return 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Bose_logo.svg';
  if (url.includes('sony')) return 'https://upload.wikimedia.org/wikipedia/commons/2/20/Sony_wordmark.svg';
  if (url.includes('jbl')) return 'https://upload.wikimedia.org/wikipedia/commons/5/5a/JBL_logo.svg';
  return null;
};

const Sparkline = ({ data }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 60},${40 - ((v - min) / (max - min || 1)) * 30}`).join(' ');
  return (
    <svg width="64" height="40" viewBox="0 0 64 40" className="mt-1 mb-2">
      <polyline
        fill="none"
        stroke="#6366f1"
        strokeWidth="3"
        points={points}
      />
      <circle cx="64" cy={40 - ((data[data.length - 1] - min) / (max - min || 1)) * 30} r="3" fill="#6366f1" />
    </svg>
  );
};

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

  const merchantLogo = getMerchantLogo(product.url || product.product_url);

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0 12px 32px rgba(37,99,235,0.18)",
        borderColor: "#6366f1"
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 w-72 flex-shrink-0 flex flex-col items-center hover:shadow-2xl transition border border-gray-200 dark:border-gray-700 relative"
      onClick={handleCardClick}
    >
      {/* Merchant Logo */}
      {merchantLogo && (
        <img src={merchantLogo} alt="Merchant" className="absolute top-2 left-2 w-8 h-8 object-contain bg-white rounded-full border border-gray-200 dark:border-gray-700 shadow" />
      )}
      {/* Remove button */}
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
        <div className={`absolute top-2 right-10 font-bold text-sm px-2 py-1 rounded-full shadow-md ${
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
        className="w-28 h-28 object-contain bg-white rounded mb-2 border border-gray-100 dark:border-gray-700"
      />
      {/* Product name - clamped to 2 lines */}
      <div className="font-semibold text-lg text-center mb-1 text-gray-900 dark:text-gray-100 line-clamp-2 w-full px-2">
        {product.product_name}
      </div>
      <div className="text-blue-600 font-bold text-xl mb-1">
        ₹{product.product_price}
      </div>
      {/* Price history sparkline */}
      {product.history && <Sparkline data={product.history} />}
      {/* Price drop percent if provided */}
      {showPercent && (
        <div
          className={`text-xs mb-2 ${
            product.percentage_change < 0
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {product.percentage_change < 0 ? "↓" : "↑"} {Math.abs(product.percentage_change).toFixed(2)}%
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
