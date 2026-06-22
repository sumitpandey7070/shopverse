import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiArrowRight, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import type { Product } from '@/types';
import Modal from '@/components/ui/Modal';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  if (!product) return null;

  const inWish = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, qty, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Modal isOpen={!!product} onClose={onClose} size="xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Images */}
        <div className="p-6">
          <div className="zoom-container rounded-2xl overflow-hidden bg-slate-100 dark:bg-dark-surface aspect-square mb-4">
            <img src={product.images[selectedImg] || product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === selectedImg ? 'border-primary-500' : 'dark:border-dark-border border-slate-200'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-6 flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <div className="text-xs font-semibold dark:text-primary-400 text-primary-600 mb-1">{product.brand}</div>
              <h2 className="text-xl font-bold dark:text-white text-slate-900 leading-snug">{product.name}</h2>
            </div>
            <button
              onClick={() => toggleItem(product)}
              className={`p-2 rounded-xl border flex-shrink-0 transition-all ${inWish ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'dark:border-dark-border border-slate-200 dark:text-slate-400 text-slate-500 hover:border-red-400 hover:text-red-400'}`}
            >
              <FiHeart className={`w-5 h-5 ${inWish ? 'fill-current' : ''}`} />
            </button>
          </div>

          <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" className="mb-4" />

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-black dark:text-white text-slate-900">₹{product.price.toLocaleString()}</span>
            {product.discount > 0 && (
              <>
                <span className="text-base dark:text-slate-500 text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                <Badge variant="success">{product.discount}% off</Badge>
              </>
            )}
          </div>

          <p className="text-sm dark:text-slate-400 text-slate-600 mb-5">{product.shortDescription}</p>

          {/* Colors */}
          {product.colors && (
            <div className="mb-4">
              <div className="text-xs font-semibold dark:text-slate-300 text-slate-700 mb-2">Color</div>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map(c => (
                  <button
                    key={c.value}
                    onClick={() => setSelectedColor(c.value)}
                    disabled={!c.available}
                    title={c.label}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === c.value ? 'border-primary-500 scale-110' : 'dark:border-dark-border border-slate-300'} ${!c.available ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105'}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && (
            <div className="mb-4">
              <div className="text-xs font-semibold dark:text-slate-300 text-slate-700 mb-2">Size</div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${selectedSize === s ? 'bg-primary-500 border-primary-500 text-white' : 'dark:border-dark-border border-slate-300 dark:text-slate-300 text-slate-600 dark:hover:border-primary-500 hover:border-primary-400'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + Cart */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center dark:bg-dark-card bg-slate-100 rounded-xl overflow-hidden border dark:border-dark-border border-slate-200">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 dark:text-white text-slate-700 dark:hover:bg-dark-muted hover:bg-slate-200 text-lg font-bold transition-colors">−</button>
              <span className="px-4 py-2 dark:text-white text-slate-800 font-semibold min-w-[2.5rem] text-center">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 dark:text-white text-slate-700 dark:hover:bg-dark-muted hover:bg-slate-200 text-lg font-bold transition-colors">+</button>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${added ? 'bg-emerald-500 text-white' : 'bg-gradient-to-r from-primary-500 to-violet-500 text-white hover:shadow-glow-primary'}`}
            >
              <FiShoppingCart className="w-4 h-4" />
              {added ? 'Added!' : 'Add to Cart'}
            </motion.button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-2 text-center mb-5">
            {[
              { icon: <FiTruck className="w-4 h-4" />, text: product.freeShipping ? 'Free Delivery' : 'Fast Delivery' },
              { icon: <FiShield className="w-4 h-4" />, text: 'Genuine Product' },
              { icon: <FiRefreshCw className="w-4 h-4" />, text: 'Easy Returns' },
            ].map(f => (
              <div key={f.text} className="p-2 dark:bg-dark-card bg-slate-50 rounded-xl">
                <div className="flex items-center justify-center text-primary-400 mb-1">{f.icon}</div>
                <div className="text-xs dark:text-slate-400 text-slate-600">{f.text}</div>
              </div>
            ))}
          </div>

          <Link to={`/product/${product.id}`} onClick={onClose} className="flex items-center justify-center gap-2 text-primary-400 hover:text-primary-300 text-sm font-semibold transition-colors">
            View Full Details <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default QuickViewModal;
