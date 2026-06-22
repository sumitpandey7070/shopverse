import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiPackage, FiMapPin, FiCreditCard, FiTruck, FiArrowRight, FiHome } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

interface OrderItem {
  name: string;
  thumbnail: string;
  qty: number;
  price: number;
}

interface OrderState {
  orderId: string;
  total: number;
  paymentMethod: string;
  address: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
}

const PAYMENT_LABELS: Record<string, string> = {
  card: '💳 Credit / Debit Card',
  upi: '📱 UPI Payment',
  wallet: '👛 Digital Wallet',
  cod: '💵 Cash on Delivery',
};

const STEPS = [
  { label: 'Order Confirmed', desc: 'Your order has been placed', icon: '✅', done: true },
  { label: 'Processing', desc: 'Seller is preparing your order', icon: '📦', done: true },
  { label: 'Shipped', desc: 'Expected in 1-2 days', icon: '🚚', done: false },
  { label: 'Out for Delivery', desc: 'Arriving today', icon: '🛵', done: false },
  { label: 'Delivered', desc: 'Enjoy your purchase!', icon: '🎉', done: false },
];

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as OrderState | undefined;

  useEffect(() => {
    if (!state) navigate('/');
  }, [state, navigate]);

  if (!state) return null;

  const { orderId, total, paymentMethod, address, items } = state;

  const estimatedDelivery = new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long',
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 py-12"
    >
      {/* ── SUCCESS HERO ── */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
          className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-4 border-emerald-500/40 flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <FiCheckCircle className="w-14 h-14 text-emerald-400" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h1 className="text-3xl sm:text-4xl font-black dark:text-white text-slate-900 mb-3">
            🎉 Order Placed!
          </h1>
          <p className="dark:text-slate-400 text-slate-600 text-lg mb-2">
            Thank you, <span className="font-bold dark:text-white text-slate-800">{address.fullName}</span>!
          </p>
          <p className="dark:text-slate-400 text-slate-600 text-sm">
            Your order has been confirmed and is being prepared.
          </p>
        </motion.div>

        {/* Order ID Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 dark:bg-dark-card bg-slate-100 rounded-2xl border dark:border-dark-border border-slate-200"
        >
          <HiSparkles className="w-4 h-4 text-primary-400" />
          <span className="text-sm dark:text-slate-400 text-slate-600">Order ID:</span>
          <span className="font-black dark:text-white text-slate-900 font-mono text-base">{orderId}</span>
        </motion.div>
      </div>

      {/* ── ORDER TRACKER ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="dark:bg-dark-card bg-white rounded-3xl border dark:border-dark-border border-slate-200 p-6 mb-6"
      >
        <h2 className="font-bold dark:text-white text-slate-800 text-lg mb-6 flex items-center gap-2">
          <FiTruck className="text-primary-400" /> Order Tracking
        </h2>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-5 top-5 bottom-5 w-0.5 dark:bg-dark-border bg-slate-200" />

          <div className="space-y-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-start gap-4 relative"
              >
                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 border-2 transition-all
                  ${s.done
                    ? i === 1
                      ? 'bg-primary-500 border-primary-500 animate-pulse shadow-glow-primary'
                      : 'bg-emerald-500 border-emerald-500'
                    : 'dark:bg-dark-surface bg-slate-100 dark:border-dark-border border-slate-300'
                  }`}
                >
                  {s.icon}
                </div>
                <div className="pt-1.5">
                  <div className={`font-bold text-sm ${s.done ? (i === 1 ? 'text-primary-400' : 'dark:text-white text-slate-800') : 'dark:text-slate-500 text-slate-400'}`}>
                    {s.label}
                    {i === 1 && <span className="ml-2 text-xs font-normal text-primary-400 animate-pulse">● In Progress</span>}
                  </div>
                  <div className={`text-xs mt-0.5 ${s.done ? 'dark:text-slate-400 text-slate-600' : 'dark:text-slate-600 text-slate-400'}`}>
                    {s.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-5 pt-4 border-t dark:border-dark-border border-slate-200 flex items-center gap-2 text-sm">
          <FiPackage className="w-4 h-4 text-primary-400" />
          <span className="dark:text-slate-400 text-slate-600">Estimated Delivery:</span>
          <span className="font-bold dark:text-white text-slate-800">{estimatedDelivery}</span>
        </div>
      </motion.div>

      {/* ── DETAILS GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Delivery Address */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-5"
        >
          <h3 className="font-bold dark:text-white text-slate-800 mb-3 flex items-center gap-2 text-sm">
            <FiMapPin className="text-primary-400" /> Delivery Address
          </h3>
          <div className="text-sm">
            <div className="font-semibold dark:text-white text-slate-800">{address.fullName}</div>
            <div className="dark:text-slate-400 text-slate-600 mt-0.5">{address.street}</div>
            <div className="dark:text-slate-400 text-slate-600">{address.city}, {address.state} — {address.pincode}</div>
            <div className="dark:text-slate-400 text-slate-600 mt-0.5">📞 {address.phone}</div>
          </div>
        </motion.div>

        {/* Payment Info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-5"
        >
          <h3 className="font-bold dark:text-white text-slate-800 mb-3 flex items-center gap-2 text-sm">
            <FiCreditCard className="text-primary-400" /> Payment Details
          </h3>
          <div className="text-sm space-y-1.5">
            <div className="flex items-center gap-2 dark:text-white text-slate-800 font-medium">
              {PAYMENT_LABELS[paymentMethod] || paymentMethod}
            </div>
            <div className="flex items-center justify-between dark:text-slate-400 text-slate-600">
              <span>Amount Paid</span>
              <span className="font-black dark:text-white text-slate-900 text-base">₹{total.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <FiCheckCircle className="w-3.5 h-3.5" />
              {paymentMethod === 'cod' ? 'Collect at delivery' : 'Payment Successful'}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── ITEMS ORDERED ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-5 mb-8"
      >
        <h3 className="font-bold dark:text-white text-slate-800 mb-4 flex items-center gap-2">
          <FiPackage className="text-primary-400" /> Items Ordered
        </h3>
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.05 }}
              className="flex items-center gap-3 p-3 dark:bg-dark-surface bg-slate-50 rounded-xl"
            >
              <img src={item.thumbnail} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border dark:border-dark-border border-slate-200" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold dark:text-white text-slate-800 text-sm line-clamp-1">{item.name}</div>
                <div className="text-xs dark:text-slate-400 text-slate-600 mt-0.5">Qty: {item.qty}</div>
              </div>
              <div className="text-right">
                <div className="font-bold dark:text-white text-slate-900 text-sm">₹{(item.price * item.qty).toLocaleString()}</div>
                <div className="text-xs dark:text-slate-500 text-slate-400">₹{item.price.toLocaleString()} each</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Row */}
        <div className="mt-4 pt-4 border-t dark:border-dark-border border-slate-200 flex justify-between items-center">
          <span className="font-bold dark:text-white text-slate-800">Total Paid</span>
          <span className="text-xl font-black dark:text-white text-slate-900">₹{total.toLocaleString()}</span>
        </div>
      </motion.div>

      {/* ── CTA BUTTONS ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Link
          to="/dashboard/user"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary-500 to-violet-500 text-white rounded-xl font-bold hover:shadow-glow-primary transition-all"
        >
          <FiPackage className="w-4 h-4" /> Track My Orders <FiArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 dark:bg-dark-card bg-white border dark:border-dark-border border-slate-200 dark:text-slate-300 text-slate-700 rounded-xl font-bold hover:border-primary-500/50 transition-all"
        >
          <FiHome className="w-4 h-4" /> Continue Shopping
        </Link>
      </motion.div>

      {/* Confetti-like bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-xs dark:text-slate-500 text-slate-400 mt-6"
      >
        A confirmation has been sent to your email · Order ID: <span className="font-mono font-bold dark:text-slate-300 text-slate-600">{orderId}</span>
      </motion.p>
    </motion.div>
  );
};

export default OrderConfirmation;
