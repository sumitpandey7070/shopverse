import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { categories } from '@/data';

const categoryConfig: Record<string, { emoji: string; image: string; tagline: string }> = {
  electronics: {
    emoji: '💻',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&auto=format&fit=crop&q=80',
    tagline: 'Gadgets & Tech'
  },
  fashion: {
    emoji: '👗',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&auto=format&fit=crop&q=80',
    tagline: 'Style & Trends'
  },
  home: {
    emoji: '🏠',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&auto=format&fit=crop&q=80',
    tagline: 'Décor & Living'
  },
  books: {
    emoji: '📚',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=80',
    tagline: 'Knowledge & Fiction'
  },
  sports: {
    emoji: '⚽',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&auto=format&fit=crop&q=80',
    tagline: 'Fitness & Outdoors'
  },
  beauty: {
    emoji: '💄',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop&q=80',
    tagline: 'Skincare & Makeup'
  },
  grocery: {
    emoji: '🛒',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80',
    tagline: 'Fresh & Pantry'
  },
  automotive: {
    emoji: '🚗',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&auto=format&fit=crop&q=80',
    tagline: 'Cars & Accessories'
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const FeaturedCategories: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
    {/* Header */}
    <div className="flex items-end justify-between mb-8">
      <div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-primary-500/10 bg-primary-50 border dark:border-primary-500/20 border-primary-200 text-primary-500 text-xs font-semibold mb-3"
        >
          ✦ All Categories
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-black dark:text-white text-slate-900 font-display"
        >
          Shop by{' '}
          <span className="gradient-text">Category</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm dark:text-slate-400 text-slate-600 mt-1"
        >
          Explore our curated selection across all major categories
        </motion.p>
      </div>
      <Link
        to="/products"
        className="flex items-center gap-1.5 text-primary-400 hover:text-primary-300 text-sm font-semibold transition-colors group mb-1"
      >
        All Categories
        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>

    {/* Category Cards Grid */}
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4"
    >
      {/* Large card — first category */}
      {categories.slice(0, 1).map(cat => {
        const cfg = categoryConfig[cat.slug] || { emoji: '🛍️', image: '', tagline: 'Shop Now' };
        return (
          <motion.div key={cat.id} variants={item} className="col-span-2 row-span-2">
            <Link to={`/products?category=${cat.slug}`} className="group block relative overflow-hidden rounded-3xl h-full min-h-[260px]">
              <img
                src={cfg.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="relative z-10 flex flex-col justify-between h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{cfg.emoji}</span>
                  <div className="glass px-3 py-1.5 rounded-full text-white/90 text-xs font-semibold">
                    {cat.productCount.toLocaleString()}+ items
                  </div>
                </div>
                <div>
                  <div className="text-white/70 text-xs font-medium mb-1">{cfg.tagline}</div>
                  <h3 className="text-2xl font-black text-white mb-3 font-display">{cat.name}</h3>
                  <div className="flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                    Shop Now <FiArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}

      {/* Medium / small cards */}
      {categories.slice(1, 7).map(cat => {
        const cfg = categoryConfig[cat.slug] || { emoji: '🛍️', image: '', tagline: 'Shop Now' };
        return (
          <motion.div key={cat.id} variants={item}>
            <Link to={`/products?category=${cat.slug}`} className="group block relative overflow-hidden rounded-2xl h-32">
              {cfg.image && (
                <img
                  src={cfg.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} ${cfg.image ? 'opacity-75' : 'opacity-100'} group-hover:opacity-65 transition-opacity`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              <div className="relative z-10 flex flex-col justify-between h-full p-4">
                <span className="text-2xl">{cfg.emoji}</span>
                <div>
                  <div className="text-white font-black text-sm font-display">{cat.name}</div>
                  <div className="text-white/60 text-[10px] mt-0.5">{cat.productCount.toLocaleString()}+ items</div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}

      {/* Last category — wide card */}
      {categories.slice(7, 8).map(cat => {
        const cfg = categoryConfig[cat.slug] || { emoji: '🛍️', image: '', tagline: 'Shop Now' };
        return (
          <motion.div key={cat.id} variants={item} className="col-span-2">
            <Link to={`/products?category=${cat.slug}`} className="group block relative overflow-hidden rounded-2xl h-32">
              {cfg.image && (
                <img
                  src={cfg.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-80 group-hover:opacity-70 transition-opacity`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              <div className="relative z-10 flex items-center justify-between h-full px-6 py-4">
                <div>
                  <div className="text-white font-black text-base font-display">{cat.name}</div>
                  <div className="text-white/70 text-xs">{cfg.tagline}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cfg.emoji}</span>
                  <div className="glass px-3 py-1.5 rounded-xl text-white text-xs font-semibold flex items-center gap-1">
                    Explore <FiArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  </section>
);

export default FeaturedCategories;
