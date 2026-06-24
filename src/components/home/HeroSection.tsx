import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiArrowLeft, FiShoppingBag, FiStar, FiTruck, FiZap } from 'react-icons/fi';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';
import { HiSparkles as HiSparkles2 } from 'react-icons/hi2';

const slides = [
  {
    id: 1,
    badge: '✦ Next-Gen Shopping Platform',
    title: 'The Future of',
    titleAccent: 'Shopping',
    subtitle: 'Discover millions of premium products from thousands of verified sellers. AI-powered recommendations, lightning deals, and world-class delivery.',
    cta: 'Start Shopping',
    cta2: 'View Deals',
    ctaLink: '/products',
    cta2Link: '/products?sort=discount',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop',
    gradient: 'from-[#0f0c29] via-[#302b63] to-[#24243e]',
    accent: '#6366f1',
    accentSecond: '#a78bfa',
    statBadge: { icon: '🌟', label: '50M+ Happy Customers', sub: 'Across India' },
    floatingBadge: { title: 'iPhone 15 Pro Max', price: '₹1,34,999', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100&auto=format&fit=crop&q=80', rating: 4.8 },
  },
  {
    id: 2,
    badge: '🔥 Flash Sale • Up to 70% Off',
    title: 'Unbelievable',
    titleAccent: 'Deals Today',
    subtitle: 'Limited-time offers on electronics, fashion & more. Our AI finds the best prices so you never miss a deal.',
    cta: 'Grab Deals',
    cta2: 'Browse All',
    ctaLink: '/products?sort=discount',
    cta2Link: '/products',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cd?q=80&w=1400&auto=format&fit=crop',
    gradient: 'from-[#1a0533] via-[#2d0a5a] to-[#0a0a1a]',
    accent: '#f59e0b',
    accentSecond: '#fbbf24',
    statBadge: { icon: '⚡', label: '₹500Cr+ in Savings', sub: 'This Year' },
    floatingBadge: { title: 'Sony WH-1000XM5', price: '₹24,999', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&auto=format&fit=crop&q=80', rating: 4.9 },
  },
  {
    id: 3,
    badge: '🍎 Premium Brands Collection',
    title: 'Apple. Designed',
    titleAccent: 'to Amaze.',
    subtitle: 'iPhone 15 Pro Max, MacBook Pro M3, iPad Pro — all on SumitXShop with official warranty and free delivery.',
    cta: 'Shop Apple',
    cta2: 'All Brands',
    ctaLink: '/products?brand=Apple',
    cta2Link: '/products',
    image: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=1400&auto=format&fit=crop',
    gradient: 'from-[#1c1c1e] via-[#2d2d2f] to-[#000000]',
    accent: '#a78bfa',
    accentSecond: '#818cf8',
    statBadge: { icon: '🏆', label: '10M+ Products', sub: 'Top Brands' },
    floatingBadge: { title: 'MacBook Pro M3', price: '₹1,99,999', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&auto=format&fit=crop&q=80', rating: 4.9 },
  },
  {
    id: 4,
    badge: '👗 New Season Arrivals',
    title: 'New Season,',
    titleAccent: 'New You.',
    subtitle: 'Curated fashion from global top brands. Free shipping on orders over ₹999 — style delivered to your door.',
    cta: 'Shop Fashion',
    cta2: 'Explore More',
    ctaLink: '/products?category=fashion',
    cta2Link: '/products',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop',
    gradient: 'from-[#0d1117] via-[#1a1f2e] to-[#0d1117]',
    accent: '#ec4899',
    accentSecond: '#f472b6',
    statBadge: { icon: '🚀', label: '2-Day Delivery', sub: 'Free on ₹999+' },
    floatingBadge: { title: 'Nike Air Max 270', price: '₹12,999', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&auto=format&fit=crop&q=80', rating: 4.5 },
  },
];

const Particle: React.FC<{ color: string; delay: number }> = ({ color, delay }) => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = Math.random() * 4 + 2;
  return (
    <motion.div
      className="absolute rounded-full opacity-0 pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      animate={{ opacity: [0, 0.8, 0], y: [0, -40, -80], scale: [0, 1, 0] }}
      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay, ease: 'easeOut' }}
    />
  );
};

const FloatingProductCard: React.FC<{ data: { title: string; price: string; img: string; rating: number }; accent: string }> = ({ data, accent }) => (
  <motion.div
    initial={{ opacity: 0, x: 40, y: 20 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    exit={{ opacity: 0, x: 40 }}
    transition={{ delay: 0.6, duration: 0.5 }}
    className="absolute right-6 sm:right-12 lg:right-20 top-1/2 -translate-y-1/2 hidden md:block"
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="glass rounded-2xl p-3 w-52 shadow-float"
      style={{ borderColor: `${accent}33` }}
    >
      <div className="flex items-center gap-3 mb-2">
        <img src={data.img} alt={data.title} className="w-12 h-12 rounded-xl object-cover" />
        <div className="flex-1 min-w-0">
          <div className="text-white text-xs font-semibold line-clamp-2 leading-tight">{data.title}</div>
          <div className="text-xs font-black mt-1" style={{ color: accent }}>{data.price}</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} className={`w-2.5 h-2.5 ${i < Math.floor(data.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
          ))}
          <span className="text-xs text-slate-400 ml-1">{data.rating}</span>
        </div>
        <span className="text-[10px] text-emerald-400 font-semibold">✓ In Stock</span>
      </div>
    </motion.div>
  </motion.div>
);

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5500);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const prev = () => { setCurrent(p => (p - 1 + slides.length) % slides.length); setAutoPlay(false); };
  const next = () => { setCurrent(p => (p + 1) % slides.length); setAutoPlay(false); };

  const slide = slides[current];

  const particles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden rounded-3xl mx-3 sm:mx-5 lg:mx-8 mt-5 h-[480px] sm:h-[540px] lg:h-[600px]"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.15] mix-blend-luminosity"
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />

          {/* Animated Particles */}
          {particles.map(i => (
            <Particle key={i} color={i % 2 === 0 ? slide.accent : slide.accentSecond} delay={i * 0.3} />
          ))}

          {/* Glow Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[-5%] left-[10%] w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
              style={{ background: slide.accent }}
            />
            <motion.div
              animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
              style={{ background: slide.accentSecond }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-14 lg:px-20 max-w-2xl">
            {/* Badge */}
            <motion.div
              key={`badge-${slide.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-white mb-5 w-fit"
            >
              <span>{slide.badge}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              key={`title-${slide.id}`}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.65 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white mb-4 font-display"
            >
              {slide.title}{' '}
              <span
                className="block sm:inline"
                style={{
                  background: `linear-gradient(135deg, ${slide.accent}, ${slide.accentSecond})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {slide.titleAccent}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              key={`sub-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.55 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed mb-7 max-w-md"
            >
              {slide.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <Link
                to={slide.ctaLink}
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-white text-sm sm:text-base shadow-float hover:scale-105 transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${slide.accent}, ${slide.accentSecond})`,
                  boxShadow: `0 0 24px ${slide.accent}66, 0 4px 16px rgba(0,0,0,0.4)`,
                }}
              >
                <FiShoppingBag className="w-4 h-4" />
                {slide.cta}
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={slide.cta2Link}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white/80 text-sm hover:text-white transition-colors glass hover:bg-white/10"
              >
                {slide.cta2}
              </Link>
            </motion.div>

            {/* Stat Badge */}
            <motion.div
              key={`stat-${slide.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65 }}
              className="inline-flex items-center gap-2 glass px-3 py-2 rounded-xl w-fit"
            >
              <span className="text-lg">{slide.statBadge.icon}</span>
              <div>
                <div className="text-xs font-bold text-white">{slide.statBadge.label}</div>
                <div className="text-[10px] text-slate-400">{slide.statBadge.sub}</div>
              </div>
            </motion.div>
          </div>

          {/* Floating Product Card */}
          <AnimatePresence mode="wait">
            <FloatingProductCard key={`card-${slide.id}`} data={slide.floatingBadge} accent={slide.accent} />
          </AnimatePresence>

        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 glass rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
      >
        <FiArrowLeft className="w-4 h-4" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 glass rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
      >
        <FiArrowRight className="w-4 h-4" />
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setAutoPlay(false); }}
            className={`rounded-full transition-all duration-400 ${
              i === current ? 'w-7 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-5 right-5 z-20 text-xs text-white/40 font-mono tabular-nums hidden sm:block">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </section>
  );
};

export default HeroSection;
