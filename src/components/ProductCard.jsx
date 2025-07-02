import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product, onViewDetail, onRemove }) => (
  <motion.div
    whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(37,99,235,0.15)" }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-56 flex-shrink-0 flex flex-col items-center hover:shadow-lg transition relative"
  >
    {onRemove && (
      <button
        onClick={() => onRemove(product)}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 bg-white dark:bg-gray-900 rounded-full p-1 shadow"
        title="Remove product"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    )}
    <img src={product.image} alt={product.name} className="w-28 h-28 object-cover rounded mb-2" />
    <div className="font-semibold text-lg text-center mb-1 text-gray-900 dark:text-gray-100">{product.name}</div>
    <div className="text-blue-600 font-bold text-xl mb-2">₹{product.price}</div>
    {/* Mini price trend (optional) */}
    <div className="text-xs text-gray-500 mb-2">{product.history && product.history.length > 1 ? `↓ ₹${product.history[product.history.length-2] - product.price}` : ''}</div>
    <Link to={`/product/${product.id}`} className="mt-auto px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">View Details</Link>
  </motion.div>
);

export default ProductCard; 