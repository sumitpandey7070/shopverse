import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiShoppingCart, FiHeart, FiShare2, FiTruck, FiShield, FiRefreshCw,
  FiChevronRight, FiMinus, FiPlus, FiCheck, FiStar
} from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { products, reviews } from '@/data';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/product/QuickViewModal';
import type { Product } from '@/types';

const TABS = ['Description', 'Specifications', 'Reviews'] as const;
type Tab = typeof TABS[number];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useMemo(() => products.find(p => p.id === id), [id]);

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.colors?.[0]?.value);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>('Description');
  const [addedToCart, setAddedToCart] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold dark:text-white text-slate-900 mb-4">Product Not Found</h2>
        <Link to="/products" className="text-primary-400 hover:underline">← Back to Products</Link>
      </div>
    );
  }

  const inWish = isInWishlist(product.id);
  const productReviews = reviews.filter(r => r.productId === product.id);
  const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5);
  const boughtTogether = products.filter(p => p.brand === product.brand && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, qty, selectedColor, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const ratingBreakdown = [5, 4, 3, 2, 1].map(r => ({
    stars: r,
    count: productReviews.filter(rev => Math.floor(rev.rating) === r).length,
    pct: productReviews.length ? (productReviews.filter(rev => Math.floor(rev.rating) === r).length / productReviews.length) * 100 : 0,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm dark:text-slate-400 text-slate-600 mb-8 flex-wrap">
        <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
        <FiChevronRight className="w-4 h-4 flex-shrink-0" />
        <Link to="/products" className="hover:text-primary-400 transition-colors">Products</Link>
        <FiChevronRight className="w-4 h-4 flex-shrink-0" />
        <Link to={`/products?category=${product.category}`} className="hover:text-primary-400 transition-colors capitalize">{product.category}</Link>
        <FiChevronRight className="w-4 h-4 flex-shrink-0" />
        <span className="dark:text-white text-slate-800 font-medium line-clamp-1">{product.name}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image with Zoom */}
          <div
            className="relative rounded-3xl overflow-hidden aspect-square bg-slate-100 dark:bg-dark-card border dark:border-dark-border border-slate-200 cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleImageMouseMove}
          >
            <img
              src={product.images[selectedImg] || product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300"
              style={isZoomed ? { transform: 'scale(1.5)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && <Badge variant="primary">NEW</Badge>}
              {product.isFlashSale && <Badge variant="amber"><HiSparkles className="w-3 h-3 mr-1 inline" />Flash Sale</Badge>}
              {product.discount >= 20 && <Badge variant="danger">{product.discount}% OFF</Badge>}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(i)}
                className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${i === selectedImg ? 'border-primary-500 shadow-glow-primary' : 'dark:border-dark-border border-slate-200 hover:border-primary-500/50'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          {/* Brand + Title */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold dark:text-primary-400 text-primary-600">{product.brand}</span>
              {product.isBestSeller && <Badge variant="success">Best Seller</Badge>}
              {product.isNew && <Badge variant="primary">New Arrival</Badge>}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black dark:text-white text-slate-900 leading-tight">{product.name}</h1>
          </div>

          {/* Rating */}
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />

          {/* Price */}
          <div className="p-4 dark:bg-dark-card bg-slate-50 rounded-2xl border dark:border-dark-border border-slate-200">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-black dark:text-white text-slate-900">₹{product.price.toLocaleString()}</span>
              {product.discount > 0 && (
                <>
                  <span className="text-lg dark:text-slate-500 text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <Badge variant="success" size="md">{product.discount}% off</Badge>
                </>
              )}
            </div>
            {product.discount > 0 && (
              <div className="text-sm text-emerald-400 font-semibold">
                You save ₹{(product.originalPrice - product.price).toLocaleString()}!
              </div>
            )}
          </div>

          {/* Short Description */}
          <p className="dark:text-slate-300 text-slate-700 leading-relaxed">{product.shortDescription}</p>

          {/* Colors */}
          {product.colors && (
            <div>
              <div className="text-sm font-bold dark:text-white text-slate-800 mb-3">
                Color: <span className="font-normal dark:text-slate-400 text-slate-600">{product.colors.find(c => c.value === selectedColor)?.label}</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map(c => (
                  <button
                    key={c.value}
                    onClick={() => c.available && setSelectedColor(c.value)}
                    title={c.label}
                    disabled={!c.available}
                    className={`relative w-10 h-10 rounded-full border-2 transition-all group
                      ${selectedColor === c.value ? 'border-primary-500 scale-110 shadow-glow-primary' : 'dark:border-dark-border border-slate-300 hover:scale-110'}
                      ${!c.available ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                    style={{ backgroundColor: c.hex }}
                  >
                    {selectedColor === c.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FiCheck className="w-4 h-4 text-white drop-shadow" />
                      </div>
                    )}
                    {!c.available && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30">
                        <span className="text-white text-xs">✕</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && (
            <div>
              <div className="text-sm font-bold dark:text-white text-slate-800 mb-3">Size</div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all
                      ${selectedSize === s ? 'bg-primary-500 border-primary-500 text-white shadow-glow-primary' : 'dark:border-dark-border border-slate-200 dark:text-slate-300 text-slate-700 dark:hover:border-primary-500/50 hover:border-primary-300'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center dark:bg-dark-card bg-slate-100 rounded-xl overflow-hidden border dark:border-dark-border border-slate-200">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-3 dark:hover:bg-dark-muted hover:bg-slate-200 transition-colors dark:text-white text-slate-800">
                <FiMinus className="w-4 h-4" />
              </button>
              <span className="px-5 py-3 dark:text-white text-slate-800 font-bold min-w-[3rem] text-center">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-4 py-3 dark:hover:bg-dark-muted hover:bg-slate-200 transition-colors dark:text-white text-slate-800">
                <FiPlus className="w-4 h-4" />
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm transition-all
                ${addedToCart ? 'bg-emerald-500 text-white' : 'bg-gradient-to-r from-primary-500 to-violet-500 text-white hover:shadow-glow-primary'}`}
            >
              <FiShoppingCart className="w-4 h-4" />
              {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
            </motion.button>

            <button
              onClick={() => toggleItem(product)}
              className={`p-3 rounded-xl border-2 transition-all ${inWish ? 'bg-red-500/10 border-red-500 text-red-400' : 'dark:border-dark-border border-slate-200 dark:text-slate-400 text-slate-600 hover:border-red-400 hover:text-red-400'}`}
            >
              <FiHeart className={`w-5 h-5 ${inWish ? 'fill-current' : ''}`} />
            </button>

            <button className="p-3 rounded-xl border-2 dark:border-dark-border border-slate-200 dark:text-slate-400 text-slate-600 dark:hover:border-primary-500/50 hover:border-primary-300 transition-all">
              <FiShare2 className="w-5 h-5" />
            </button>
          </div>

          {/* Stock Warning */}
          {product.stock < 10 && (
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 text-orange-400 text-sm font-semibold"
            >
              <HiSparkles className="w-4 h-4" />
              Only {product.stock} left — order soon!
            </motion.div>
          )}

          {/* Delivery Info */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <FiTruck className="w-5 h-5" />, title: product.freeShipping ? 'Free Delivery' : `₹99 Delivery`, sub: `${product.deliveryDays} days`, color: 'text-blue-400' },
              { icon: <FiShield className="w-5 h-5" />, title: 'Genuine Product', sub: '100% authentic', color: 'text-emerald-400' },
              { icon: <FiRefreshCw className="w-5 h-5" />, title: 'Easy Return', sub: '30-day window', color: 'text-violet-400' },
            ].map(f => (
              <div key={f.title} className="p-3 dark:bg-dark-card bg-slate-50 rounded-2xl border dark:border-dark-border border-slate-200 text-center">
                <div className={`${f.color} flex justify-center mb-1.5`}>{f.icon}</div>
                <div className="text-xs font-semibold dark:text-white text-slate-800">{f.title}</div>
                <div className="text-xs dark:text-slate-500 text-slate-500 mt-0.5">{f.sub}</div>
              </div>
            ))}
          </div>

          {/* Seller */}
          <div className="p-3 dark:bg-dark-card bg-slate-50 rounded-xl border dark:border-dark-border border-slate-200 flex items-center justify-between">
            <div className="text-sm">
              <span className="dark:text-slate-400 text-slate-600">Sold by: </span>
              <span className="font-semibold dark:text-white text-slate-800">{product.seller}</span>
            </div>
            <Badge variant="success" size="xs">Verified</Badge>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together */}
      {boughtTogether.length > 0 && (
        <div className="mb-16">
          <h2 className="text-xl font-bold dark:text-white text-slate-900 mb-6">Frequently Bought Together</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 dark:bg-dark-card bg-slate-50 rounded-2xl border dark:border-dark-border border-slate-200">
            <div className="flex items-center gap-3 flex-wrap">
              {[product, ...boughtTogether.slice(0, 2)].map((p, i) => (
                <React.Fragment key={p.id}>
                  <div className="flex flex-col items-center gap-2">
                    <img src={p.thumbnail} alt={p.name} className="w-20 h-20 object-cover rounded-xl border dark:border-dark-border border-slate-200" />
                    <span className="text-xs dark:text-slate-400 text-slate-600 text-center line-clamp-1 w-20">{p.name}</span>
                    <span className="text-xs font-bold dark:text-white text-slate-800">₹{p.price.toLocaleString()}</span>
                  </div>
                  {i < 2 && <span className="text-2xl dark:text-slate-400 text-slate-400 font-light">+</span>}
                </React.Fragment>
              ))}
            </div>
            <div className="sm:ml-auto">
              <div className="text-sm dark:text-slate-400 text-slate-600 mb-1">Total:</div>
              <div className="text-xl font-black dark:text-white text-slate-900 mb-3">
                ₹{([product, ...boughtTogether.slice(0, 2)].reduce((s, p) => s + p.price, 0)).toLocaleString()}
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-violet-500 text-white rounded-xl font-bold text-sm hover:shadow-glow-primary transition-all">
                Add All to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-16">
        <div className="flex gap-1 p-1 dark:bg-dark-card bg-slate-100 rounded-2xl w-fit mb-6">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-white dark:bg-dark-surface text-primary-500 shadow dark:shadow-dark-card'
                  : 'dark:text-slate-400 text-slate-600 hover:dark:text-white hover:text-slate-900'
              }`}
            >
              {tab}
              {tab === 'Reviews' && ` (${productReviews.length})`}
            </button>
          ))}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {activeTab === 'Description' && (
            <div className="dark:text-slate-300 text-slate-700 leading-relaxed text-sm sm:text-base max-w-3xl">
              {product.description}
            </div>
          )}

          {activeTab === 'Specifications' && (
            <div className="max-w-2xl">
              <div className="rounded-2xl border dark:border-dark-border border-slate-200 overflow-hidden">
                {Object.entries(product.specifications).map(([key, val], i) => (
                  <div key={key} className={`flex gap-4 p-4 ${i % 2 === 0 ? 'dark:bg-dark-card bg-slate-50' : 'dark:bg-dark-surface bg-white'}`}>
                    <span className="text-sm font-semibold dark:text-slate-300 text-slate-700 min-w-[140px]">{key}</span>
                    <span className="text-sm dark:text-slate-400 text-slate-600">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Reviews' && (
            <div className="max-w-3xl space-y-6">
              {/* Rating Summary */}
              <div className="flex flex-col sm:flex-row gap-8 p-6 dark:bg-dark-card bg-slate-50 rounded-2xl border dark:border-dark-border border-slate-200">
                <div className="text-center">
                  <div className="text-5xl font-black dark:text-white text-slate-900">{product.rating}</div>
                  <div className="flex items-center justify-center gap-0.5 my-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'dark:text-slate-600 text-slate-300'}`} />
                    ))}
                  </div>
                  <div className="text-sm dark:text-slate-400 text-slate-600">{product.reviewCount.toLocaleString()} reviews</div>
                </div>
                <div className="flex-1 space-y-2">
                  {ratingBreakdown.map(r => (
                    <div key={r.stars} className="flex items-center gap-3">
                      <span className="text-sm dark:text-slate-400 text-slate-600 w-4">{r.stars}</span>
                      <FaStar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <div className="flex-1 dark:bg-dark-muted bg-slate-200 rounded-full h-2">
                        <div className="bg-amber-400 h-2 rounded-full transition-all" style={{ width: `${r.pct}%` }} />
                      </div>
                      <span className="text-sm dark:text-slate-400 text-slate-600 w-6 text-right">{r.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Cards */}
              {productReviews.length > 0 ? productReviews.map(r => (
                <div key={r.id} className="p-5 dark:bg-dark-card bg-white rounded-2xl border dark:border-dark-border border-slate-200">
                  <div className="flex items-start gap-3 mb-3">
                    <img src={r.userAvatar} alt={r.userName} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm dark:text-white text-slate-800">{r.userName}</span>
                        {r.verified && <Badge variant="success" size="xs">Verified Purchase</Badge>}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">{Array.from({ length: r.rating }).map((_, i) => <FaStar key={i} className="w-3 h-3 text-amber-400" />)}</div>
                        <span className="text-xs dark:text-slate-500 text-slate-400">{new Date(r.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-semibold dark:text-white text-slate-800 mb-1 text-sm">{r.title}</h4>
                  <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed mb-3">{r.comment}</p>
                  <div className="text-xs dark:text-slate-500 text-slate-400">
                    {r.helpful} people found this helpful
                  </div>
                </div>
              )) : (
                <div className="text-center py-10 dark:text-slate-400 text-slate-600">
                  No reviews yet. Be the first to review this product!
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold dark:text-white text-slate-900 mb-6">Similar Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {similarProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      )}

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </motion.div>
  );
};

export default ProductDetail;
