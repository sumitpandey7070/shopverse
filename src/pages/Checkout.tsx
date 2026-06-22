import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowLeft, FiArrowRight, FiCheck, FiCreditCard, FiSmartphone,
  FiMapPin, FiPackage, FiLock, FiTruck, FiTag, FiShield
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { useCartStore } from '@/store/cartStore';
import Badge from '@/components/ui/Badge';

type Step = 'address' | 'payment' | 'review';
type PaymentMethod = 'card' | 'upi' | 'cod' | 'wallet';

const STEPS: { key: Step; label: string; icon: React.ReactNode }[] = [
  { key: 'address', label: 'Address', icon: <FiMapPin /> },
  { key: 'payment', label: 'Payment', icon: <FiCreditCard /> },
  { key: 'review', label: 'Review', icon: <FiPackage /> },
];

const STEP_INDEX: Record<Step, number> = { address: 0, payment: 1, review: 2 };

const UPI_APPS = [
  { id: 'gpay', name: 'Google Pay', color: 'from-blue-500 to-green-500', emoji: '🟢' },
  { id: 'phonepe', name: 'PhonePe', color: 'from-violet-500 to-purple-600', emoji: '🟣' },
  { id: 'paytm', name: 'Paytm', color: 'from-blue-400 to-sky-500', emoji: '🔵' },
  { id: 'bhim', name: 'BHIM UPI', color: 'from-orange-500 to-amber-500', emoji: '🟠' },
];

const WALLETS = [
  { id: 'amazonpay', name: 'Amazon Pay', balance: '₹520', emoji: '🛒' },
  { id: 'mobikwik', name: 'MobiKwik', balance: '₹1,200', emoji: '💙' },
];

function formatCardNumber(value: string) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotal, couponDiscount, couponCode, clearCart } = useCartStore();

  const [step, setStep] = useState<Step>('address');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [selectedUpi, setSelectedUpi] = useState('gpay');
  const [selectedWallet, setSelectedWallet] = useState('amazonpay');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Address form state
  const [address, setAddress] = useState({
    fullName: 'Arjun Sharma',
    phone: '9876543210',
    pincode: '400050',
    street: '12, Linking Road, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    type: 'home' as 'home' | 'work',
  });

  // Card form state
  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  // UPI form state
  const [upiId, setUpiId] = useState('');
  const [upiVerified, setUpiVerified] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const discountAmt = couponDiscount > 1 ? couponDiscount : subtotal * couponDiscount;
  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round((subtotal - discountAmt) * 0.18);
  const total = Math.round(subtotal - discountAmt + shipping + tax);

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    await new Promise(r => setTimeout(r, 2200)); // Simulate API call
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    clearCart();
    navigate('/order-confirmation', {
      state: {
        orderId,
        total,
        paymentMethod,
        address,
        items: items.map(i => ({ name: i.product.name, thumbnail: i.product.thumbnail, qty: i.quantity, price: i.product.price })),
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-2xl font-black dark:text-white text-slate-900 mb-3">Your cart is empty</h2>
        <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-violet-500 text-white rounded-xl font-bold hover:shadow-glow-primary transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-8"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/cart" className="flex items-center gap-2 text-sm dark:text-slate-400 text-slate-600 hover:text-primary-400 transition-colors">
          <FiArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>
        <h1 className="text-2xl font-black dark:text-white text-slate-900">Checkout</h1>
      </div>

      {/* Step Progress Bar */}
      <div className="flex items-center mb-10">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.key}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2
                ${STEP_INDEX[step] > i
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg'
                  : STEP_INDEX[step] === i
                    ? 'bg-primary-500 border-primary-500 text-white shadow-glow-primary'
                    : 'dark:bg-dark-card bg-slate-100 dark:border-dark-border border-slate-200 dark:text-slate-500 text-slate-400'
                }`}
              >
                {STEP_INDEX[step] > i ? <FiCheck className="w-5 h-5" /> : s.icon}
              </div>
              <span className={`text-xs font-semibold mt-1.5 ${STEP_INDEX[step] === i ? 'text-primary-400' : STEP_INDEX[step] > i ? 'text-emerald-400' : 'dark:text-slate-500 text-slate-400'}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 mb-5 rounded-full transition-all duration-500 ${STEP_INDEX[step] > i ? 'bg-emerald-500' : 'dark:bg-dark-border bg-slate-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Panel */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {/* ─── STEP 1: ADDRESS ─── */}
            {step === 'address' && (
              <motion.div key="address" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-6"
              >
                <h2 className="text-lg font-bold dark:text-white text-slate-800 mb-6 flex items-center gap-2">
                  <FiMapPin className="w-5 h-5 text-primary-400" /> Delivery Address
                </h2>

                {/* Address Type */}
                <div className="flex gap-3 mb-6">
                  {(['home', 'work'] as const).map(t => (
                    <button key={t} onClick={() => setAddress(a => ({ ...a, type: t }))}
                      className={`flex-1 py-2.5 rounded-xl border-2 font-semibold text-sm capitalize transition-all
                        ${address.type === t ? 'border-primary-500 bg-primary-500/10 text-primary-400' : 'dark:border-dark-border border-slate-200 dark:text-slate-400 text-slate-600 dark:hover:border-primary-500/50 hover:border-primary-300'}`}
                    >
                      {t === 'home' ? '🏠 Home' : '💼 Work'}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'fullName', label: 'Full Name', placeholder: 'John Doe', half: true },
                    { key: 'phone', label: 'Phone Number', placeholder: '98xxxxxxxx', half: true },
                    { key: 'pincode', label: 'PIN Code', placeholder: '400001', half: true },
                    { key: 'city', label: 'City', placeholder: 'Mumbai', half: true },
                    { key: 'street', label: 'Street Address', placeholder: 'House no, Street, Area', half: false },
                    { key: 'state', label: 'State', placeholder: 'Maharashtra', half: true },
                  ].map(field => (
                    <div key={field.key} className={field.half ? '' : 'sm:col-span-2'}>
                      <label className="text-xs font-semibold dark:text-slate-400 text-slate-600 mb-1.5 block">{field.label}</label>
                      <input
                        type="text"
                        value={address[field.key as keyof typeof address]}
                        onChange={e => setAddress(a => ({ ...a, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2.5 dark:bg-dark-surface bg-slate-50 border dark:border-dark-border border-slate-200 rounded-xl text-sm dark:text-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 dark:placeholder-slate-600 placeholder-slate-400"
                      />
                    </div>
                  ))}
                </div>

                <button onClick={() => setStep('payment')}
                  className="w-full mt-6 py-3.5 bg-gradient-to-r from-primary-500 to-violet-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-glow-primary transition-all"
                >
                  Continue to Payment <FiArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* ─── STEP 2: PAYMENT ─── */}
            {step === 'payment' && (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-6"
              >
                <h2 className="text-lg font-bold dark:text-white text-slate-800 mb-6 flex items-center gap-2">
                  <FiCreditCard className="w-5 h-5 text-primary-400" /> Payment Method
                </h2>

                {/* Method Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { id: 'card' as PaymentMethod, label: 'Card', icon: '💳' },
                    { id: 'upi' as PaymentMethod, label: 'UPI', icon: '📱' },
                    { id: 'wallet' as PaymentMethod, label: 'Wallet', icon: '👛' },
                    { id: 'cod' as PaymentMethod, label: 'Cash on Delivery', icon: '💵' },
                  ].map(m => (
                    <button key={m.id} onClick={() => setPaymentMethod(m.id)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all font-semibold text-xs
                        ${paymentMethod === m.id
                          ? 'border-primary-500 bg-primary-500/10 text-primary-400'
                          : 'dark:border-dark-border border-slate-200 dark:text-slate-400 text-slate-600 dark:hover:border-primary-500/40 hover:border-primary-300'}`}
                    >
                      <span className="text-2xl">{m.icon}</span>
                      {m.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {/* Card Payment */}
                  {paymentMethod === 'card' && (
                    <motion.div key="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                      {/* Card Visual */}
                      <div className="relative h-44 rounded-2xl overflow-hidden mb-2"
                        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #1a1a2e 100%)' }}
                      >
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        <div className="absolute top-5 left-5 right-5">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-1">
                              {/* Chip */}
                              <div className="w-10 h-7 rounded-md bg-amber-400/80 flex items-center justify-center">
                                <div className="w-6 h-5 border border-amber-600/50 rounded-sm grid grid-cols-2 gap-0.5 p-0.5">
                                  <div className="bg-amber-600/30 rounded-sm" /><div className="bg-amber-600/30 rounded-sm" />
                                  <div className="bg-amber-600/30 rounded-sm" /><div className="bg-amber-600/30 rounded-sm" />
                                </div>
                              </div>
                            </div>
                            <span className="text-white/80 text-sm font-bold italic">
                              {card.number.replace(/\d(?=.* \d)/g, '*').slice(-7) || 'VISA'}
                            </span>
                          </div>
                          <div className="text-white font-mono text-lg font-bold tracking-widest mb-3">
                            {card.number || '•••• •••• •••• ••••'}
                          </div>
                          <div className="flex justify-between">
                            <div>
                              <div className="text-white/50 text-[9px] uppercase">Card Holder</div>
                              <div className="text-white text-sm font-semibold">{card.name || 'YOUR NAME'}</div>
                            </div>
                            <div>
                              <div className="text-white/50 text-[9px] uppercase">Expires</div>
                              <div className="text-white text-sm font-semibold">{card.expiry || 'MM/YY'}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Accepted cards */}
                      <div className="flex items-center gap-2 text-xs dark:text-slate-400 text-slate-500 mb-2">
                        <FiShield className="w-3.5 h-3.5 text-emerald-400" />
                        Accepted: <span className="font-bold">VISA  •  Mastercard  •  RuPay  •  Amex</span>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="text-xs font-semibold dark:text-slate-400 text-slate-600 mb-1.5 block">Card Number</label>
                          <input type="text" value={card.number} onChange={e => setCard(c => ({ ...c, number: formatCardNumber(e.target.value) }))}
                            placeholder="1234 5678 9012 3456" maxLength={19}
                            className="w-full px-3 py-2.5 dark:bg-dark-surface bg-slate-50 border dark:border-dark-border border-slate-200 rounded-xl text-sm dark:text-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 font-mono tracking-wider dark:placeholder-slate-600"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold dark:text-slate-400 text-slate-600 mb-1.5 block">Cardholder Name</label>
                          <input type="text" value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value.toUpperCase() }))}
                            placeholder="AS ON CARD"
                            className="w-full px-3 py-2.5 dark:bg-dark-surface bg-slate-50 border dark:border-dark-border border-slate-200 rounded-xl text-sm dark:text-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 dark:placeholder-slate-600"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold dark:text-slate-400 text-slate-600 mb-1.5 block">Expiry Date</label>
                            <input type="text" value={card.expiry} onChange={e => setCard(c => ({ ...c, expiry: formatExpiry(e.target.value) }))}
                              placeholder="MM/YY" maxLength={5}
                              className="w-full px-3 py-2.5 dark:bg-dark-surface bg-slate-50 border dark:border-dark-border border-slate-200 rounded-xl text-sm dark:text-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 font-mono dark:placeholder-slate-600"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold dark:text-slate-400 text-slate-600 mb-1.5 block">CVV</label>
                            <input type="password" value={card.cvv} onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                              placeholder="•••" maxLength={4}
                              className="w-full px-3 py-2.5 dark:bg-dark-surface bg-slate-50 border dark:border-dark-border border-slate-200 rounded-xl text-sm dark:text-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 font-mono dark:placeholder-slate-600"
                            />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs dark:text-slate-500 text-slate-400 flex items-center gap-1 mt-1">
                        <FiLock className="w-3 h-3" /> Your card details are protected with 256-bit SSL encryption. This is a demo.
                      </p>
                    </motion.div>
                  )}

                  {/* UPI Payment */}
                  {paymentMethod === 'upi' && (
                    <motion.div key="upi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
                      <p className="text-sm dark:text-slate-400 text-slate-600">Select your UPI app or enter UPI ID</p>

                      {/* UPI Apps Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {UPI_APPS.map(app => (
                          <button key={app.id} onClick={() => { setSelectedUpi(app.id); setUpiVerified(false); }}
                            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all
                              ${selectedUpi === app.id ? 'border-primary-500 dark:bg-primary-500/10 bg-primary-50' : 'dark:border-dark-border border-slate-200 dark:hover:border-primary-500/40 hover:border-primary-300 dark:bg-dark-surface bg-slate-50'}`}
                          >
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-2xl shadow-md`}>
                              {app.emoji}
                            </div>
                            <span className={`text-xs font-bold ${selectedUpi === app.id ? 'text-primary-400' : 'dark:text-slate-300 text-slate-700'}`}>
                              {app.name}
                            </span>
                            {selectedUpi === app.id && <div className="w-4 h-4 rounded-full bg-primary-500 flex items-center justify-center"><FiCheck className="w-2.5 h-2.5 text-white" /></div>}
                          </button>
                        ))}
                      </div>

                      {/* Manual UPI ID */}
                      <div className="pt-2 border-t dark:border-dark-border border-slate-200">
                        <label className="text-xs font-semibold dark:text-slate-400 text-slate-600 mb-1.5 block">Or enter UPI ID manually</label>
                        <div className="flex gap-2">
                          <input type="text" value={upiId} onChange={e => { setUpiId(e.target.value); setUpiVerified(false); }}
                            placeholder="yourname@upi"
                            className="flex-1 px-3 py-2.5 dark:bg-dark-surface bg-slate-50 border dark:border-dark-border border-slate-200 rounded-xl text-sm dark:text-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 dark:placeholder-slate-600"
                          />
                          <button onClick={() => { if (upiId.includes('@')) setUpiVerified(true); }}
                            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${upiVerified ? 'bg-emerald-500 text-white' : 'bg-primary-500 text-white hover:bg-primary-600'}`}
                          >
                            {upiVerified ? <FiCheck className="w-4 h-4" /> : 'Verify'}
                          </button>
                        </div>
                        {upiVerified && (
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-emerald-400 font-semibold mt-1.5 flex items-center gap-1">
                            <FiCheck className="w-3 h-3" /> UPI ID verified successfully
                          </motion.p>
                        )}
                      </div>
                      <p className="text-xs dark:text-slate-500 text-slate-400 flex items-center gap-1">
                        <FiLock className="w-3 h-3" /> Payments are processed securely. This is a demo.
                      </p>
                    </motion.div>
                  )}

                  {/* Wallet */}
                  {paymentMethod === 'wallet' && (
                    <motion.div key="wallet" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                      {WALLETS.map(w => (
                        <button key={w.id} onClick={() => setSelectedWallet(w.id)}
                          className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all
                            ${selectedWallet === w.id ? 'border-primary-500 dark:bg-primary-500/10 bg-primary-50' : 'dark:border-dark-border border-slate-200 dark:bg-dark-surface bg-slate-50 dark:hover:border-primary-500/40'}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl dark:bg-dark-card bg-white flex items-center justify-center text-2xl shadow">
                              {w.emoji}
                            </div>
                            <div className="text-left">
                              <div className={`font-bold text-sm ${selectedWallet === w.id ? 'text-primary-400' : 'dark:text-white text-slate-800'}`}>{w.name}</div>
                              <div className="text-xs dark:text-slate-400 text-slate-600">Balance: <span className="text-emerald-400 font-semibold">{w.balance}</span></div>
                            </div>
                          </div>
                          {selectedWallet === w.id && <FiCheck className="w-5 h-5 text-primary-400" />}
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {/* COD */}
                  {paymentMethod === 'cod' && (
                    <motion.div key="cod" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <div className="flex flex-col items-center py-8 gap-4">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-5xl">
                          💵
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold dark:text-white text-slate-800 text-lg mb-1">Cash on Delivery</h3>
                          <p className="dark:text-slate-400 text-slate-600 text-sm max-w-xs">Pay in cash when your order arrives at your doorstep. COD fee of ₹29 may apply.</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-semibold">
                          <FiCheck className="w-4 h-4" /> COD Available for this order
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep('address')}
                    className="px-5 py-3 dark:bg-dark-surface bg-slate-100 dark:text-slate-300 text-slate-700 rounded-xl font-semibold hover:dark:bg-dark-muted hover:bg-slate-200 transition-colors flex items-center gap-2"
                  >
                    <FiArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button onClick={() => setStep('review')}
                    className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-violet-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-glow-primary transition-all"
                  >
                    Review Order <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 3: REVIEW ─── */}
            {step === 'review' && (
              <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                {/* Delivery Address Review */}
                <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold dark:text-white text-slate-800 flex items-center gap-2"><FiMapPin className="text-primary-400" /> Delivery Address</h3>
                    <button onClick={() => setStep('address')} className="text-xs text-primary-400 hover:underline font-semibold">Change</button>
                  </div>
                  <div className="text-sm dark:text-slate-300 text-slate-700">
                    <span className="font-semibold">{address.fullName}</span> · {address.phone}
                  </div>
                  <div className="text-sm dark:text-slate-400 text-slate-600 mt-0.5">
                    {address.street}, {address.city}, {address.state} — {address.pincode}
                  </div>
                  <Badge variant={address.type === 'home' ? 'success' : 'info'} size="xs" className="mt-2 capitalize">{address.type}</Badge>
                </div>

                {/* Payment Method Review */}
                <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold dark:text-white text-slate-800 flex items-center gap-2"><FiCreditCard className="text-primary-400" /> Payment</h3>
                    <button onClick={() => setStep('payment')} className="text-xs text-primary-400 hover:underline font-semibold">Change</button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl dark:bg-dark-surface bg-slate-100 flex items-center justify-center text-xl">
                      {paymentMethod === 'card' ? '💳' : paymentMethod === 'upi' ? '📱' : paymentMethod === 'wallet' ? '👛' : '💵'}
                    </div>
                    <div>
                      <div className="font-semibold dark:text-white text-slate-800 text-sm">
                        {paymentMethod === 'card' && (card.number ? `•••• •••• •••• ${card.number.replace(/\s/g, '').slice(-4)}` : 'Credit / Debit Card')}
                        {paymentMethod === 'upi' && (upiVerified ? upiId : UPI_APPS.find(a => a.id === selectedUpi)?.name || 'UPI')}
                        {paymentMethod === 'wallet' && WALLETS.find(w => w.id === selectedWallet)?.name}
                        {paymentMethod === 'cod' && 'Cash on Delivery'}
                      </div>
                      <div className="text-xs dark:text-slate-400 text-slate-600 mt-0.5 capitalize">{paymentMethod.replace('_', ' ')}</div>
                    </div>
                  </div>
                </div>

                {/* Items Review */}
                <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-5">
                  <h3 className="font-bold dark:text-white text-slate-800 mb-4 flex items-center gap-2"><FiPackage className="text-primary-400" /> Items ({items.length})</h3>
                  <div className="space-y-3">
                    {items.map(item => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <img src={item.product.thumbnail} alt={item.product.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border dark:border-dark-border border-slate-200" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold dark:text-white text-slate-800 text-sm line-clamp-1">{item.product.name}</div>
                          <div className="text-xs dark:text-slate-400 text-slate-600">Qty: {item.quantity}</div>
                        </div>
                        <div className="font-bold dark:text-white text-slate-900 text-sm">₹{(item.product.price * item.quantity).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Place Order */}
                <div className="flex gap-3">
                  <button onClick={() => setStep('payment')}
                    className="px-5 py-3 dark:bg-dark-surface bg-slate-100 dark:text-slate-300 text-slate-700 rounded-xl font-semibold hover:dark:bg-dark-muted hover:bg-slate-200 transition-colors flex items-center gap-2"
                  >
                    <FiArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <motion.button
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-4 bg-gradient-to-r from-primary-500 to-violet-500 text-white rounded-xl font-black text-base flex items-center justify-center gap-2 hover:shadow-glow-primary transition-all disabled:opacity-70"
                  >
                    {isPlacingOrder ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Placing Order…
                      </>
                    ) : (
                      <>
                        <HiSparkles className="w-5 h-5" />
                        Place Order — ₹{total.toLocaleString()}
                      </>
                    )}
                  </motion.button>
                </div>

                <p className="text-center text-xs dark:text-slate-500 text-slate-400 flex items-center justify-center gap-2">
                  <FiLock className="w-3.5 h-3.5" /> 256-bit SSL secured · By placing order you agree to our Terms
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-4">
          <div className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 p-5 sticky top-24">
            <h3 className="font-bold dark:text-white text-slate-800 mb-4">Order Summary</h3>

            {/* Items */}
            <div className="space-y-3 mb-4 max-h-52 overflow-y-auto scrollbar-hide">
              {items.map(item => (
                <div key={item.product.id} className="flex items-center gap-2">
                  <div className="relative">
                    <img src={item.product.thumbnail} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{item.quantity}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium dark:text-white text-slate-800 line-clamp-1">{item.product.name}</div>
                  </div>
                  <span className="text-xs font-bold dark:text-white text-slate-900">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t dark:border-dark-border border-slate-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between dark:text-slate-300 text-slate-700">
                <span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span>
              </div>
              {discountAmt > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span className="flex items-center gap-1"><FiTag className="w-3 h-3" /> {couponCode}</span>
                  <span>−₹{Math.round(discountAmt).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between dark:text-slate-300 text-slate-700">
                <span className="flex items-center gap-1"><FiTruck className="w-3 h-3" /> Shipping</span>
                <span>{shipping === 0 ? <span className="text-emerald-400">FREE</span> : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between dark:text-slate-300 text-slate-700">
                <span>GST (18%)</span><span>₹{tax.toLocaleString()}</span>
              </div>
              <div className="border-t dark:border-dark-border border-slate-200 pt-2 flex justify-between font-black text-base dark:text-white text-slate-900">
                <span>Total</span><span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { icon: '🔒', text: 'Secure Payment' },
                { icon: '🚚', text: 'Fast Delivery' },
                { icon: '↩️', text: '30-Day Return' },
                { icon: '✅', text: 'Genuine Products' },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-1.5 text-xs dark:text-slate-400 text-slate-600">
                  <span>{b.icon}</span>{b.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
