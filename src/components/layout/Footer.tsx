import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTwitter, FiFacebook, FiInstagram, FiYoutube, FiLinkedin, FiArrowUpRight } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

const footerLinks = {
  'SumitXShop': [
    { label: 'About Us', to: '/' },
    { label: 'Careers', to: '/' },
    { label: 'Press & Media', to: '/' },
    { label: 'Blog', to: '/' },
    { label: 'Investors', to: '/' },
  ],
  'Shop': [
    { label: 'Electronics', to: '/products?category=electronics' },
    { label: 'Fashion', to: '/products?category=fashion' },
    { label: 'Home & Kitchen', to: '/products?category=home' },
    { label: 'Beauty', to: '/products?category=beauty' },
    { label: "Today's Deals", to: '/products?sort=discount' },
  ],
  'Sellers': [
    { label: 'Sell on SumitXShop', to: '/dashboard/seller' },
    { label: 'Seller Dashboard', to: '/dashboard/seller' },
    { label: 'Advertise With Us', to: '/' },
    { label: 'Seller Support', to: '/' },
    { label: 'Fulfilment Services', to: '/' },
  ],
  'Support': [
    { label: 'Help Center', to: '/' },
    { label: 'Track My Order', to: '/' },
    { label: 'Easy Returns', to: '/' },
    { label: 'Contact Us', to: '/' },
    { label: 'Community Forum', to: '/' },
  ],
  'Legal': [
    { label: 'Privacy Policy', to: '/' },
    { label: 'Terms of Service', to: '/' },
    { label: 'Cookie Policy', to: '/' },
    { label: 'Accessibility', to: '/' },
  ],
};

const socialLinks = [
  { icon: FiTwitter, href: '#', label: 'Twitter', color: 'hover:text-sky-400' },
  { icon: FiFacebook, href: '#', label: 'Facebook', color: 'hover:text-blue-400' },
  { icon: FiInstagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
  { icon: FiYoutube, href: '#', label: 'YouTube', color: 'hover:text-red-400' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-500' },
];

const paymentMethods = ['Visa', 'Mastercard', 'UPI', 'PayTM', 'Razorpay', 'NetBanking', 'EMI', 'COD'];

const Footer: React.FC = () => (
  <footer className="relative mt-20 overflow-hidden">
    {/* Top gradient border */}
    <div className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

    {/* Background */}
    <div className="dark:bg-dark-surface bg-slate-900 relative">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[150px] opacity-[0.04] bg-primary-500 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[120px] opacity-[0.03] bg-violet-500 pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8">

          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 pr-4">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center shadow-glow-primary group-hover:scale-105 transition-transform">
                <HiSparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black gradient-text font-display">SumitXShop</span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
              India's most premium multi-vendor marketplace. Shop from millions of products with trust, delight, and blazing-fast delivery.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { value: '50M+', label: 'Happy Customers' },
                { value: '10M+', label: 'Products Listed' },
                { value: '2-Day', label: 'Fast Delivery' },
                { value: '4.9★', label: 'App Rating' },
              ].map(stat => (
                <div key={stat.label} className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                  <div className="text-base font-black gradient-text">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 ${color} transition-colors`}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h4 className="font-bold text-xs text-slate-200 uppercase tracking-widest mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-400 hover:text-white transition-colors group flex items-center gap-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment & App Downloads */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

            {/* Payment Methods */}
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">Secure Payments</div>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map(p => (
                  <span
                    key={p}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 hover:border-primary-500/40 hover:text-white transition-colors cursor-default"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* App Downloads */}
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">Download Our App</div>
              <div className="flex gap-3">
                {[
                  { store: 'App Store', emoji: '🍎', sub: 'Download on the' },
                  { store: 'Google Play', emoji: '🤖', sub: 'Get it on' },
                ].map(({ store, emoji, sub }) => (
                  <motion.button
                    key={store}
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-700 hover:border-primary-500/50 bg-slate-800/50 hover:bg-slate-800 transition-all group"
                  >
                    <span className="text-2xl">{emoji}</span>
                    <div className="text-left">
                      <div className="text-[10px] text-slate-400 leading-none">{sub}</div>
                      <div className="text-xs font-bold text-white leading-tight mt-0.5">{store}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} SumitXShop Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              Made with <span className="text-red-500">❤️</span> in India
            </span>
            <span className="hidden sm:block">·</span>
            <span className="hidden sm:flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
