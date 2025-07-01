import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import PriceGraph from "../components/PriceGraph";
import AlertToggle from "../components/AlertToggle";
import { mockProducts } from "../data/mockProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === Number(id));
  const [alert, setAlert] = useState(false);

  if (!product) return <div className="text-center mt-20 text-gray-500">Product not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="flex flex-col md:flex-row gap-8 w-full h-full p-8 md:p-16">
        <img src={product.image} alt={product.name} className="w-64 h-64 object-cover rounded-lg shadow-lg" />
        <div className="flex-1 flex flex-col gap-4 justify-center">
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{product.name}</div>
          <div className="text-blue-600 font-bold text-2xl">₹{product.price}</div>
          <div className="text-gray-600 dark:text-gray-300">{product.description}</div>
          <AlertToggle enabled={alert} onToggle={() => setAlert(a => !a)} />
          <div className="mt-4">
            <div className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Price Trend</div>
            <PriceGraph history={product.history} />
          </div>
          <div className="mt-4">
            <div className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Price Timeline</div>
            <div className="flex flex-wrap gap-2 text-sm">
              {product.history.map((price, i) => (
                <span key={i} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">₹{price}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 