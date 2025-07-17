import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TrackableProductCard from '../components/TrackableProductCard';
// import { getMockSearchResults } from '../data/mockSearchResults';

const SearchResults = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tracked, setTracked] = useState([]); 
  // mock tracked product ids

  // Mock logged in user email
  const loggedInUserEmail = 'user@example.com';

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`http://localhost:3008/producthome/search/${productName}`,{withCredentials: true});
        if (response.data && Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Search error:', err);
        setError(err.response?.data?.message || 'Failed to search for products. Please try again.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    if (productName) {
      fetchSearchResults();
    }
  }, [productName]);

  // Handler for tracking a product
  const handleTrack = (product) => {
    setTracked(prev => [...prev, product.id || product.product_id]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Results Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Search Results for "{productName}"
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {loading ? 'Searching...' : `${products.length} products found`}
          </p>
        </div>
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Searching for products...</p>
            </div>
          </div>
        )}
        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Search Error
                </h3>
                <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => navigate('/')}
                className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
        {/* No Results */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We couldn't find any products matching "{productName}". Try searching with different keywords.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Home
            </button>
          </div>
        )}
        {/* Search Results Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-2">
            {products.map((product, index) => (
              <TrackableProductCard
                key={product.id || product.product_id || index}
                product={{
                  ...product,
                  product_image: product.image,
                  product_name: product.title,
                  product_price: product.price,
                  product_url: product.url || product.product_url || '#',
                  product_id: product.id || product.product_id || index
                }}
                isTracked={tracked.includes(product.id || product.product_id)}
                onTrack={handleTrack}
                loggedInUserEmail={loggedInUserEmail}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults; 