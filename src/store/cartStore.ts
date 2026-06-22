import { create } from 'zustand';
import type { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  couponCode: string;
  couponDiscount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const COUPONS: Record<string, number> = {
  SAVE200: 200,
  FLAT10: 0.10,
  WELCOME500: 500,
  SHOPVERSE20: 0.20,
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  couponCode: '',
  couponDiscount: 0,

  addItem: (product, quantity = 1, selectedColor, selectedSize) => {
    set(state => {
      const existing = state.items.find(i => i.product.id === product.id && i.selectedColor === selectedColor && i.selectedSize === selectedSize);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.product.id === product.id && i.selectedColor === selectedColor && i.selectedSize === selectedSize
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        };
      }
      return { items: [...state.items, { product, quantity, selectedColor, selectedSize }] };
    });
  },

  removeItem: (productId) => {
    set(state => ({ items: state.items.filter(i => i.product.id !== productId) }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) { get().removeItem(productId); return; }
    set(state => ({
      items: state.items.map(i => i.product.id === productId ? { ...i, quantity } : i)
    }));
  },

  clearCart: () => set({ items: [], couponCode: '', couponDiscount: 0 }),

  toggleCart: () => set(state => ({ isOpen: !state.isOpen })),

  getTotal: () => {
    const { items, couponDiscount } = get();
    const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const discount = couponDiscount > 1 ? couponDiscount : subtotal * couponDiscount;
    return Math.max(0, subtotal - discount);
  },

  getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  applyCoupon: (code) => {
    const discount = COUPONS[code.toUpperCase()];
    if (discount !== undefined) {
      set({ couponCode: code.toUpperCase(), couponDiscount: discount });
      return true;
    }
    return false;
  },

  removeCoupon: () => set({ couponCode: '', couponDiscount: 0 }),
}));
