import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Software Engineer',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    comment: 'SumitXShop is absolutely incredible! I ordered the iPhone 15 Pro Max and it arrived in just 2 days with perfect packaging. The AI recommendations are spot-on — helped me discover products I didn\'t even know I needed. This is the future of shopping!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    purchase: 'iPhone 15 Pro Max',
    verified: true,
    badge: 'Premium Member',
    badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Startup Founder',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    comment: 'The flash deals on SumitXShop are insane! Got the Sony WH-1000XM5 at 28% off. Customer support resolved my query in under 5 minutes. The seller dashboard is beautifully designed — I\'ve started selling here too. Highly recommend!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    purchase: 'Sony WH-1000XM5',
    verified: true,
    badge: 'Power Seller',
    badgeColor: 'text-primary-400 bg-primary-400/10 border-primary-400/20',
  },
  {
    id: 3,
    name: 'Anjali Mehta',
    role: 'Fashion Blogger',
    location: 'Delhi, NCR',
    rating: 5,
    comment: 'I\'ve shopped on Amazon and Flipkart, but SumitXShop is on another level. The product photography is stunning, the search is lightning fast, and the checkout takes literally 30 seconds. Ordered Adidas Ultraboost and Nike Air Max — both arrived perfect!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    purchase: 'Adidas Ultraboost 23',
    verified: true,
    badge: 'Top Reviewer',
    badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  },
  {
    id: 4,
    name: 'Karthik Nair',
    role: 'Product Designer',
    location: 'Hyderabad, Telangana',
    rating: 5,
    comment: 'What a premium experience! The dark mode UI is absolutely gorgeous. Ordered the MacBook Pro M3 — came with original box, all accessories, and even a personalized thank you note. The attention to detail is Apple-level. 10/10 would recommend!',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    purchase: 'MacBook Pro 14" M3',
    verified: true,
    badge: 'Verified Buyer',
    badgeColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  },
  {
    id: 5,
    name: 'Sneha Pillai',
    role: 'Doctor',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    comment: 'SumitXShop\'s return policy is genuinely hassle-free. Had a minor issue with a skincare product and the refund was processed same day! The app is super smooth with no lag whatsoever. I shop here exclusively now — saves so much time!',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&auto=format&fit=crop&q=80',
    purchase: 'Beauty Essentials Kit',
    verified: true,
    badge: 'Premium Member',
    badgeColor: 'text-pink-400 bg-pink-400/10 border-pink-400/20',
  },
  {
    id: 6,
    name: 'Amit Joshi',
    role: 'IIT Graduate',
    location: 'Pune, Maharashtra',
    rating: 5,
    comment: 'As a tech-savvy person, I\'m impressed by the engineering behind SumitXShop. The search is blazing fast, product filters are super precise, and the comparison feature helped me pick the perfect laptop. Got the LG OLED TV at an unbeatable price!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    purchase: 'LG OLED C3 65" TV',
    verified: true,
    badge: 'Tech Enthusiast',
    badgeColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.08 }}
      >
        <FaStar className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400' : 'text-slate-700'}`} />
      </motion.div>
    ))}
  </div>
);

const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const next = useCallback(() => setActive(p => (p + 1) % testimonials.length), []);
  const prev = useCallback(() => setActive(p => (p - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [autoPlay, next]);

  const t = testimonials[active];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full dark:bg-amber-500/10 bg-amber-50 border dark:border-amber-500/20 border-amber-200 text-amber-500 text-xs font-semibold mb-4">
            <HiSparkles className="w-3.5 h-3.5" />
            Customer Stories
          </div>
          <h2 className="text-2xl sm:text-3xl font-black dark:text-white text-slate-900 mb-2 font-display">
            Loved by{' '}
            <span className="gradient-text-amber">50M+ Shoppers</span>
          </h2>
          <p className="dark:text-slate-400 text-slate-600 text-sm">
            Real stories from real customers across India
          </p>
        </motion.div>
      </div>

      {/* Main Testimonial Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Large Card */}
        <div className="lg:col-span-2 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="relative p-7 sm:p-9 dark:bg-dark-card bg-white rounded-3xl border dark:border-dark-border border-slate-200 shadow-card-light dark:shadow-card-dark overflow-hidden h-full"
            >
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none bg-primary-500" />

              {/* Quote icon */}
              <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-6">
                <FaQuoteLeft className="w-5 h-5 text-primary-400" />
              </div>

              {/* Stars */}
              <StarRating rating={t.rating} />

              {/* Comment */}
              <p className="dark:text-slate-200 text-slate-700 text-base sm:text-lg leading-relaxed my-6 font-medium">
                "{t.comment}"
              </p>

              {/* Divider */}
              <div className="h-px dark:bg-dark-border bg-slate-200 mb-6" />

              {/* User Info */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-primary-500/30"
                    />
                    {t.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 dark:border-dark-card border-white">
                        <FiCheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-bold dark:text-white text-slate-900 text-sm">{t.name}</div>
                    <div className="text-xs dark:text-slate-400 text-slate-500">{t.role} · {t.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${t.badgeColor}`}>
                    {t.badge}
                  </span>
                  <span className="text-xs dark:text-slate-500 text-slate-400">
                    Purchased: <span className="dark:text-slate-300 text-slate-700 font-medium">{t.purchase}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail List */}
        <div className="flex flex-col gap-3">
          {testimonials.map((item, i) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              onClick={() => { setActive(i); setAutoPlay(false); }}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                i === active
                  ? 'dark:bg-primary-500/10 bg-primary-50 dark:border-primary-500/40 border-primary-300 shadow-glow-primary-sm'
                  : 'dark:bg-dark-card bg-white dark:border-dark-border border-slate-200 dark:hover:border-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className={`w-10 h-10 rounded-xl object-cover transition-all ${i === active ? 'border-2 border-primary-500' : 'border-2 border-transparent'}`}
                />
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-bold truncate transition-colors ${i === active ? 'text-primary-400' : 'dark:text-white text-slate-800'}`}>
                    {item.name}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[...Array(item.rating)].map((_, j) => (
                      <FaStar key={j} className="w-2.5 h-2.5 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-[11px] dark:text-slate-400 text-slate-500 truncate mt-0.5">
                    "{item.comment.slice(0, 45)}..."
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setAutoPlay(false); }}
              className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-2 bg-primary-500' : 'w-2 h-2 dark:bg-dark-border bg-slate-300 hover:bg-primary-400'}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { prev(); setAutoPlay(false); }}
            className="w-9 h-9 rounded-xl dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 flex items-center justify-center dark:text-slate-300 text-slate-600 hover:border-primary-500/40 hover:text-primary-400 transition-all"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => { next(); setAutoPlay(false); }}
            className="w-9 h-9 rounded-xl dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 flex items-center justify-center dark:text-slate-300 text-slate-600 hover:border-primary-500/40 hover:text-primary-400 transition-all"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
