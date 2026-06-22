import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiTrash2, FiArrowRight } from 'react-icons/fi';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';

const Wishlist: React.FC = () => {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const handleMoveToCart = (productId: string) => {
    const item = items.find(i => i.product.id === productId);
    if (item) {
      addItem(item.product);
      removeItem(productId);
      setAddedIds(prev => [...prev, productId]);
    }
  };

  if (items.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-red-500/20 to-rose-500/20 flex items-center justify-center mx-auto mb-6">
          <FiHeart className="w-12 h-12 text-red-400" />
        </div>
        <h2 className="text-2xl font-black dark:text-white text-slate-900 mb-2">Your wishlist is empty</h2>
        <p className="dark:text-slate-400 text-slate-600 mb-8">Save items you love to your wishlist and revisit them anytime.</p>
        <Link to="/products" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-violet-500 text-white rounded-xl font-bold hover:shadow-glow-primary transition-all">
          Discover Products
          <FiArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black dark:text-white text-slate-900">
            My Wishlist
            <span className="ml-2 text-base font-normal dark:text-slate-400 text-slate-600">({items.length} items)</span>
          </h1>
          <p className="text-sm dark:text-slate-400 text-slate-600 mt-1">Items you love, saved for later</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => {
            const p = item.product;
            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ delay: i * 0.04 }}
                className="group dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 overflow-hidden hover:shadow-card-dark transition-all duration-300"
              >
                <Link to={`/product/${p.id}`} className="block relative aspect-square bg-slate-100 dark:bg-dark-surface overflow-hidden">
                  <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  {p.discount > 0 && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="success" size="xs">{p.discount}% OFF</Badge>
                    </div>
                  )}
                  <button
                    onClick={e => { e.preventDefault(); removeItem(p.id); }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-xl bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </Link>

                <div className="p-3">
                  <div className="text-xs font-semibold dark:text-primary-400 text-primary-600 mb-0.5">{p.brand}</div>
                  <Link to={`/product/${p.id}`}>
                    <h3 className="font-semibold dark:text-white text-slate-800 text-xs sm:text-sm line-clamp-2 mb-1.5 hover:text-primary-400 transition-colors">{p.name}</h3>
                  </Link>
                  <StarRating rating={p.rating} reviewCount={p.reviewCount} size="sm" showCount={false} className="mb-2" />
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="font-black dark:text-white text-slate-900 text-sm">₹{p.price.toLocaleString()}</span>
                    {p.discount > 0 && <span className="text-xs dark:text-slate-500 text-slate-400 line-through">₹{p.originalPrice.toLocaleString()}</span>}
                  </div>
                  <button
                    onClick={() => handleMoveToCart(p.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-primary-500 to-violet-500 text-white hover:shadow-glow-primary transition-all"
                  >
                    <FiShoppingCart className="w-3.5 h-3.5" />
                    Move to Cart
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Wishlist;
