import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FlashSale from '@/components/home/FlashSale';
import { TrendingSection, BestSellersSection, NewArrivalsSection } from '@/components/home/ProductSections';
import AIRecommendations from '@/components/home/AIRecommendations';
import FeaturedBrands from '@/components/home/FeaturedBrands';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';
import {
  FiTruck, FiShield, FiRefreshCw, FiHeadphones,
  FiZap, FiStar, FiUsers, FiPackage, FiArrowRight,
  FiSmartphone, FiGlobe, FiLock, FiCpu
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

// ── Animated Counter ──────────────────────────────────────
const AnimatedCounter: React.FC<{ end: number; suffix?: string; prefix?: string; duration?: number }> = ({
  end, suffix = '', prefix = '', duration = 2000
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  );
};

// ── Trust Badges ─────────────────────────────────────────
const trustBadges = [
  {
    icon: <FiTruck className="w-6 h-6" />,
    title: 'Free Delivery',
    desc: 'On orders over ₹999',
    color: 'text-blue-400',
    bg: 'dark:bg-blue-500/10 bg-blue-50 dark:border-blue-500/20 border-blue-200',
  },
  {
    icon: <FiShield className="w-6 h-6" />,
    title: '100% Genuine',
    desc: 'Verified products only',
    color: 'text-emerald-400',
    bg: 'dark:bg-emerald-500/10 bg-emerald-50 dark:border-emerald-500/20 border-emerald-200',
  },
  {
    icon: <FiRefreshCw className="w-6 h-6" />,
    title: 'Easy Returns',
    desc: '30-day hassle-free return',
    color: 'text-amber-400',
    bg: 'dark:bg-amber-500/10 bg-amber-50 dark:border-amber-500/20 border-amber-200',
  },
  {
    icon: <FiHeadphones className="w-6 h-6" />,
    title: '24/7 Support',
    desc: 'Always here to help you',
    color: 'text-violet-400',
    bg: 'dark:bg-violet-500/10 bg-violet-50 dark:border-violet-500/20 border-violet-200',
  },
];

// ── Platform Stats ────────────────────────────────────────
const stats = [
  { icon: <FiUsers className="w-6 h-6" />, end: 50, suffix: 'M+', label: 'Happy Customers', color: 'text-primary-400' },
  { icon: <FiPackage className="w-6 h-6" />, end: 10, suffix: 'M+', label: 'Products Listed', color: 'text-emerald-400' },
  { icon: <FiStar className="w-6 h-6" />, end: 4, suffix: '.9★', label: 'Average Rating', color: 'text-amber-400' },
  { icon: <FiTruck className="w-6 h-6" />, end: 500, suffix: '+', label: 'Cities Served', color: 'text-violet-400' },
];

// ── Why SumitXShop features ───────────────────────────────
const whyUs = [
  {
    icon: <FiCpu className="w-7 h-7" />,
    title: 'AI-Powered Shopping',
    desc: 'Our smart AI learns your preferences to surface products you\'ll actually love — personalized deals, recommendations, and price alerts.',
    gradient: 'from-primary-500 to-violet-500',
    link: '/products',
  },
  {
    icon: <FiZap className="w-7 h-7" />,
    title: 'Lightning Fast Delivery',
    desc: 'Same-day delivery in 50+ cities. 2-day delivery across India. Real-time tracking so you always know where your order is.',
    gradient: 'from-amber-500 to-orange-500',
    link: '/products',
  },
  {
    icon: <FiShield className="w-7 h-7" />,
    title: 'Buyer Protection',
    desc: '100% authentic products backed by our SumitXShop Promise. Full refund if your item doesn\'t arrive or isn\'t as described.',
    gradient: 'from-emerald-500 to-teal-500',
    link: '/products',
  },
  {
    icon: <FiGlobe className="w-7 h-7" />,
    title: 'Global Brands, Local Prices',
    desc: 'Official partnerships with Apple, Samsung, Nike, Sony and 500+ more brands — guaranteed authentic at India\'s best prices.',
    gradient: 'from-rose-500 to-pink-500',
    link: '/products',
  },
  {
    icon: <FiSmartphone className="w-7 h-7" />,
    title: 'Mobile-First Experience',
    desc: 'Beautifully designed app for iOS & Android. Shop, track, and manage everything from your pocket.',
    gradient: 'from-cyan-500 to-blue-500',
    link: '/',
  },
  {
    icon: <FiLock className="w-7 h-7" />,
    title: 'Bank-Grade Security',
    desc: 'Your payments and data are protected with 256-bit encryption, 2FA, and PCI-DSS compliant payment processing.',
    gradient: 'from-violet-500 to-purple-500',
    link: '/',
  },
];

// ── Home Page ─────────────────────────────────────────────
const Home: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    {/* ── Hero ── */}
    <HeroSection />

    {/* ── Trust Badges ── */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {trustBadges.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-default ${b.bg}`}
          >
            <div className={`${b.color} flex-shrink-0 p-2 rounded-xl dark:bg-white/5 bg-white/80`}>
              {b.icon}
            </div>
            <div>
              <div className="font-bold text-sm dark:text-white text-slate-800">{b.title}</div>
              <div className="text-xs dark:text-slate-400 text-slate-600 leading-tight">{b.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── Platform Stats Bar ── */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 p-6 sm:p-8"
      >
        {/* bg glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-violet-500/5 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl dark:bg-dark-surface bg-slate-100 ${s.color} mb-3`}>
                {s.icon}
              </div>
              <div className={`text-2xl sm:text-3xl font-black mb-1 font-display ${s.color}`}>
                <AnimatedCounter end={s.end} suffix={s.suffix} />
              </div>
              <div className="text-xs sm:text-sm dark:text-slate-400 text-slate-600 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>

    {/* ── Categories ── */}
    <FeaturedCategories />

    {/* ── Flash Sale ── */}
    <FlashSale />

    {/* ── Trending ── */}
    <TrendingSection />

    {/* ── Best Sellers ── */}
    <BestSellersSection />

    {/* ── AI Recommendations ── */}
    <AIRecommendations />

    {/* ── New Arrivals ── */}
    <NewArrivalsSection />

    {/* ── Brands Marquee ── */}
    <FeaturedBrands />

    {/* ── Why SumitXShop ── */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full dark:bg-primary-500/10 bg-primary-50 border dark:border-primary-500/20 border-primary-200 text-primary-500 text-xs font-semibold mb-4">
            <HiSparkles className="w-3.5 h-3.5" />
            Why SumitXShop?
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black dark:text-white text-slate-900 mb-3 font-display">
            Built for the{' '}
            <span className="gradient-text">Next Generation</span>{' '}
            of Shoppers
          </h2>
          <p className="dark:text-slate-400 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            We combined Apple-level design with Amazon-scale reliability to create the shopping experience you deserve.
          </p>
        </motion.div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {whyUs.map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-6 overflow-hidden hover:shadow-premium-light dark:hover:shadow-premium transition-all duration-300 dark:hover:border-primary-500/20"
          >
            {/* Hover bg glow */}
            <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${feat.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 pointer-events-none`} />

            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {feat.icon}
            </div>

            <h3 className="font-black dark:text-white text-slate-900 text-base mb-2 font-display">{feat.title}</h3>
            <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed mb-4">{feat.desc}</p>

            <Link
              to={feat.link}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors group-hover:gap-2"
            >
              Learn more <FiArrowRight className="w-3.5 h-3.5 transition-all" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── Testimonials ── */}
    <Testimonials />

    {/* ── Newsletter ── */}
    <Newsletter />
  </motion.div>
);

export default Home;
