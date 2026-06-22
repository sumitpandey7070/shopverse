import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiGrid, FiList, FiChevronDown, FiX, FiSearch, FiSliders } from 'react-icons/fi';
import { products, categories, brands } from '@/data';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/product/QuickViewModal';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import type { Product, FilterState, ViewMode } from '@/types';
import { FaStar } from 'react-icons/fa';

const sortOptions = [
  { label: 'Popularity', value: 'popular' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Biggest Discount', value: 'discount' },
];

const ITEMS_PER_PAGE = 12;

const ProductListing: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [page, setPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: searchParams.get('category') ? [searchParams.get('category')!] : [],
    brands: [],
    priceMin: 0,
    priceMax: 200000,
    rating: 0,
    inStock: false,
    freeShipping: false,
  });
  const [priceRange, setPriceRange] = useState([0, 200000]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(f => ({ ...f, [key]: value }));
    setPage(1);
  };

  const toggleArrayFilter = (key: 'categories' | 'brands', value: string) => {
    setFilters(f => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter(v => v !== value) : [...f[key], value],
    }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ categories: [], brands: [], priceMin: 0, priceMax: 200000, rating: 0, inStock: false, freeShipping: false });
    setPriceRange([0, 200000]);
    setPage(1);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    const q = searchParams.get('q');
    if (q) result = result.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.brand.toLowerCase().includes(q.toLowerCase()));
    if (filters.categories.length) result = result.filter(p => filters.categories.includes(p.category));
    if (filters.brands.length) result = result.filter(p => filters.brands.includes(p.brand));
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (filters.rating > 0) result = result.filter(p => p.rating >= filters.rating);
    if (filters.inStock) result = result.filter(p => p.stock > 0);
    if (filters.freeShipping) result = result.filter(p => p.freeShipping);

    switch (sortBy) {
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'discount': result.sort((a, b) => b.discount - a.discount); break;
    }

    return result;
  }, [filters, sortBy, priceRange, searchParams]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const activeFiltersCount = filters.categories.length + filters.brands.length + (filters.rating > 0 ? 1 : 0) + (filters.inStock ? 1 : 0) + (filters.freeShipping ? 1 : 0);

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Clear All */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold dark:text-white text-slate-800">{activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active</span>
          <button onClick={clearFilters} className="text-xs text-primary-400 hover:text-primary-300 font-semibold">Clear All</button>
        </div>
      )}

      {/* Categories */}
      <div>
        <h4 className="font-bold text-sm dark:text-white text-slate-800 mb-3 flex items-center gap-2">
          <FiFilter className="w-4 h-4" /> Categories
        </h4>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat.slug)}
                  onChange={() => toggleArrayFilter('categories', cat.slug)}
                  className="w-4 h-4 rounded accent-primary-500"
                />
                <span className="text-sm dark:text-slate-300 text-slate-700 group-hover:text-primary-400 transition-colors">{cat.name}</span>
              </div>
              <span className="text-xs dark:text-slate-500 text-slate-400">{cat.productCount.toLocaleString()}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-bold text-sm dark:text-white text-slate-800 mb-3">Price Range</h4>
        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <div className="text-xs dark:text-slate-400 text-slate-500 mb-1">Min</div>
            <input
              type="number"
              value={priceRange[0]}
              onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
              className="w-full px-2 py-1.5 text-sm dark:bg-dark-card bg-slate-100 rounded-lg border dark:border-dark-border border-slate-200 dark:text-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="₹0"
            />
          </div>
          <div className="flex-1">
            <div className="text-xs dark:text-slate-400 text-slate-500 mb-1">Max</div>
            <input
              type="number"
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], +e.target.value])}
              className="w-full px-2 py-1.5 text-sm dark:bg-dark-card bg-slate-100 rounded-lg border dark:border-dark-border border-slate-200 dark:text-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="₹200000"
            />
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={200000}
          value={priceRange[1]}
          onChange={e => setPriceRange([priceRange[0], +e.target.value])}
          className="w-full"
        />
        <div className="flex justify-between text-xs dark:text-slate-400 text-slate-500 mt-1">
          <span>₹0</span>
          <span>₹2,00,000</span>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="font-bold text-sm dark:text-white text-slate-800 mb-3">Brands</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
          {brands.map(b => (
            <label key={b.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.brands.includes(b.name)}
                onChange={() => toggleArrayFilter('brands', b.name)}
                className="w-4 h-4 rounded accent-primary-500"
              />
              <span className="text-sm dark:text-slate-300 text-slate-700 group-hover:text-primary-400 transition-colors">{b.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-bold text-sm dark:text-white text-slate-800 mb-3">Minimum Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(r => (
            <label key={r} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === r}
                onChange={() => updateFilter('rating', r)}
                className="accent-primary-500"
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: r }).map((_, i) => (
                  <FaStar key={i} className="w-3 h-3 text-amber-400" />
                ))}
                {Array.from({ length: 5 - r }).map((_, i) => (
                  <FaStar key={i} className="w-3 h-3 dark:text-slate-600 text-slate-300" />
                ))}
                <span className="text-xs dark:text-slate-400 text-slate-600 ml-1">& above</span>
              </div>
            </label>
          ))}
          {filters.rating > 0 && (
            <button onClick={() => updateFilter('rating', 0)} className="text-xs text-primary-400 hover:underline">Clear</button>
          )}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="font-bold text-sm dark:text-white text-slate-800 mb-3">Availability</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={filters.inStock} onChange={e => updateFilter('inStock', e.target.checked)} className="w-4 h-4 rounded accent-primary-500" />
            <span className="text-sm dark:text-slate-300 text-slate-700">In Stock Only</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={filters.freeShipping} onChange={e => updateFilter('freeShipping', e.target.checked)} className="w-4 h-4 rounded accent-primary-500" />
            <span className="text-sm dark:text-slate-300 text-slate-700">Free Shipping</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-slate-900">
            {searchParams.get('category') ? categories.find(c => c.slug === searchParams.get('category'))?.name || 'Products' : 'All Products'}
          </h1>
          <p className="text-sm dark:text-slate-400 text-slate-600 mt-1">{filtered.length} products found</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 rounded-xl text-sm font-medium dark:text-slate-300 text-slate-700 hover:border-primary-500/50 transition-all"
          >
            <FiSliders className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center">{activeFiltersCount}</span>
            )}
          </button>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 rounded-xl text-sm dark:text-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/40 cursor-pointer"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-slate-400 text-slate-500 pointer-events-none" />
          </div>

          {/* View Mode */}
          <div className="flex items-center dark:bg-dark-card bg-slate-100 rounded-xl p-1 border dark:border-dark-border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary-500 text-white shadow' : 'dark:text-slate-400 text-slate-500 dark:hover:text-white hover:text-slate-700'}`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary-500 text-white shadow' : 'dark:text-slate-400 text-slate-500 dark:hover:text-white hover:text-slate-700'}`}
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Tags */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.categories.map(c => (
            <span key={c} className="flex items-center gap-1 px-3 py-1 dark:bg-primary-500/10 bg-primary-50 text-primary-400 border border-primary-500/30 rounded-full text-xs font-medium">
              {categories.find(cat => cat.slug === c)?.name || c}
              <button onClick={() => toggleArrayFilter('categories', c)}><FiX className="w-3 h-3" /></button>
            </span>
          ))}
          {filters.brands.map(b => (
            <span key={b} className="flex items-center gap-1 px-3 py-1 dark:bg-primary-500/10 bg-primary-50 text-primary-400 border border-primary-500/30 rounded-full text-xs font-medium">
              {b}
              <button onClick={() => toggleArrayFilter('brands', b)}><FiX className="w-3 h-3" /></button>
            </span>
          ))}
          {filters.rating > 0 && (
            <span className="flex items-center gap-1 px-3 py-1 dark:bg-amber-500/10 bg-amber-50 text-amber-400 border border-amber-500/30 rounded-full text-xs font-medium">
              {filters.rating}★ & above
              <button onClick={() => updateFilter('rating', 0)}><FiX className="w-3 h-3" /></button>
            </span>
          )}
          {(filters.inStock || filters.freeShipping) && (
            <span className="flex items-center gap-1 px-3 py-1 dark:bg-emerald-500/10 bg-emerald-50 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-medium">
              {filters.inStock ? 'In Stock' : ''}{filters.inStock && filters.freeShipping ? ' + ' : ''}{filters.freeShipping ? 'Free Shipping' : ''}
              <button onClick={() => { updateFilter('inStock', false); updateFilter('freeShipping', false); }}><FiX className="w-3 h-3" /></button>
            </span>
          )}
          <button onClick={clearFilters} className="text-xs text-red-400 hover:text-red-300 font-semibold">Clear All</button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-5 sticky top-24">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold dark:text-white text-slate-800 flex items-center gap-2">
                <FiFilter className="w-4 h-4 text-primary-400" />
                Filters
              </h3>
              {activeFiltersCount > 0 && (
                <span className="text-xs bg-primary-500 text-white px-2 py-0.5 rounded-full">{activeFiltersCount}</span>
              )}
            </div>
            <FilterSidebar />
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="absolute left-0 top-0 bottom-0 w-80 dark:bg-dark-surface bg-white p-5 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold dark:text-white text-slate-800">Filters</h3>
                  <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-xl dark:hover:bg-dark-card hover:bg-slate-100">
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                <FilterSidebar />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Products */}
        <div className="flex-1 min-w-0">
          {paginated.length === 0 ? (
            <div className="text-center py-24">
              <FiSearch className="w-16 h-16 dark:text-slate-600 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold dark:text-white text-slate-800 mb-2">No products found</h3>
              <p className="dark:text-slate-400 text-slate-600 mb-6">Try adjusting your filters or search terms</p>
              <button onClick={clearFilters} className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors">
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'flex flex-col gap-4'
              }>
                {paginated.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} viewMode={viewMode} onQuickView={setQuickViewProduct} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-xl dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 dark:text-slate-300 text-slate-700 disabled:opacity-40 hover:border-primary-500/50 transition-all text-sm font-medium"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${
                        p === page
                          ? 'bg-primary-500 text-white shadow-glow-primary'
                          : 'dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 dark:text-slate-300 text-slate-700 hover:border-primary-500/50'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded-xl dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 dark:text-slate-300 text-slate-700 disabled:opacity-40 hover:border-primary-500/50 transition-all text-sm font-medium"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </motion.div>
  );
};

export default ProductListing;
