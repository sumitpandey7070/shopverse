import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { trendingProducts, products } from '@/data';
import { useCartStore } from '@/store/cartStore';

const AIRecommendations: React.FC = () => {
  const { addItem } = useCartStore();
  const recommended = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-8 dark:bg-dark-card bg-slate-50 border dark:border-dark-border border-slate-200">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', transform: 'translate(30%, -30%)' }} />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center shadow-glow-primary">
              <HiSparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-bold dark:text-white text-slate-900">AI-Powered For You</h2>
                <span className="px-2 py-0.5 text-xs font-bold bg-primary-500/20 text-primary-400 rounded-full border border-primary-500/30">BETA</span>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-600">Personalized picks based on your browsing & purchase history</p>
            </div>
          </div>
          <Link to="/products" className="flex items-center gap-1 text-primary-400 hover:text-primary-300 text-sm font-semibold whitespace-nowrap">
            See All <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recommended.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 overflow-hidden hover:shadow-card-dark transition-all duration-300 hover:dark:border-primary-500/20"
          >
            {/* Match score */}
            <div className="absolute top-3 left-3 z-10">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary-500/90 backdrop-blur-sm text-white text-xs font-bold">
                <HiSparkles className="w-3 h-3" />
                {95 - i * 5}% match
              </div>
            </div>

            <div className="zoom-container aspect-video bg-slate-100 dark:bg-dark-surface">
              <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="text-xs dark:text-slate-400 text-slate-500 mb-1">{product.brand}</div>
              <h3 className="font-semibold dark:text-white text-slate-800 text-sm line-clamp-2 mb-2">{product.name}</h3>
              <div className="flex items-center gap-1 mb-3">
                <FiStar className="w-3.5 h-3.5 text-amber-400 fill-current" />
                <span className="text-xs font-medium text-amber-400">{product.rating}</span>
                <span className="text-xs dark:text-slate-500 text-slate-400">({product.reviewCount})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold dark:text-white text-slate-900">₹{product.price.toLocaleString()}</span>
                <button
                  onClick={() => addItem(product)}
                  className="p-2 rounded-xl bg-primary-500/10 text-primary-400 hover:bg-primary-500 hover:text-white transition-all"
                >
                  <FiShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AIRecommendations;
