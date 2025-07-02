import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/disclosure" element={<Disclosure />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/premium" element={<div className='max-w-2xl mx-auto py-10 px-4'><h1 className='text-3xl font-bold mb-4'>Premium</h1><p className='text-gray-700 dark:text-gray-200'>This is the Premium page. Add your premium features or subscription info here.</p></div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
