import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiShoppingCart, FiHeart, FiUser, FiBell, FiMenu, FiX,
  FiSun, FiMoon, FiMic, FiChevronDown, FiGlobe, FiDollarSign,
  FiTrendingUp, FiSettings, FiPackage, FiLogOut
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useThemeStore } from '@/store/themeStore';
import { useSearchStore } from '@/store/searchStore';
import { categories } from '@/data';
import { notifications } from '@/data';

const languages = ['English', 'हिंदी', 'தமிழ்', 'తెలుగు', 'বাংলা'];
const currencies = ['INR ₹', 'USD $', 'EUR €', 'GBP £'];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [selectedCurrency, setSelectedCurrency] = useState('INR ₹');

  const { items: cartItems, getItemCount } = useCartStore();
  const { items: wishItems } = useWishlistStore();
  const { isDark, toggle } = useThemeStore();
  const { query, setQuery, search, isListening, toggleListening, isOpen: searchOpen, openSearch, closeSearch, results, recentSearches } = useSearchStore();

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaMenu(false);
  }, [location]);

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    search(val);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="dark:bg-dark-surface bg-slate-800 text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <HiSparkles className="text-amber-400 w-3 h-3" />
              <span>Free delivery on orders over ₹999</span>
            </span>
            <span className="dark:text-slate-400 text-slate-400">|</span>
            <span>Download the SumitXShop App</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => { setLangOpen(!langOpen); setCurrencyOpen(false); }}
                className="flex items-center gap-1 hover:text-primary-300 transition-colors"
              >
                <FiGlobe className="w-3 h-3" />
                {selectedLang}
                <FiChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute top-full right-0 mt-1 dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 rounded-xl py-1 shadow-xl z-50 min-w-[120px]"
                  >
                    {languages.map(lang => (
                      <button key={lang} onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
                        className="block w-full text-left px-3 py-1.5 dark:text-slate-300 text-slate-700 dark:hover:bg-dark-muted hover:bg-slate-100 transition-colors"
                      >
                        {lang}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => { setCurrencyOpen(!currencyOpen); setLangOpen(false); }}
                className="flex items-center gap-1 hover:text-primary-300 transition-colors"
              >
                <FiDollarSign className="w-3 h-3" />
                {selectedCurrency}
                <FiChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {currencyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute top-full right-0 mt-1 dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 rounded-xl py-1 shadow-xl z-50 min-w-[100px]"
                  >
                    {currencies.map(cur => (
                      <button key={cur} onClick={() => { setSelectedCurrency(cur); setCurrencyOpen(false); }}
                        className="block w-full text-left px-3 py-1.5 dark:text-slate-300 text-slate-700 dark:hover:bg-dark-muted hover:bg-slate-100 transition-colors"
                      >
                        {cur}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'dark:bg-dark-surface/95 bg-white/95 backdrop-blur-xl shadow-card-dark border-b dark:border-dark-border border-slate-200'
            : 'dark:bg-dark-surface bg-white border-b dark:border-dark-border border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center shadow-glow-primary">
                <HiSparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black gradient-text hidden sm:block font-display">SumitXShop</span>
            </Link>

            {/* Categories Mega Menu Trigger */}
            <div
              className="relative hidden lg:block"
              onMouseEnter={() => setMegaMenu(true)}
              onMouseLeave={() => setMegaMenu(false)}
            >
              <button className="flex items-center gap-1.5 dark:text-slate-300 text-slate-700 hover:text-primary-500 dark:hover:text-primary-400 font-medium text-sm transition-colors px-3 py-2 rounded-xl dark:hover:bg-dark-card hover:bg-slate-100">
                <FiMenu className="w-4 h-4" />
                All Categories
                <FiChevronDown className={`w-3 h-3 transition-transform ${megaMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu */}
              <AnimatePresence>
                {megaMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-[680px] dark:bg-dark-surface bg-white border dark:border-dark-border border-slate-200 rounded-2xl shadow-2xl p-6 grid grid-cols-3 gap-2"
                  >
                    {categories.map(cat => (
                      <Link
                        key={cat.id}
                        to={`/products?category=${cat.slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl dark:hover:bg-dark-card hover:bg-slate-100 transition-all group"
                      >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white text-lg">🛒</span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold dark:text-white text-slate-800 group-hover:text-primary-500 transition-colors">{cat.name}</div>
                          <div className="text-xs dark:text-slate-400 text-slate-500">{cat.productCount.toLocaleString()} items</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl relative" ref={searchRef}>
              <div className="relative flex items-center">
                <FiSearch className="absolute left-3 w-4 h-4 dark:text-slate-400 text-slate-500 z-10" />
                <input
                  type="text"
                  value={query}
                  onChange={handleSearchChange}
                  onFocus={openSearch}
                  placeholder="Search for products, brands, categories..."
                  className="w-full pl-10 pr-20 py-2.5 dark:bg-dark-card bg-slate-100 dark:text-white text-slate-800 rounded-xl border dark:border-dark-border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:placeholder-slate-400 placeholder-slate-500 text-sm transition-all"
                />
                <div className="absolute right-2 flex items-center gap-1">
                  <button
                    onClick={toggleListening}
                    className={`p-1.5 rounded-lg transition-all ${isListening ? 'text-red-400 bg-red-500/10 animate-pulse' : 'dark:text-slate-400 text-slate-500 dark:hover:bg-dark-muted hover:bg-slate-200'}`}
                    title="Voice Search"
                  >
                    <FiMic className="w-3.5 h-3.5" />
                  </button>
                  <button className="px-2 py-1 bg-primary-500 text-white rounded-lg text-xs font-semibold hover:bg-primary-600 transition-colors">
                    Search
                  </button>
                </div>
              </div>

              {/* Search Dropdown */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute top-full left-0 right-0 mt-2 dark:bg-dark-surface bg-white border dark:border-dark-border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    {results.length > 0 ? (
                      <div>
                        <div className="px-4 pt-3 pb-1 text-xs font-semibold dark:text-slate-400 text-slate-500 uppercase tracking-wider">Search Results</div>
                        {results.map(product => (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            onClick={closeSearch}
                            className="flex items-center gap-3 px-4 py-2.5 dark:hover:bg-dark-card hover:bg-slate-100 transition-colors"
                          >
                            <img src={product.thumbnail} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium dark:text-white text-slate-800 line-clamp-1">{product.name}</div>
                              <div className="text-xs dark:text-slate-400 text-slate-500">{product.brand} · ₹{product.price.toLocaleString()}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : query ? (
                      <div className="p-6 text-center dark:text-slate-400 text-slate-500 text-sm">No results for "{query}"</div>
                    ) : (
                      <div className="p-4">
                        <div className="text-xs font-semibold dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-2">Recent Searches</div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map(s => (
                            <button
                              key={s}
                              onClick={() => { setQuery(s); search(s); }}
                              className="px-3 py-1 text-sm dark:bg-dark-card bg-slate-100 dark:text-slate-300 text-slate-600 rounded-full dark:hover:bg-dark-muted hover:bg-slate-200 transition-colors flex items-center gap-1"
                            >
                              <FiSearch className="w-3 h-3" />
                              {s}
                            </button>
                          ))}
                        </div>
                        <div className="mt-3 text-xs font-semibold dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-2">Trending</div>
                        <div className="flex flex-wrap gap-2">
                          {['iPhone 15', 'Headphones', 'Running Shoes', 'Laptops'].map(t => (
                            <button
                              key={t}
                              onClick={() => { setQuery(t); search(t); }}
                              className="px-3 py-1 text-sm bg-primary-500/10 text-primary-400 rounded-full hover:bg-primary-500/20 transition-colors flex items-center gap-1"
                            >
                              <FiTrendingUp className="w-3 h-3" />
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1.5">
              {/* Theme Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggle}
                className="p-2 rounded-xl dark:hover:bg-dark-card hover:bg-slate-100 transition-colors dark:text-slate-300 text-slate-600"
                title="Toggle Theme"
              >
                {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </motion.button>

              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { setNotifOpen(!notifOpen); setUserMenuOpen(false); }}
                  className="p-2 rounded-xl dark:hover:bg-dark-card hover:bg-slate-100 transition-colors dark:text-slate-300 text-slate-600 relative"
                >
                  <FiBell className="w-5 h-5" />
                  {unreadNotifCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {unreadNotifCount}
                    </span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-80 dark:bg-dark-surface bg-white border dark:border-dark-border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b dark:border-dark-border border-slate-200 flex items-center justify-between">
                        <h3 className="font-bold dark:text-white text-slate-800">Notifications</h3>
                        <span className="text-xs text-primary-400 cursor-pointer hover:underline">Mark all read</span>
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.map(n => (
                          <div key={n.id} className={`flex gap-3 px-4 py-3 border-b dark:border-dark-border/50 border-slate-100 dark:hover:bg-dark-card hover:bg-slate-50 cursor-pointer transition-colors ${!n.read ? 'dark:bg-dark-card/50 bg-primary-50/50' : ''}`}>
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm ${n.type === 'order' ? 'bg-emerald-500/20 text-emerald-400' : n.type === 'promo' ? 'bg-amber-500/20 text-amber-400' : 'bg-primary-500/20 text-primary-400'}`}>
                              {n.type === 'order' ? '📦' : n.type === 'promo' ? '🎉' : n.type === 'review' ? '⭐' : '🔔'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium dark:text-white text-slate-800 flex items-center gap-2">
                                {n.title}
                                {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />}
                              </div>
                              <div className="text-xs dark:text-slate-400 text-slate-500 line-clamp-2">{n.message}</div>
                              <div className="text-xs dark:text-slate-500 text-slate-400 mt-0.5">{n.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative p-2 rounded-xl dark:hover:bg-dark-card hover:bg-slate-100 transition-colors dark:text-slate-300 text-slate-600">
                <FiHeart className="w-5 h-5" />
                {wishItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 rounded-xl dark:hover:bg-dark-card hover:bg-slate-100 transition-colors dark:text-slate-300 text-slate-600">
                <FiShoppingCart className="w-5 h-5" />
                {getItemCount() > 0 && (
                  <motion.span
                    key={getItemCount()}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                  >
                    {getItemCount()}
                  </motion.span>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifOpen(false); }}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-xl dark:hover:bg-dark-card hover:bg-slate-100 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center">
                    <FiUser className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium dark:text-slate-300 text-slate-700 hidden lg:block">Account</span>
                  <FiChevronDown className={`w-3 h-3 dark:text-slate-400 text-slate-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''} hidden lg:block`} />
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-56 dark:bg-dark-surface bg-white border dark:border-dark-border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden py-2"
                    >
                      <div className="px-4 py-3 border-b dark:border-dark-border border-slate-100">
                        <div className="text-sm font-bold dark:text-white text-slate-800">Arjun Sharma</div>
                        <div className="text-xs dark:text-slate-400 text-slate-500">arjun@email.com</div>
                      </div>
                      {[
                        { icon: <FiUser />, label: 'My Profile', to: '/dashboard/user' },
                        { icon: <FiPackage />, label: 'My Orders', to: '/dashboard/user' },
                        { icon: <FiHeart />, label: 'Wishlist', to: '/wishlist' },
                        { icon: <FiTrendingUp />, label: 'Seller Dashboard', to: '/dashboard/seller' },
                        { icon: <FiSettings />, label: 'Admin Panel', to: '/dashboard/admin' },
                        { icon: <FiSettings />, label: 'Settings', to: '/dashboard/user' },
                      ].map(item => (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 dark:text-slate-300 text-slate-700 dark:hover:bg-dark-card hover:bg-slate-100 transition-colors text-sm"
                        >
                          <span className="dark:text-slate-400 text-slate-500">{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t dark:border-dark-border border-slate-100 mt-2 pt-2">
                        <button className="flex items-center gap-3 px-4 py-2.5 text-red-400 dark:hover:bg-dark-card hover:bg-slate-100 transition-colors w-full text-sm">
                          <FiLogOut />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl dark:hover:bg-dark-card hover:bg-slate-100 transition-colors dark:text-slate-300 text-slate-600"
              >
                {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-1 pb-2 overflow-x-auto scrollbar-hide">
            {[
              { label: 'Today\'s Deals', to: '/products?sort=discount', hot: true },
              { label: 'Electronics', to: '/products?category=electronics' },
              { label: 'Fashion', to: '/products?category=fashion' },
              { label: 'Home & Kitchen', to: '/products?category=home' },
              { label: 'Sports', to: '/products?category=sports' },
              { label: 'Beauty', to: '/products?category=beauty' },
              { label: 'Books', to: '/products?category=books' },
              { label: 'Compare', to: '/compare' },
              { label: 'Sell on SumitXShop', to: '/dashboard/seller' },
            ].map(link => (
              <Link
                key={link.label}
                to={link.to}
                className={`flex-shrink-0 px-3 py-1 text-sm rounded-lg transition-colors font-medium
                  ${link.hot ? 'text-amber-400 hover:bg-amber-500/10' : 'dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-dark-card hover:bg-slate-100'}
                `}
              >
                {link.label}
                {link.hot && <span className="ml-1 text-[9px] bg-red-500 text-white px-1 py-0.5 rounded font-bold">HOT</span>}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden dark:bg-dark-surface bg-white border-t dark:border-dark-border border-slate-200 overflow-hidden"
            >
              <div className="p-4 space-y-1">
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.slug}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl dark:hover:bg-dark-card hover:bg-slate-100 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
                      <span className="text-white text-sm">🛒</span>
                    </div>
                    <span className="dark:text-white text-slate-800 font-medium text-sm">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-30" onClick={closeSearch} />
      )}
    </>
  );
};

export default Navbar;
