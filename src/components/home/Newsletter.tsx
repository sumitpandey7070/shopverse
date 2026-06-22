import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiArrowRight, FiCheck } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16 text-center"
        style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a21caf 100%)', backgroundSize: '200% 200%' }}
      >
        {/* Orbs */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ background: '#818cf8', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ background: '#e879f9', transform: 'translate(30%, 30%)' }} />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold mb-6">
            <HiSparkles className="w-4 h-4 text-amber-300" />
            Exclusive member offers
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Get ₹500 Off Your First Order
          </h2>
          <p className="text-white/80 text-base sm:text-lg mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter for exclusive deals, new arrivals, and personalized recommendations.
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 max-w-sm mx-auto"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center">
                <FiCheck className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white font-bold">You're subscribed!</div>
                <div className="text-white/70 text-sm">Check your inbox for your coupon.</div>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-primary-600 font-bold text-sm hover:bg-white/90 transition-all hover:shadow-lg whitespace-nowrap"
              >
                Subscribe <FiArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-white/50 text-xs mt-4">
            No spam. Unsubscribe anytime. 2M+ members already.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
