import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { categories } from '@/data';

const categoryEmojis: Record<string, string> = {
  electronics: '💻', fashion: '👗', home: '🏠', books: '📚',
  sports: '⚽', beauty: '💄', grocery: '🛒', automotive: '🚗',
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const FeaturedCategories: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-slate-900">Shop by Category</h2>
        <p className="text-sm dark:text-slate-400 text-slate-600 mt-1">Explore our wide range of products</p>
      </div>
      <Link to="/products" className="flex items-center gap-1 text-primary-400 hover:text-primary-300 text-sm font-semibold transition-colors">
        All Categories <FiArrowRight className="w-4 h-4" />
      </Link>
    </div>

    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4"
    >
      {categories.map(cat => (
        <motion.div key={cat.id} variants={item}>
          <Link
            to={`/products?category=${cat.slug}`}
            className="group flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300`}
            >
              <span className="text-2xl sm:text-3xl" role="img" aria-label={cat.name}>
                {categoryEmojis[cat.slug] || '🛍️'}
              </span>
            </motion.div>
            <span className="text-xs sm:text-sm font-semibold dark:text-slate-300 text-slate-700 text-center group-hover:text-primary-400 transition-colors">
              {cat.name}
            </span>
            <span className="text-xs dark:text-slate-500 text-slate-400 mt-0.5">
              {cat.productCount.toLocaleString()}+
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default FeaturedCategories;
