import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProductCard from "./ProductCard";

const ProductRow = ({ title, products, onViewDetail, onRemove }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * .7;
      rowRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-2 px-6 text-gray-800 dark:text-gray-100">{title}</h2>
      <div className="relative">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-900 shadow rounded-full p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-800 transition disabled:opacity-30"
          style={{ left: '-18px' }}
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>
        <div
          ref={rowRef}
          className="flex overflow-x-auto space-x-4 px-6 pb-2 hide-scrollbar scroll-smooth"
        >
      {products.map(product => (
        <ProductCard key={product.id} product={product} onViewDetail={onViewDetail} onRemove={onRemove} />
      ))}
        </div>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-900 shadow rounded-full p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-800 transition disabled:opacity-30"
          style={{ right: '-18px' }}
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>
    </div>
  </div>
);
};

export default ProductRow; 