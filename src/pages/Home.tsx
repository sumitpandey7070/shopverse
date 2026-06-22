import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FlashSale from '@/components/home/FlashSale';
import { TrendingSection, BestSellersSection, NewArrivalsSection } from '@/components/home/ProductSections';
import AIRecommendations from '@/components/home/AIRecommendations';
import FeaturedBrands from '@/components/home/FeaturedBrands';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';

const trustBadges = [
  { icon: <FiTruck className="w-6 h-6" />, title: 'Free Delivery', desc: 'On orders over ₹999', color: 'text-blue-400' },
  { icon: <FiShield className="w-6 h-6" />, title: '100% Genuine', desc: 'Verified products only', color: 'text-emerald-400' },
  { icon: <FiRefreshCw className="w-6 h-6" />, title: 'Easy Returns', desc: '30-day hassle-free return', color: 'text-amber-400' },
  { icon: <FiHeadphones className="w-6 h-6" />, title: '24/7 Support', desc: 'Always here to help you', color: 'text-violet-400' },
];

const Home: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <HeroSection />

    {/* Trust Badges */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {trustBadges.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-4 p-4 dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 hover:shadow-card-dark transition-all"
          >
            <div className={`${b.color} flex-shrink-0`}>{b.icon}</div>
            <div>
              <div className="font-bold text-sm dark:text-white text-slate-800">{b.title}</div>
              <div className="text-xs dark:text-slate-400 text-slate-600">{b.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <FeaturedCategories />
    <FlashSale />
    <TrendingSection />
    <BestSellersSection />
    <AIRecommendations />
    <NewArrivalsSection />
    <FeaturedBrands />
    <Testimonials />
    <Newsletter />
  </motion.div>
);

export default Home;
