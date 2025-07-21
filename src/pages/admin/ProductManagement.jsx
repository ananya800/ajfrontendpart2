import { useState, useMemo, useEffect } from 'react';
import { HiSearch, HiFilter, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import axios from 'axios';

const emptyProduct = {
  id: null,
  name: '',
  image: '',
  url: '',
  site: '',
  price: '',
  lastUpdated: '',
  logs: [],
};

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [showLogs, setShowLogs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3008/admin/admin_products_view?page=${currentPage}&limit=${productsPerPage}`, { withCredentials: true });
        setProducts(response.data.products);
        console.log('Fetched products:', response.data.products);
        // If backend returns total count, set totalPages accordingly
        // setTotalPages(Math.ceil(response.data.total / productsPerPage));
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  // Filtering
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.site.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [products, searchTerm]);

  // Sorting
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredProducts, sortField, sortDirection]);

  // Pagination
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  // Open modal for add/edit
  const openModal = (product = null) => {
    setEditingProduct(product);
    setForm(product ? { ...product } : { ...emptyProduct });
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setForm(emptyProduct);
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save product (add or edit)
  const handleSave = (e) => {
    e.preventDefault();
    // Simple validation
    if (!form.name || !form.image || !form.url || !form.site || !form.price) return;
    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? { ...form, id: editingProduct.id, logs: editingProduct.logs } : p)));
    } else {
      setProducts((prev) => [
        ...prev,
        { ...form, id: Date.now(), lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' '), logs: [] },
      ]);
    }
    closeModal();
  };

  // Delete product
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Toggle logs section
  const toggleLogs = (id) => {
    setShowLogs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Product Management</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or site..."
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <HiSearch className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
          </div>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
            onClick={() => openModal()}
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 cursor-pointer" onClick={() => { setSortField('name'); setSortDirection(sortField === 'name' && sortDirection === 'asc' ? 'desc' : 'asc'); }}>Product Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">URL</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => { setSortField('site'); setSortDirection(sortField === 'site' && sortDirection === 'asc' ? 'desc' : 'asc'); }}>Site {sortField === 'site' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => { setSortField('price'); setSortDirection(sortField === 'price' && sortDirection === 'asc' ? 'desc' : 'asc'); }}>Current Price {sortField === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => { setSortField('lastUpdated'); setSortDirection(sortField === 'lastUpdated' && sortDirection === 'asc' ? 'desc' : 'asc'); }}>Last Updated {sortField === 'lastUpdated' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">No products found.</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.product_id}>
                  <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">{product.product_name}</td>
                  <td className="px-4 py-3"><img src={product.product_image} alt={product.name || product.product_name} className="w-16 h-16 object-cover rounded" /></td>
                  <td className="px-4 py-3"><a href={product.product_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">Link</a></td>
                  <td className="px-4 py-3">{amazon}</td>
                  <td className="px-4 py-3 font-bold text-green-700 dark:text-green-400">₹{ product.product_price}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-300">{product.last_updated}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button 
                      className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded shadow"
                      onClick={() => openModal(product)}
                    >
                      Edit
                    </button>
                    <button 
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded shadow"
                      onClick={() => handleDelete(product.product_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing <span className="font-medium">{(currentPage - 1) * productsPerPage + 1}</span> to{' '}
          <span className="font-medium">{Math.min(currentPage * productsPerPage, products.length)}</span> of{' '}
          <span className="font-medium">{products.length}</span> products
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          >
            <HiChevronLeft />
          </button>
          {[...Array(Math.min(totalPages, 5))].map((_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
            <button
              key={i}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded-md ${currentPage === pageNum ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
              >
                {pageNum}
            </button>
            );
          })}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          >
            <HiChevronRight />
          </button>
        </div>
      </div>
      {/* Collapsible Scraping Logs */}
      {paginatedProducts.map((product) => (
        showLogs[product.id] && (
          <div key={product.id + '-logs'} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow my-4 p-4">
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Scraping History for {product.name}</h4>
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-1 text-left">Timestamp</th>
                  <th className="px-2 py-1 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {product.logs.map((log, idx) => (
                  <tr key={idx}>
                    <td className="px-2 py-1 text-gray-700 dark:text-gray-200">{log.time}</td>
                    <td className={
                      `px-2 py-1 font-semibold ${log.status === 'Success' ? 'text-green-600' : 'text-red-600'}`
                    }>{log.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
              </div>
        )
      ))}
      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8 w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
                  <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                    <input
                      type="text"
                      name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                      <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                  <div>
                <label className="block text-sm font-medium mb-1">Product URL</label>
                    <input
                      type="text"
                  name="url"
                  value={form.url}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                    />
                  </div>
                    <div>
                <label className="block text-sm font-medium mb-1">Site</label>
                      <select
                  name="site"
                  value={form.site}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select Site</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Flipkart">Flipkart</option>
                      </select>
                    </div>
              <div>
                <label className="block text-sm font-medium mb-1">Current Price</label>
                      <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
                    </div>
              <div className="flex justify-end space-x-2 mt-6">
                  <button
                    type="button"
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                  Save
                  </button>
                </div>
              </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement; 