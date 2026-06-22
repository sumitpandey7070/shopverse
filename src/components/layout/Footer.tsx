import React from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiFacebook, FiInstagram, FiYoutube, FiLinkedin } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

const footerLinks = {
  'ShopVerse': [
    { label: 'About Us', to: '/' }, { label: 'Careers', to: '/' },
    { label: 'Press', to: '/' }, { label: 'Blog', to: '/' }, { label: 'Investors', to: '/' },
  ],
  'Shop': [
    { label: 'Electronics', to: '/products?category=electronics' }, { label: 'Fashion', to: '/products?category=fashion' },
    { label: 'Home & Kitchen', to: '/products?category=home' }, { label: 'Beauty', to: '/products?category=beauty' },
    { label: "Today's Deals", to: '/products?sort=discount' },
  ],
  'Sellers': [
    { label: 'Sell on ShopVerse', to: '/dashboard/seller' }, { label: 'Seller Dashboard', to: '/dashboard/seller' },
    { label: 'Advertise', to: '/' }, { label: 'Seller Support', to: '/' }, { label: 'Fulfillment', to: '/' },
  ],
  'Support': [
    { label: 'Help Center', to: '/' }, { label: 'Track Order', to: '/' },
    { label: 'Returns', to: '/' }, { label: 'Contact Us', to: '/' }, { label: 'Community', to: '/' },
  ],
  'Policies': [
    { label: 'Privacy Policy', to: '/' }, { label: 'Terms of Service', to: '/' },
    { label: 'Cookie Policy', to: '/' }, { label: 'Accessibility', to: '/' },
  ],
};

const Footer: React.FC = () => (
  <footer className="dark:bg-dark-surface bg-slate-900 text-white mt-20">
    {/* Main Footer */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center shadow-glow-primary">
              <HiSparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black gradient-text">ShopVerse</span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            The world's most premium multi-vendor marketplace. Shop from millions of products with trust and delight.
          </p>
          <div className="flex items-center gap-3">
            {[FiTwitter, FiFacebook, FiInstagram, FiYoutube, FiLinkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-500/20 transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-bold text-sm mb-4 text-white">{title}</h4>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Payment & App */}
      <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-sm text-slate-400 mb-3">We accept</div>
          <div className="flex flex-wrap gap-2">
            {['Visa', 'Mastercard', 'UPI', 'PayTM', 'Razorpay', 'NetBanking', 'EMI'].map(p => (
              <span key={p} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">{p}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm text-slate-400 mb-3">Download our app</div>
          <div className="flex gap-3">
            {['App Store', 'Google Play'].map(store => (
              <div key={store} className="px-4 py-2 rounded-xl border border-slate-700 text-sm font-medium hover:border-primary-500 cursor-pointer transition-colors flex items-center gap-2">
                {store === 'App Store' ? '🍎' : '🤖'} {store}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-slate-800 py-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <div>© {new Date().getFullYear()} ShopVerse Inc. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span>Made with ❤️ in India</span>
          <span>·</span>
          <span>Serving 50M+ happy customers</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
