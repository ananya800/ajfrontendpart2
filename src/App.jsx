import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import ReturnPolicy from "./pages/ReturnPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclosure from "./pages/Disclosure";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Premium from "./pages/Premium";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

// Admin imports
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/product/:product_id" element={<ProductDetail />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/disclosure" element={<Disclosure />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/premium" element={<Premium />} />
      <Route path="/profile" element={<Profile />} />
      
      {/* Admin Routes - Bypassing login for now */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="" element={<AdminDashboard />} /> {/* Default route */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="users/premium" element={<UserManagement />} />
        <Route path="users/banned" element={<UserManagement />} />
        <Route path="products" element={<div>Products Management</div>} />
        <Route path="products/add" element={<div>Add Product</div>} />
        <Route path="products/categories" element={<div>Categories Management</div>} />
        <Route path="alerts" element={<div>Alerts Management</div>} />
        <Route path="premium" element={<div>Premium Management</div>} />
        <Route path="support" element={<div>Support Management</div>} />
        <Route path="settings" element={<div>Settings</div>} />
        <Route path="settings/admins" element={<div>Admin Users</div>} />
        <Route path="settings/api-keys" element={<div>API Keys</div>} />
      </Route>
    </Routes>
      
      {!isAuthRoute && !isAdminRoute && <Footer />}
      
      {/* Floating Theme Button - only show on user routes */}
      {!isAdminRoute && (
        <button
          onClick={toggleTheme}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 text-yellow-500 dark:text-blue-400 border-2 border-yellow-300 dark:border-blue-700 hover:scale-110 transition-all duration-200"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
        </button>
      )}
    </>
  );
}

export default App;
