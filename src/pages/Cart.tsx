import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiTag, FiTruck, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { useCartStore } from '@/store/cartStore';
import Badge from '@/components/ui/Badge';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotal, couponCode, couponDiscount, applyCoupon, removeCoupon } = useCartStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const discountAmt = couponDiscount > 1 ? couponDiscount : subtotal * couponDiscount;
  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round((subtotal - discountAmt) * 0.18);
  const total = subtotal - discountAmt + shipping + tax;

  const handleApplyCoupon = () => {
    const ok = applyCoupon(couponInput);
    setCouponMsg(ok ? { type: 'success', text: 'Coupon applied successfully!' } : { type: 'error', text: 'Invalid or expired coupon code.' });
    setTimeout(() => setCouponMsg(null), 3000);
  };

  if (items.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-500/20 to-violet-500/20 flex items-center justify-center mx-auto mb-6">
          <FiShoppingBag className="w-12 h-12 text-primary-400" />
        </div>
        <h2 className="text-2xl font-black dark:text-white text-slate-900 mb-2">Your cart is empty</h2>
        <p className="dark:text-slate-400 text-slate-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-violet-500 text-white rounded-xl font-bold hover:shadow-glow-primary transition-all">
          <FiShoppingBag className="w-4 h-4" />
          Start Shopping
        </Link>
        <div className="mt-8">
          <p className="text-sm dark:text-slate-500 text-slate-400 mb-4">Try these popular coupons:</p>
          <div className="flex justify-center gap-2 flex-wrap">
            {['SAVE200', 'FLAT10', 'WELCOME500'].map(c => (
              <span key={c} className="px-3 py-1 rounded-lg bg-primary-500/10 text-primary-400 text-xs font-mono font-bold border border-primary-500/20">{c}</span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/products" className="flex items-center gap-2 text-sm dark:text-slate-400 text-slate-600 hover:text-primary-400 transition-colors">
          <FiArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
        <h1 className="text-2xl font-black dark:text-white text-slate-900">
          Shopping Cart
          <span className="ml-2 text-base font-normal dark:text-slate-400 text-slate-600">({items.length} item{items.length !== 1 ? 's' : ''})</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map(item => (
              <motion.div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex gap-4 p-4 dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 hover:shadow-card-dark transition-all"
              >
                {/* Image */}
                <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 dark:bg-dark-surface">
                    <img src={item.product.thumbnail} alt={item.product.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold dark:text-primary-400 text-primary-600">{item.product.brand}</span>
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-bold dark:text-white text-slate-800 text-sm sm:text-base leading-snug line-clamp-2 hover:text-primary-400 transition-colors">{item.product.name}</h3>
                      </Link>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        {item.selectedColor && <span className="text-xs dark:text-slate-400 text-slate-500">Color: {item.product.colors?.find(c => c.value === item.selectedColor)?.label || item.selectedColor}</span>}
                        {item.selectedSize && <span className="text-xs dark:text-slate-400 text-slate-500">Size: {item.selectedSize}</span>}
                        {item.product.freeShipping && <Badge variant="success" size="xs">Free Delivery</Badge>}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 rounded-xl dark:hover:bg-dark-muted hover:bg-red-50 text-red-400 transition-all flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity */}
                    <div className="flex items-center dark:bg-dark-surface bg-slate-100 rounded-xl overflow-hidden border dark:border-dark-border border-slate-200">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-2 dark:hover:bg-dark-muted hover:bg-slate-200 transition-colors dark:text-white text-slate-700"
                      >
                        <FiMinus className="w-3 h-3" />
                      </button>
                      <span className="px-4 py-2 dark:text-white text-slate-800 font-bold min-w-[2.5rem] text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-2 dark:hover:bg-dark-muted hover:bg-slate-200 transition-colors dark:text-white text-slate-700"
                      >
                        <FiPlus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="font-black dark:text-white text-slate-900 text-base">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </div>
                      {item.product.discount > 0 && (
                        <div className="text-xs dark:text-slate-500 text-slate-400 line-through">
                          ₹{(item.product.originalPrice * item.quantity).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          {/* Coupon */}
          <div className="p-5 dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200">
            <h3 className="font-bold dark:text-white text-slate-800 mb-3 flex items-center gap-2">
              <FiTag className="w-4 h-4 text-primary-400" />
              Coupon Code
            </h3>
            {couponCode ? (
              <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <div className="flex items-center gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-400 font-mono">{couponCode}</span>
                </div>
                <button onClick={removeCoupon} className="text-xs text-red-400 hover:underline">Remove</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="Enter code (e.g. SAVE200)"
                  className="flex-1 px-3 py-2 dark:bg-dark-surface bg-slate-100 rounded-xl border dark:border-dark-border border-slate-200 text-sm dark:text-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 dark:placeholder-slate-500 placeholder-slate-400"
                  onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-bold hover:bg-primary-600 transition-colors whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
            )}
            <AnimatePresence>
              {couponMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-2 text-xs font-medium ${couponMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}
                >
                  {couponMsg.text}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['SAVE200', 'FLAT10', 'WELCOME500', 'SHOPVERSE20'].map(c => (
                <button
                  key={c}
                  onClick={() => { setCouponInput(c); }}
                  className="text-xs px-2 py-1 rounded-lg dark:bg-dark-surface bg-slate-100 text-primary-400 font-mono border dark:border-dark-border border-slate-200 hover:border-primary-500/50 transition-colors"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="p-5 dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200">
            <h3 className="font-bold dark:text-white text-slate-800 mb-4">Price Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between dark:text-slate-300 text-slate-700">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {discountAmt > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Discount</span>
                  <span>−₹{Math.round(discountAmt).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between dark:text-slate-300 text-slate-700">
                <span className="flex items-center gap-1"><FiTruck className="w-3.5 h-3.5" /> Shipping</span>
                <span>{shipping === 0 ? <span className="text-emerald-400">FREE</span> : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between dark:text-slate-300 text-slate-700">
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div className="border-t dark:border-dark-border border-slate-200 pt-3 flex justify-between font-black text-base dark:text-white text-slate-900">
                <span>Total</span>
                <span>₹{Math.round(total).toLocaleString()}</span>
              </div>
            </div>

            {discountAmt > 0 && (
              <div className="mt-3 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 font-medium text-center">
                🎉 You're saving ₹{Math.round(discountAmt).toLocaleString()} on this order!
              </div>
            )}

            {shipping > 0 && (
              <div className="mt-2 text-xs dark:text-slate-400 text-slate-600 text-center">
                Add ₹{(999 - subtotal).toLocaleString()} more to get free shipping
              </div>
            )}

            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-5 py-3.5 bg-gradient-to-r from-primary-500 to-violet-500 text-white rounded-xl font-black text-base hover:shadow-glow-primary transition-all flex items-center justify-center gap-2"
            >
              <HiSparkles className="w-5 h-5" />
              Proceed to Checkout
            </button>

            <div className="mt-3 flex items-center justify-center gap-4 text-xs dark:text-slate-500 text-slate-400">
              <span>🔒 Secure Checkout</span>
              <span>·</span>
              <span>256-bit SSL</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
