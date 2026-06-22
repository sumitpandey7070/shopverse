import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiZap, FiArrowRight, FiClock } from 'react-icons/fi';
import { flashSaleProducts } from '@/data';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/product/QuickViewModal';
import type { Product } from '@/types';

const useCountdown = (targetDate: string) => {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ h: 0, m: 0, s: 0 }); return; }
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [targetDate]);
  return timeLeft;
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 dark:bg-dark-card bg-slate-900 rounded-xl flex items-center justify-center shadow-inner">
      <motion.span
        key={value}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-xl font-black text-white tabular-nums"
      >
        {String(value).padStart(2, '0')}
      </motion.span>
    </div>
    <span className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">{label}</span>
  </div>
);

const FlashSale: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const targetDate = flashSaleProducts[0]?.flashSaleEnd || new Date(Date.now() + 86400000).toISOString();
  const { h, m, s } = useCountdown(targetDate);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 mb-8"
        style={{ background: 'linear-gradient(135deg, #1a0533, #2d0a5a 50%, #0a0a1a)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <FiZap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">Flash Sale</h2>
                <p className="text-amber-300 text-sm">Unbelievable deals. Limited time only.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <FiClock className="w-4 h-4" />
              <span>Ends in</span>
            </div>
            <div className="flex items-center gap-2">
              <TimeUnit value={h} label="Hrs" />
              <span className="text-2xl font-black text-amber-400 mb-4">:</span>
              <TimeUnit value={m} label="Min" />
              <span className="text-2xl font-black text-amber-400 mb-4">:</span>
              <TimeUnit value={s} label="Sec" />
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {flashSaleProducts.slice(0, 5).map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            index={i}
            onQuickView={setQuickViewProduct}
          />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/products?sort=discount"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 transition-all font-semibold text-sm"
        >
          View All Flash Sale Items <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
};

export default FlashSale;
