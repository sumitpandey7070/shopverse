import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import {
  SiApple, SiSamsung, SiNike, SiAdidas, SiSony, SiLg, SiLogitech, SiAsus, SiDell,
} from 'react-icons/si';

const topRowBrands = [
  { id: 'apple',    icon: <SiApple className="w-7 h-7 dark:text-slate-200 text-slate-800" />, name: 'Apple' },
  { id: 'samsung',  icon: <SiSamsung className="w-10 h-10 text-[#1428a0] dark:text-[#5b8dee]" />, name: 'Samsung' },
  { id: 'nike',     icon: <SiNike className="w-9 h-9 dark:text-white text-slate-900" />, name: 'Nike' },
  { id: 'sony',     icon: <SiSony className="w-10 h-10 dark:text-white text-slate-900" />, name: 'Sony' },
  { id: 'lg',       icon: <SiLg className="w-7 h-7 text-[#a50034] dark:text-rose-400" />, name: 'LG' },
  { id: 'adidas',   icon: <SiAdidas className="w-7 h-7 dark:text-white text-slate-900" />, name: 'Adidas' },
  { id: 'logitech', icon: <SiLogitech className="w-8 h-8 text-[#00b0f0] dark:text-cyan-400" />, name: 'Logitech' },
  { id: 'dell',     icon: <SiDell className="w-8 h-8 text-[#007DB8] dark:text-blue-400" />, name: 'Dell' },
];

const bottomRowBrands = [
  { id: 'asus',    icon: <SiAsus className="w-8 h-8 text-[#00539B] dark:text-blue-300" />, name: 'Asus' },
  { id: 'ms',      icon: <span className="text-[11px] font-black tracking-tight dark:text-slate-200 text-slate-800">Microsoft</span>, name: 'Microsoft' },
  { id: 'dyson',   icon: <span className="text-base font-black tracking-tighter uppercase dark:text-white text-slate-900">dyson</span>, name: 'Dyson' },
  { id: 'oneplus', icon: <span className="text-[11px] font-black tracking-tight dark:text-slate-200 text-slate-800">OnePlus</span>, name: 'OnePlus' },
  { id: 'boat',    icon: <span className="text-sm font-black italic dark:text-amber-400 text-amber-600">boAt</span>, name: 'boAt' },
  { id: 'rayban',  icon: <span className="text-[10px] font-bold tracking-widest dark:text-slate-200 text-slate-800">RAY-BAN</span>, name: 'Ray-Ban' },
  { id: 'garmin',  icon: <span className="text-[10px] font-bold tracking-wider text-[#006DBE] dark:text-blue-400">GARMIN</span>, name: 'Garmin' },
  { id: 'fossil',  icon: <span className="text-[10px] font-black tracking-widest dark:text-slate-300 text-slate-700">FOSSIL</span>, name: 'Fossil' },
];

const BrandChip: React.FC<{ brand: { id: string; icon: React.ReactNode; name: string; color?: string } }> = ({ brand }) => (
  <div className="flex-shrink-0 flex flex-col items-center gap-2 mx-5 group cursor-pointer">
    <div className="w-16 h-16 flex items-center justify-center rounded-2xl dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 shadow-sm group-hover:shadow-glow-primary group-hover:border-primary-500/40 transition-all duration-300 dark:text-slate-200 text-slate-700">
      {brand.icon}
    </div>
    <span className="text-xs font-semibold dark:text-slate-400 text-slate-500 group-hover:text-primary-400 transition-colors">
      {brand.name}
    </span>
  </div>
);

const FeaturedBrands: React.FC = () => (
  <section className="mt-20 overflow-hidden">
    {/* Header */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full dark:bg-primary-500/10 bg-primary-50 border dark:border-primary-500/20 border-primary-200 text-primary-500 text-xs font-semibold mb-4">
          ✦ Trusted Partners
        </div>
        <h2 className="text-2xl sm:text-3xl font-black dark:text-white text-slate-900 mb-2 font-display">
          World-Class{' '}
          <span className="gradient-text">Premium Brands</span>
        </h2>
        <p className="dark:text-slate-400 text-slate-600 text-sm max-w-md mx-auto">
          Shop authentic products from globally trusted brands, all with official warranty
        </p>
      </motion.div>
    </div>

    {/* Fade edges */}
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none dark:bg-gradient-to-r dark:from-dark-bg bg-gradient-to-r from-slate-50 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none dark:bg-gradient-to-l dark:from-dark-bg bg-gradient-to-l from-slate-50 to-transparent" />

      {/* Row 1 — Left to Right */}
      <div className="flex overflow-hidden mb-4">
        <div className="marquee-track flex items-end pb-2">
          {[...topRowBrands, ...topRowBrands, ...topRowBrands].map((b, i) => (
            <BrandChip key={`${b.id}-${i}`} brand={b} />
          ))}
        </div>
      </div>

      {/* Row 2 — Right to Left */}
      <div className="flex overflow-hidden">
        <div className="marquee-track-reverse flex items-end pb-2">
          {[...bottomRowBrands, ...bottomRowBrands, ...bottomRowBrands].map((b, i) => (
            <BrandChip key={`${b.id}-${i}`} brand={b} />
          ))}
        </div>
      </div>
    </div>

    {/* CTA */}
    <div className="text-center mt-8">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors"
      >
        View all brands <FiArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </section>
);

export default FeaturedBrands;
