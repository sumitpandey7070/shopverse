import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Home from '@/pages/Home';
import ProductListing from '@/pages/ProductListing';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Wishlist from '@/pages/Wishlist';
import UserDashboard from '@/pages/UserDashboard';
import SellerDashboard from '@/pages/SellerDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import ProductComparison from '@/pages/ProductComparison';
import { useThemeStore } from '@/store/themeStore';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
};

const NotFound: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="max-w-xl mx-auto px-4 py-32 text-center"
  >
    {/* Animated 404 */}
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="text-8xl mb-8 select-none"
    >
      🛍️
    </motion.div>

    {/* Gradient heading */}
    <h1 className="text-5xl font-black font-display mb-4">
      <span className="gradient-text">404</span>
    </h1>
    <h2 className="text-2xl font-black dark:text-white text-slate-900 mb-3">Page Not Found</h2>
    <p className="dark:text-slate-400 text-slate-600 mb-8 text-sm leading-relaxed">
      The page you're looking for doesn't exist or has been moved.
      Let's get you back to shopping!
    </p>

    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-violet-500 text-white font-bold text-sm hover:shadow-glow-primary transition-all"
      >
        Go Home
      </Link>
      <Link
        to="/products"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 dark:text-slate-300 text-slate-700 font-semibold text-sm hover:border-primary-500/40 transition-all"
      >
        <FiArrowLeft className="w-4 h-4 rotate-180" />
        Browse Products
      </Link>
    </div>
  </motion.div>
);

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/compare" element={<ProductComparison />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/seller" element={<SellerDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const { isDark, setDark } = useThemeStore();

  useEffect(() => {
    setDark(true); // Start in dark mode
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col dark:bg-dark-bg bg-slate-50 transition-colors duration-300">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
