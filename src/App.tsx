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
import { useThemeStore } from '@/store/themeStore';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
};

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
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/seller" element={<SellerDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="*" element={
          <div className="max-w-7xl mx-auto px-4 py-32 text-center">
            <div className="text-8xl mb-8">🛍️</div>
            <h1 className="text-4xl font-black dark:text-white text-slate-900 mb-4">Page Not Found</h1>
            <p className="dark:text-slate-400 text-slate-600 mb-8">The page you're looking for doesn't exist.</p>
            <a href="/" className="px-8 py-3 bg-gradient-to-r from-primary-500 to-violet-500 text-white rounded-xl font-bold hover:shadow-glow-primary transition-all inline-block">
              Go Home
            </a>
          </div>
        } />
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
