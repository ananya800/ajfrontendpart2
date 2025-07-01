import ProductCard from "./ProductCard";

const ProductRow = ({ title, products, onViewDetail, onRemove }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-2 px-6 text-gray-800 dark:text-gray-100">{title}</h2>
    <div className="flex overflow-x-auto space-x-4 px-6 pb-2 scrollbar-thin scrollbar-thumb-blue-200 dark:scrollbar-thumb-blue-900">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onViewDetail={onViewDetail} onRemove={onRemove} />
      ))}
    </div>
  </div>
);

export default ProductRow; 