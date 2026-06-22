import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye, FiZap } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  viewMode?: 'grid' | 'list';
  index?: number;
}

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, viewMode = 'grid', index = 0 }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWish = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 overflow-hidden hover:shadow-card-dark transition-all duration-300 flex"
      >
        <Link to={`/product/${product.id}`} className="flex w-full">
          <div className="zoom-container w-48 h-48 flex-shrink-0 bg-slate-100 dark:bg-dark-surface">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover"
              onLoad={() => setImgLoaded(true)}
            />
          </div>
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs dark:text-slate-400 text-slate-500 font-medium mb-1">{product.brand}</div>
                  <h3 className="font-semibold dark:text-white text-slate-800 text-base line-clamp-2 mb-2">{product.name}</h3>
                  <p className="text-sm dark:text-slate-400 text-slate-600 line-clamp-2">{product.shortDescription}</p>
                </div>
                <button onClick={handleWishlist} className={`p-2 rounded-xl border transition-colors flex-shrink-0 ${inWish ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'dark:border-dark-border border-slate-200 dark:text-slate-400 text-slate-500 dark:hover:border-red-500/30 hover:border-red-300'}`}>
                  <FiHeart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
                </button>
              </div>
              <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" className="mt-3" />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold dark:text-white text-slate-900">{formatPrice(product.price)}</span>
                {product.discount > 0 && (
                  <>
                    <span className="text-sm dark:text-slate-500 text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
                    <Badge variant="success">{product.discount}% off</Badge>
                  </>
                )}
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  addedToCart
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gradient-to-r from-primary-500 to-violet-500 text-white hover:shadow-glow-primary'
                }`}
              >
                <FiShoppingCart className="w-4 h-4" />
                {addedToCart ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200 overflow-hidden hover:shadow-card-dark hover:dark:border-primary-500/30 hover:border-primary-300/50 transition-all duration-300"
    >
      <Link to={`/product/${product.id}`}>
        {/* Image */}
        <div className="relative zoom-container aspect-square bg-slate-100 dark:bg-dark-surface overflow-hidden">
          {!imgLoaded && <div className="skeleton absolute inset-0" />}
          <img
            src={product.thumbnail}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && <Badge variant="primary" size="xs">NEW</Badge>}
            {product.isFlashSale && <Badge variant="amber" size="xs"><FiZap className="w-2.5 h-2.5 mr-0.5 inline" />SALE</Badge>}
            {product.isBestSeller && <Badge variant="success" size="xs">BEST SELLER</Badge>}
            {product.discount >= 20 && !product.isFlashSale && <Badge variant="danger" size="xs">{product.discount}% OFF</Badge>}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlist}
              className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg transition-all backdrop-blur-sm
                ${inWish ? 'bg-red-500 text-white' : 'dark:bg-dark-surface/90 bg-white/90 dark:text-slate-300 text-slate-700 hover:bg-red-500 hover:text-white'}`}
            >
              <FiHeart className={`w-3.5 h-3.5 ${inWish ? 'fill-current' : ''}`} />
            </motion.button>
            {onQuickView && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleQuickView}
                className="w-8 h-8 rounded-xl flex items-center justify-center dark:bg-dark-surface/90 bg-white/90 dark:text-slate-300 text-slate-700 hover:bg-primary-500 hover:text-white shadow-lg transition-all backdrop-blur-sm"
              >
                <FiEye className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </div>

          {/* Add to Cart Overlay */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className={`w-full py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all
                ${addedToCart
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gradient-to-r from-primary-500 to-violet-500 text-white hover:from-primary-600 hover:to-violet-600'
                }`}
            >
              <FiShoppingCart className="w-4 h-4" />
              {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold dark:text-primary-400 text-primary-600">{product.brand}</span>
            {product.freeShipping && (
              <span className="text-xs dark:text-emerald-400 text-emerald-600 font-medium">Free Delivery</span>
            )}
          </div>
          <h3 className="font-semibold dark:text-white text-slate-800 text-sm line-clamp-2 mb-2 leading-snug">{product.name}</h3>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" className="mb-2" />
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-bold dark:text-white text-slate-900">{formatPrice(product.price)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-xs dark:text-slate-500 text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="text-xs font-semibold text-emerald-400">{product.discount}% off</span>
              </>
            )}
          </div>
          {product.stock < 10 && (
            <div className="mt-1.5 text-xs text-orange-400 font-medium flex items-center gap-1">
              <HiSparkles className="w-3 h-3" />
              Only {product.stock} left in stock
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
