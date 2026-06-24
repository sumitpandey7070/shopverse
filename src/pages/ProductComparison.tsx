import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus, FiShoppingCart, FiStar, FiCheck, FiMinus, FiArrowLeft, FiSearch } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { products } from '@/data';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types';

const MAX_COMPARE = 4;

const specKeys = [
  'Display', 'Processor', 'RAM', 'Storage', 'Camera', 'Battery',
  'OS', 'Connectivity', 'Weight', 'Driver', 'Material', 'Capacity',
];

const CompareCell: React.FC<{ value: string | undefined; highlight?: boolean }> = ({ value, highlight }) => (
  <div className={`py-3 px-4 text-sm text-center transition-colors ${
    highlight
      ? 'dark:text-emerald-400 text-emerald-600 font-semibold'
      : value
        ? 'dark:text-slate-300 text-slate-700'
        : 'dark:text-slate-600 text-slate-400'
  }`}>
    {value || '—'}
  </div>
);

const ProductComparison: React.FC = () => {
  const [selected, setSelected] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { addItem } = useCartStore();

  const searchResults = products.filter(p =>
    !selected.find(s => s.id === p.id) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6);

  const addToCompare = (product: Product) => {
    if (selected.length >= MAX_COMPARE) return;
    setSelected(prev => [...prev, product]);
    setSearchQuery('');
    setShowSearch(false);
  };

  const removeFromCompare = (id: string) => {
    setSelected(prev => prev.filter(p => p.id !== id));
  };

  // Find which spec value appears most — highlight unique/best
  const getHighlightCol = (key: string): number => {
    const vals = selected.map(p => p.specifications?.[key]);
    // Just highlight the first non-null for demo
    const firstValid = vals.findIndex(v => v);
    return firstValid;
  };

  // Specs that at least one selected product has
  const activeSpecs = specKeys.filter(key =>
    selected.some(p => p.specifications?.[key])
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen dark:bg-dark-bg bg-slate-50"
    >
      {/* Header */}
      <div className="dark:bg-dark-surface bg-white border-b dark:border-dark-border border-slate-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to="/products" className="p-2 rounded-xl dark:hover:bg-dark-card hover:bg-slate-100 dark:text-slate-400 text-slate-600 transition-colors">
                <FiArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-black dark:text-white text-slate-900 font-display">
                  Product Comparison
                </h1>
                <p className="text-xs dark:text-slate-400 text-slate-500">
                  Compare up to {MAX_COMPARE} products side by side
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full dark:bg-primary-500/10 bg-primary-50 border dark:border-primary-500/20 border-primary-200 text-primary-500 text-xs font-semibold">
                <HiSparkles className="w-3 h-3" />
                {selected.length}/{MAX_COMPARE} products
              </div>
              {selected.length > 0 && (
                <button
                  onClick={() => setSelected([])}
                  className="text-xs dark:text-slate-400 text-slate-600 hover:text-red-400 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Product Slots Row */}
        <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `200px repeat(${Math.max(selected.length, 1) + (selected.length < MAX_COMPARE ? 1 : 0)}, 1fr)` }}>
          {/* Empty label cell */}
          <div />

          {/* Selected Product Cards */}
          {selected.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-4 text-center overflow-hidden group"
            >
              {/* Remove button */}
              <button
                onClick={() => removeFromCompare(product.id)}
                className="absolute top-2 right-2 w-6 h-6 rounded-lg dark:bg-dark-muted bg-slate-100 flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>

              <Link to={`/product/${product.id}`}>
                <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden mb-3 dark:bg-dark-surface bg-slate-100">
                  <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform" />
                </div>
                <div className="text-xs font-semibold text-primary-400 mb-1">{product.brand}</div>
                <h3 className="text-sm font-bold dark:text-white text-slate-900 line-clamp-2 mb-2">{product.name}</h3>
              </Link>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-2">
                <FiStar className="w-3 h-3 text-amber-400 fill-current" />
                <span className="text-xs font-medium text-amber-400">{product.rating}</span>
                <span className="text-xs dark:text-slate-500 text-slate-400">({product.reviewCount})</span>
              </div>

              {/* Price */}
              <div className="text-base font-black dark:text-white text-slate-900 mb-3">
                ₹{product.price.toLocaleString('en-IN')}
                {product.discount > 0 && (
                  <span className="ml-1.5 text-xs text-emerald-400 font-semibold">{product.discount}% off</span>
                )}
              </div>

              <button
                onClick={() => addItem(product)}
                className="w-full py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-primary-500 to-violet-500 text-white hover:shadow-glow-primary-sm transition-all"
              >
                <FiShoppingCart className="w-3.5 h-3.5 inline mr-1" />
                Add to Cart
              </button>
            </motion.div>
          ))}

          {/* Add Product Slot */}
          {selected.length < MAX_COMPARE && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="w-full h-full min-h-[200px] rounded-2xl border-2 border-dashed dark:border-dark-border border-slate-300 hover:border-primary-500/50 flex flex-col items-center justify-center gap-3 transition-all dark:hover:bg-dark-card hover:bg-primary-50 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiPlus className="w-6 h-6 text-primary-400" />
                </div>
                <div className="text-sm font-semibold dark:text-slate-400 text-slate-600 group-hover:text-primary-400 transition-colors">
                  Add Product
                </div>
                <div className="text-xs dark:text-slate-500 text-slate-400">
                  {MAX_COMPARE - selected.length} slot{MAX_COMPARE - selected.length !== 1 ? 's' : ''} remaining
                </div>
              </button>

              {/* Search Dropdown */}
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute top-full left-0 right-0 mt-2 dark:bg-dark-surface bg-white rounded-2xl border dark:border-dark-border border-slate-200 shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-3 border-b dark:border-dark-border border-slate-100">
                      <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-slate-400 text-slate-400" />
                        <input
                          autoFocus
                          type="text"
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          placeholder="Search products..."
                          className="w-full pl-9 pr-4 py-2.5 dark:bg-dark-card bg-slate-100 rounded-xl text-sm dark:text-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 dark:placeholder-slate-400 placeholder-slate-400"
                        />
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {(searchQuery ? searchResults : products.filter(p => !selected.find(s => s.id === p.id)).slice(0, 8)).map(product => (
                        <button
                          key={product.id}
                          onClick={() => addToCompare(product)}
                          className="w-full flex items-center gap-3 px-4 py-3 dark:hover:bg-dark-card hover:bg-slate-50 transition-colors text-left border-b dark:border-dark-border/50 border-slate-100 last:border-0"
                        >
                          <img src={product.thumbnail} alt={product.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-primary-400">{product.brand}</div>
                            <div className="text-sm font-medium dark:text-white text-slate-800 truncate">{product.name}</div>
                            <div className="text-xs dark:text-slate-400 text-slate-500">₹{product.price.toLocaleString('en-IN')}</div>
                          </div>
                          <FiPlus className="w-4 h-4 text-primary-400 flex-shrink-0" />
                        </button>
                      ))}
                      {searchQuery && searchResults.length === 0 && (
                        <div className="p-6 text-center text-sm dark:text-slate-400 text-slate-500">No products found</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Empty State */}
        {selected.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center mx-auto mb-6 shadow-glow-primary">
              <HiSparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-black dark:text-white text-slate-900 mb-3 font-display">Compare Products</h2>
            <p className="dark:text-slate-400 text-slate-600 mb-6 max-w-sm mx-auto text-sm">
              Add up to {MAX_COMPARE} products to compare their specs, prices, and features side by side.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-violet-500 text-white font-bold text-sm hover:shadow-glow-primary transition-all"
            >
              Browse Products <FiArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </motion.div>
        )}

        {/* Comparison Table */}
        {selected.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 overflow-hidden"
          >
            {/* Table header (sticky) */}
            <div className="grid border-b dark:border-dark-border border-slate-200 dark:bg-dark-surface bg-slate-50" style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}>
              <div className="py-3 px-4 text-xs font-bold uppercase tracking-wider dark:text-slate-400 text-slate-500">Specification</div>
              {selected.map(p => (
                <div key={p.id} className="py-3 px-4 text-xs font-bold dark:text-white text-slate-900 text-center truncate">{p.name}</div>
              ))}
            </div>

            {/* Basic Rows */}
            {[
              { label: 'Price', render: (p: Product) => <span className="font-black gradient-text">₹{p.price.toLocaleString('en-IN')}</span> },
              { label: 'Rating', render: (p: Product) => (
                <div className="flex items-center justify-center gap-1">
                  <FiStar className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  <span className="font-semibold text-amber-400">{p.rating}</span>
                  <span className="dark:text-slate-500 text-slate-400 text-xs">({p.reviewCount})</span>
                </div>
              )},
              { label: 'Discount', render: (p: Product) => p.discount > 0
                ? <span className="text-emerald-400 font-semibold">{p.discount}% off</span>
                : <span className="dark:text-slate-500 text-slate-400">—</span>
              },
              { label: 'Free Shipping', render: (p: Product) => p.freeShipping
                ? <FiCheck className="w-4 h-4 text-emerald-400 mx-auto" />
                : <FiMinus className="w-4 h-4 dark:text-slate-600 text-slate-300 mx-auto" />
              },
              { label: 'Availability', render: (p: Product) => (
                <span className={p.stock > 0 ? 'text-emerald-400 font-medium' : 'text-red-400'}>
                  {p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}
                </span>
              )},
              { label: 'Brand', render: (p: Product) => <span className="font-semibold text-primary-400">{p.brand}</span> },
              { label: 'Category', render: (p: Product) => <span className="capitalize dark:text-slate-300 text-slate-700">{p.category}</span> },
            ].map((row, ri) => (
              <div key={row.label} className={`grid border-b dark:border-dark-border border-slate-100 ${ri % 2 === 0 ? 'dark:bg-dark-surface/30 bg-slate-50/50' : ''}`} style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}>
                <div className="py-3 px-4 text-sm font-semibold dark:text-slate-400 text-slate-600 flex items-center">{row.label}</div>
                {selected.map(p => (
                  <div key={p.id} className="py-3 px-4 text-sm text-center flex items-center justify-center">{row.render(p)}</div>
                ))}
              </div>
            ))}

            {/* Spec divider */}
            {activeSpecs.length > 0 && (
              <div className="px-4 py-2 dark:bg-dark-surface/60 bg-slate-100 border-b dark:border-dark-border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-widest dark:text-slate-400 text-slate-500">Technical Specifications</span>
              </div>
            )}

            {/* Spec Rows */}
            {activeSpecs.map((key, ri) => (
              <div key={key} className={`grid border-b dark:border-dark-border border-slate-100 last:border-0 ${ri % 2 === 0 ? 'dark:bg-dark-surface/30 bg-slate-50/50' : ''}`} style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}>
                <div className="py-3 px-4 text-sm font-semibold dark:text-slate-400 text-slate-600 flex items-center">{key}</div>
                {selected.map((p, ci) => (
                  <CompareCell key={p.id} value={p.specifications?.[key]} />
                ))}
              </div>
            ))}
          </motion.div>
        )}

        {/* Browse Products Section */}
        {selected.length < MAX_COMPARE && (
          <div className="mt-10">
            <h3 className="text-base font-black dark:text-white text-slate-900 mb-4">Popular Products to Compare</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {products.filter(p => !selected.find(s => s.id === p.id)).slice(0, 12).map((product, i) => (
                <motion.button
                  key={product.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => addToCompare(product)}
                  className="group dark:bg-dark-card bg-white rounded-xl border dark:border-dark-border border-slate-200 p-3 text-left hover:border-primary-500/40 dark:hover:border-primary-500/40 hover:shadow-glow-primary-sm transition-all"
                >
                  <div className="aspect-square rounded-lg overflow-hidden dark:bg-dark-surface bg-slate-100 mb-2">
                    <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-[10px] text-primary-400 font-semibold mb-0.5">{product.brand}</div>
                  <div className="text-xs font-semibold dark:text-white text-slate-800 line-clamp-2 leading-tight mb-1.5">{product.name}</div>
                  <div className="text-xs font-black dark:text-white text-slate-900">₹{product.price.toLocaleString('en-IN')}</div>
                  <div className="mt-2 w-full py-1.5 rounded-lg bg-primary-500/10 text-primary-400 text-[10px] font-bold flex items-center justify-center gap-1 group-hover:bg-primary-500 group-hover:text-white transition-all">
                    <FiPlus className="w-3 h-3" /> Compare
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close search */}
      {showSearch && <div className="fixed inset-0 z-40" onClick={() => setShowSearch(false)} />}
    </motion.div>
  );
};

export default ProductComparison;
