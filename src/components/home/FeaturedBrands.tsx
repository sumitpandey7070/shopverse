import React from 'react';
import { motion } from 'framer-motion';
import { brands } from '@/data';

const FeaturedBrands: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
    <div className="text-center mb-10">
      <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-slate-900 mb-2">Top Brands</h2>
      <p className="dark:text-slate-400 text-slate-600">Shop from world's most trusted brands</p>
    </div>
    <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
      {brands.map((brand, i) => (
        <motion.div
          key={brand.id}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          whileHover={{ scale: 1.08, y: -4 }}
          className="flex flex-col items-center gap-2 p-4 rounded-2xl dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 dark:hover:border-primary-500/30 hover:border-primary-300 transition-all cursor-pointer hover:shadow-card-dark group"
        >
          <img
            src={brand.logo}
            alt={brand.name}
            className="w-12 h-12 rounded-xl object-cover dark:opacity-80 opacity-100 group-hover:opacity-100 transition-opacity"
          />
          <span className="text-xs font-semibold dark:text-slate-400 text-slate-600 group-hover:text-primary-400 transition-colors text-center">{brand.name}</span>
        </motion.div>
      ))}
    </div>
  </section>
);

export default FeaturedBrands;
