// ===== Core Types =====

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  thumbnail: string;
  category: string;
  subcategory: string;
  brand: string;
  brandLogo: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isFlashSale: boolean;
  flashSaleEnd?: string;
  tags: string[];
  colors?: ProductVariant[];
  sizes?: string[];
  specifications: Record<string, string>;
  seller: string;
  sellerId: string;
  freeShipping: boolean;
  deliveryDays: number;
}

export interface ProductVariant {
  label: string;
  value: string;
  hex?: string;
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  productCount: number;
  subcategories: Subcategory[];
  gradient: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  productCount: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  productId: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: OrderStatus;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  couponCode?: string;
  address: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
  type: 'home' | 'work' | 'other';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  role: 'customer' | 'seller' | 'admin';
  joinedAt: string;
  orders: number;
  totalSpent: number;
  addresses: Address[];
  status: 'active' | 'inactive' | 'suspended';
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  avatar: string;
  storeName: string;
  storeDescription: string;
  rating: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  joinedAt: string;
  status: 'active' | 'pending' | 'suspended';
  verified: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
}

export interface Notification {
  id: string;
  type: 'order' | 'promo' | 'system' | 'review';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon?: string;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  priceMin: number;
  priceMax: number;
  rating: number;
  inStock: boolean;
  freeShipping: boolean;
}

export interface SortOption {
  label: string;
  value: string;
}

export type ViewMode = 'grid' | 'list';

export interface ChartData {
  name: string;
  value: number;
  revenue?: number;
  orders?: number;
  growth?: number;
}

export interface AnalyticsStat {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: string;
  color: string;
}
