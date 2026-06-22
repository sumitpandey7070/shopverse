import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { products, bestSellers, newArrivals, trendingProducts } from '@/data';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/product/QuickViewModal';
import type { Product } from '@/types';

interface SectionProps {
  title: string;
  subtitle?: string;
  items: Product[];
  link: string;
  linkLabel?: string;
  gradient?: boolean;
}

export const ProductSection: React.FC<SectionProps> = ({ title, subtitle, items, link, linkLabel = 'View All', gradient }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <section className={`mt-20 ${gradient ? 'py-12 dark:bg-dark-surface bg-slate-50 -mx-4 sm:-mx-6 px-4 sm:px-6 lg:px-8' : ''}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-slate-900">{title}</h2>
            {subtitle && <p className="text-sm dark:text-slate-400 text-slate-600 mt-1">{subtitle}</p>}
          </div>
          <Link to={link} className="flex items-center gap-1 text-primary-400 hover:text-primary-300 text-sm font-semibold transition-colors whitespace-nowrap">
            {linkLabel} <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.slice(0, 5).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      </div>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
};

export const TrendingSection: React.FC = () => (
  <ProductSection
    title="🔥 Trending Now"
    subtitle="What everyone's buying this week"
    items={trendingProducts}
    link="/products?sort=popular"
  />
);

export const BestSellersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'electronics' | 'fashion' | 'home'>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const tabProducts = {
    all: bestSellers,
    electronics: products.filter(p => p.category === 'electronics' && p.isBestSeller),
    fashion: products.filter(p => p.category === 'fashion' && p.isBestSeller),
    home: products.filter(p => p.category === 'home' && p.isBestSeller),
  };

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'electronics', label: 'Electronics' },
    { key: 'fashion', label: 'Fashion' },
    { key: 'home', label: 'Home' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-slate-900">Best Sellers</h2>
          <p className="text-sm dark:text-slate-400 text-slate-600 mt-1">Our most popular products</p>
        </div>
        <div className="flex items-center gap-2 p-1 dark:bg-dark-card bg-slate-100 rounded-xl">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-primary-500 text-white shadow-glow-primary'
                  : 'dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        {(tabProducts[activeTab] || bestSellers).slice(0, 5).map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} onQuickView={setQuickViewProduct} />
        ))}
      </motion.div>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
};

export const NewArrivalsSection: React.FC = () => (
  <ProductSection
    title="✨ New Arrivals"
    subtitle="Fresh products just landed"
    items={newArrivals}
    link="/products?sort=newest"
    gradient
  />
);
