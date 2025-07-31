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
        scale: 1.05,
        boxShadow: "0 12px 32px rgba(37,99,235,0.18)",
        borderColor: "#6366f1"
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 w-72 flex-shrink-0 flex flex-col items-center hover:shadow-2xl transition border border-gray-200 dark:border-gray-700 relative"
      onClick={handleCardClick}
    >
      {merchantLogo && (
        <img src={merchantLogo} alt="Merchant" className="absolute top-2 left-2 w-8 h-8 object-contain bg-white rounded-full border border-gray-200 dark:border-gray-700 shadow" />
      )}
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
      
      <img
        src={product.product_image}
        alt={product.product_name}
        className="w-28 h-28 object-contain bg-white rounded mb-2 border border-gray-100 dark:border-gray-700"
      />
      <div className="font-semibold text-lg text-center mb-1 text-gray-900 dark:text-gray-100 line-clamp-2 w-full px-2">
        {product.product_name}
      </div>
      <div className="text-blue-600 font-bold text-xl mb-1">
        ₹{product.product_price}
      </div>
      
      
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
