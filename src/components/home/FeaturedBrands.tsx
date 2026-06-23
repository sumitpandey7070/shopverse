import React from 'react';
import { motion } from 'framer-motion';
import { brands } from '@/data';
import { SiApple, SiSamsung, SiNike, SiAdidas, SiSony, SiLg, SiLogitech } from 'react-icons/si';

const brandIcons: Record<string, React.ReactNode> = {
  b1: <SiApple className="w-8 h-8 text-slate-800 dark:text-slate-200" />,
  b2: <SiSamsung className="w-12 h-12 text-[#1428a0] dark:text-[#3b82f6]" />,
  b3: <SiNike className="w-10 h-10 text-slate-900 dark:text-white" />,
  b4: <SiAdidas className="w-8 h-8 text-slate-900 dark:text-white" />,
  b5: <SiSony className="w-12 h-12 text-slate-900 dark:text-white" />,
  b6: <SiLg className="w-8 h-8 text-[#a50034] dark:text-rose-500" />,
  b7: <span className="text-sm font-extrabold tracking-tighter text-slate-900 dark:text-white uppercase font-sans">dyson</span>,
  b8: <SiLogitech className="w-8 h-8 text-[#00b0f0] dark:text-cyan-400" />,
};

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
          <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 group-hover:bg-slate-100/50 dark:group-hover:bg-slate-800/50 transition-colors">
            {brandIcons[brand.id] || (
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-10 h-10 object-contain dark:opacity-80 opacity-100 group-hover:opacity-100 transition-opacity"
              />
            )}
          </div>
          <span className="text-xs font-semibold dark:text-slate-400 text-slate-600 group-hover:text-primary-400 transition-colors text-center">{brand.name}</span>
        </motion.div>
      ))}
    </div>
  </section>
);

export default FeaturedBrands;

