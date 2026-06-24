import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiArrowRight, FiCheck, FiGift, FiZap, FiBell } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

const perks = [
  { icon: <FiGift className="w-4 h-4" />, label: '₹500 Off First Order' },
  { icon: <FiZap className="w-4 h-4" />, label: 'Flash Deal Early Access' },
  { icon: <FiBell className="w-4 h-4" />, label: 'Personalised Alerts' },
];

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20 mb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl"
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4c1d95 60%, #5b21b6 100%)' }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Animated orbs */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-20%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-30"
          style={{ background: '#818cf8' }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-[-20%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{ background: '#e879f9' }}
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[80px]"
          style={{ background: '#f59e0b' }}
        />

        {/* Floating sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20 pointer-events-none"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -15, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          >
            <HiSparkles className="w-4 h-4" />
          </motion.div>
        ))}

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-12 lg:p-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-xs font-semibold mb-6 border border-white/20"
            >
              <HiSparkles className="w-3.5 h-3.5 text-amber-300" />
              Exclusive Member Benefits
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight font-display"
            >
              Get{' '}
              <span style={{
                background: 'linear-gradient(135deg, #fbbf24, #fde68a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                ₹500 Off
              </span>{' '}
              Your First Order
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/75 text-sm sm:text-base mb-6 max-w-md mx-auto leading-relaxed"
            >
              Join 2M+ smart shoppers. Get exclusive deals, new arrival alerts, and AI-personalised recommendations straight to your inbox.
            </motion.p>

            {/* Perks Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-8"
            >
              {perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-white/90 text-xs font-medium border border-white/15">
                  <span className="text-amber-300">{perk.icon}</span>
                  {perk.label}
                </div>
              ))}
            </motion.div>

            {/* Form / Success */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-full bg-emerald-400 flex items-center justify-center shadow-lg"
                  >
                    <FiCheck className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <div className="text-white font-black text-xl mb-1">You're in! 🎉</div>
                    <div className="text-white/70 text-sm">Check your inbox for your ₹500 coupon code.</div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                    <span className="text-emerald-400 font-mono text-sm font-bold tracking-widest">WELCOME500</span>
                    <span className="text-white/50 text-xs">· Your coupon code</span>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <div className={`flex-1 relative transition-all duration-300 ${focused ? 'scale-[1.02]' : ''}`}>
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-amber-400/60 focus:bg-white/15 text-sm transition-all"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold text-sm hover:shadow-neon-amber transition-all whitespace-nowrap"
                  >
                    Subscribe <FiArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {!submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-white/40 text-xs mt-4"
              >
                🔒 No spam, ever. Unsubscribe anytime. We respect your privacy.
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
