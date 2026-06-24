import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiShoppingCart, FiHeart, FiStar, FiZap, FiCpu, FiTrendingUp } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { products } from '@/data';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import type { Product } from '@/types';

const categories = [
  { key: 'all',         label: '✨ For You',     icon: <HiSparkles className="w-3.5 h-3.5" /> },
  { key: 'electronics', label: '💻 Electronics', icon: null },
  { key: 'fashion',     label: '👗 Fashion',     icon: null },
  { key: 'sports',      label: '⚽ Sports',      icon: null },
];

// Reasons the AI "recommends" each product (cycled for demo)
const aiReasons = [
  'Matches your interest in tech',
  'Top pick this week',
  'Based on your cart history',
  'Trending near you',
];

const RecommendCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [added, setAdded] = useState(false);
  const inWish = isInWishlist(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
  };

  const matchScore = 98 - index * 3;
  const reason = aiReasons[index % aiReasons.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.09, duration: 0.45 }}
      whileHover={{ y: -5 }}
      className="group relative dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 overflow-hidden hover:shadow-premium-light dark:hover:shadow-premium dark:hover:border-primary-500/25 transition-all duration-300"
    >
      <Link to={`/product/${product.id}`}>
        {/* Image */}
        <div className="relative aspect-square overflow-hidden dark:bg-dark-surface bg-slate-100">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* AI Match Badge */}
          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-primary-500 to-violet-500 text-white text-[10px] font-bold shadow-glow-primary-sm">
              <FiCpu className="w-2.5 h-2.5" />
              {matchScore}% match
            </div>
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleWish}
              className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm transition-all
                ${inWish ? 'bg-red-500 text-white' : 'dark:bg-dark-surface/90 bg-white/90 dark:text-slate-300 text-slate-700 hover:bg-red-500 hover:text-white'}`}
            >
              <FiHeart className={`w-3.5 h-3.5 ${inWish ? 'fill-current' : ''}`} />
            </motion.button>
          </div>

          {/* Add to cart slide-up */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAdd}
              className={`w-full py-2.5 text-sm font-bold flex items-center justify-center gap-2 transition-all
                ${added ? 'bg-emerald-500 text-white' : 'bg-gradient-to-r from-primary-500 to-violet-500 text-white'}`}
            >
              <FiShoppingCart className="w-4 h-4" />
              {added ? '✓ Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          {/* AI Reason chip */}
          <div className="flex items-center gap-1.5 mb-2">
            <HiSparkles className="w-3 h-3 text-primary-400" />
            <span className="text-[10px] font-semibold text-primary-400">{reason}</span>
          </div>

          <div className="text-xs font-semibold dark:text-primary-400 text-primary-600 mb-1">{product.brand}</div>
          <h3 className="text-sm font-semibold dark:text-white text-slate-800 line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-2">
            <FiStar className="w-3 h-3 text-amber-400 fill-current" />
            <span className="text-xs font-medium text-amber-400">{product.rating}</span>
            <span className="text-xs dark:text-slate-500 text-slate-400">({product.reviewCount.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-black dark:text-white text-slate-900 text-base">₹{product.price.toLocaleString('en-IN')}</span>
            {product.discount > 0 && (
              <>
                <span className="text-xs dark:text-slate-500 text-slate-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                <span className="text-xs font-bold text-emerald-400">{product.discount}% off</span>
              </>
            )}
          </div>
          {product.freeShipping && (
            <div className="text-[10px] text-emerald-400 font-medium mt-1">✓ Free Delivery</div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

const AIRecommendations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const getProducts = (): Product[] => {
    if (activeTab === 'all') return products.filter(p => p.isFeatured).slice(0, 8);
    return products.filter(p => p.category === activeTab && p.isFeatured).slice(0, 8);
  };

  const displayProducts = getProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-8"
        style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1e1b4b 50%, #2d1f7a 100%)' }}
      >
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20" style={{ background: '#6366f1', transform: 'translate(20%, -20%)' }} />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            {/* Animated AI Icon */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center shadow-glow-primary flex-shrink-0"
            >
              <FiCpu className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-black text-white font-display">AI-Powered For You</h2>
                <span className="px-2 py-0.5 text-[10px] font-black bg-primary-500/30 text-primary-300 rounded-full border border-primary-500/40 tracking-wider">BETA</span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm">
                Our AI analyses your browsing patterns to find products you'll love — updated in real time.
              </p>
              <div className="flex items-center gap-3 mt-2">
                {[
                  { icon: <FiTrendingUp className="w-3 h-3" />, label: 'Live trends' },
                  { icon: <HiSparkles className="w-3 h-3" />, label: 'Personalised' },
                  { icon: <FiZap className="w-3 h-3" />, label: 'Best prices' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-1 text-primary-400 text-xs font-medium">
                    {item.icon} {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link to="/products" className="flex items-center gap-1.5 text-primary-300 hover:text-white text-sm font-semibold transition-colors whitespace-nowrap group">
            See All <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Tabs inside banner */}
        <div className="relative mt-5 flex items-center gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === cat.key
                  ? 'bg-primary-500 text-white shadow-glow-primary-sm'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white border border-white/10'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Product Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {displayProducts.map((product, i) => (
            <RecommendCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default AIRecommendations;
