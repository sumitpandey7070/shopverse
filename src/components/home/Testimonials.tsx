import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { testimonials } from '@/data';

const Testimonials: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
    <div className="text-center mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-slate-900 mb-2">What Our Customers Say</h2>
      <p className="dark:text-slate-400 text-slate-600">Trusted by 50 million+ happy shoppers across India</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="relative p-6 dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 hover:shadow-card-dark transition-all duration-300 group"
        >
          {/* Quote icon */}
          <div className="absolute top-4 right-4 text-4xl font-black dark:text-primary-500/20 text-primary-500/10 select-none">"</div>

          {/* Stars */}
          <div className="flex items-center gap-0.5 mb-4">
            {Array.from({ length: t.rating }).map((_, i) => (
              <FaStar key={i} className="w-3.5 h-3.5 text-amber-400" />
            ))}
          </div>

          <p className="dark:text-slate-300 text-slate-700 text-sm leading-relaxed mb-6 italic">
            "{t.comment}"
          </p>

          <div className="flex items-center gap-3">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-10 h-10 rounded-xl object-cover border-2 border-primary-500/30"
            />
            <div>
              <div className="text-sm font-bold dark:text-white text-slate-800">{t.name}</div>
              <div className="text-xs dark:text-slate-400 text-slate-500">{t.role} · {t.location}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Testimonials;
