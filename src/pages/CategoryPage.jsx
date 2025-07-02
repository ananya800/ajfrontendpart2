import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { mockProducts } from "../data/mockProducts";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { category } = useParams();
  const products = mockProducts.filter(p => p.category === category);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">{category}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage; 