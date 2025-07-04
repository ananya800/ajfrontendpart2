import { useState, useEffect } from "react";
import axios from "axios";
import ProductRow from "./ProductRow";

const ProductRowByCategory = ({ category, search }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addError, setAddError] = useState("");

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3008/category/${category}`, {
          withCredentials: true,
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching category:", category, err);
        setAddError("Failed to load category products.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  const filtered = products.filter((p) =>
    search ? p.product_name.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <>
      {addError ? (
        <p className="text-red-600 text-sm">{addError}</p>
      ) : (
        <ProductRow title={category} products={filtered} loading={loading} />
      )}
    </>
  );
};

export default ProductRowByCategory;
