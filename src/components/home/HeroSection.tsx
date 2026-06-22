import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

const slides = [
  {
    id: 1,
    title: 'The Future of Shopping',
    subtitle: 'Discover millions of products from thousands of verified sellers',
    cta: 'Shop Now',
    ctaLink: '/products',
    badge: 'New Platform Launch',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop',
    gradient: 'from-[#0f0c29] via-[#302b63] to-[#24243e]',
    accent: '#6366f1',
  },
  {
    id: 2,
    title: 'Flash Sale — Up to 70% Off',
    subtitle: 'Limited time deals on electronics, fashion, and more. Don\'t miss out!',
    cta: 'View Deals',
    ctaLink: '/products?sort=discount',
    badge: '🔥 Flash Sale Live',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cd?q=80&w=1400&auto=format&fit=crop',
    gradient: 'from-[#1a0533] via-[#2d0a5a] to-[#0a0a1a]',
    accent: '#f59e0b',
  },
  {
    id: 3,
    title: 'Apple. Designed to Amaze.',
    subtitle: 'The latest iPhone 15 Pro, MacBook Pro M3, and iPad Pro. Now on ShopVerse.',
    cta: 'Explore Apple',
    ctaLink: '/products?brand=Apple',
    badge: 'Premium Brands',
    image: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=1400&auto=format&fit=crop',
    gradient: 'from-[#1c1c1e] via-[#2d2d2f] to-[#000000]',
    accent: '#a78bfa',
  },
  {
    id: 4,
    title: 'New Season, New You',
    subtitle: 'Shop the latest fashion trends from top brands. Free shipping on all orders.',
    cta: 'Shop Fashion',
    ctaLink: '/products?category=fashion',
    badge: 'Fashion Week',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop',
    gradient: 'from-[#0d1117] via-[#1a1f2e] to-[#0d1117]',
    accent: '#ec4899',
  },
];

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const prev = () => { setCurrent(p => (p - 1 + slides.length) % slides.length); setAutoPlay(false); };
  const next = () => { setCurrent(p => (p + 1) % slides.length); setAutoPlay(false); };

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 h-[440px] sm:h-[520px] lg:h-[580px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />

          {/* Floating orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl"
              style={{ background: slide.accent }}
            />
            <motion.div
              animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
              style={{ background: slide.accent }}
            />
          </div>

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center h-full px-8 sm:px-16 lg:px-24 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-semibold text-white mb-6">
                <HiSparkles className="w-4 h-4 text-amber-400" />
                {slide.badge}
              </div>
            </motion.div>

            <motion.h1
              key={`title-${slide.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-tight mb-4"
            >
              {slide.title}
            </motion.h1>

            <motion.p
              key={`subtitle-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-base sm:text-lg text-slate-300 mb-8 max-w-lg leading-relaxed"
            >
              {slide.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <Link
                to={slide.ctaLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm sm:text-base shadow-lg hover:shadow-xl transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}cc)`, boxShadow: `0 0 20px ${slide.accent}66` }}
              >
                <FiShoppingBag className="w-4 h-4" />
                {slide.cta}
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products" className="text-sm text-slate-300 hover:text-white transition-colors underline underline-offset-4">
                Browse All
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors">
        <FiArrowLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors">
        <FiArrowRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setAutoPlay(false); }}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
