import { create } from 'zustand';
import type { Product, WishlistItem } from '@/types';

interface WishlistStore {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  addItem: (product) => {
    if (!get().isInWishlist(product.id)) {
      set(state => ({ items: [...state.items, { product, addedAt: new Date().toISOString() }] }));
    }
  },

  removeItem: (productId) => {
    set(state => ({ items: state.items.filter(i => i.product.id !== productId) }));
  },

  isInWishlist: (productId) => {
    return get().items.some(i => i.product.id === productId);
  },

  toggleItem: (product) => {
    if (get().isInWishlist(product.id)) {
      get().removeItem(product.id);
    } else {
      get().addItem(product);
    }
  },

  clearWishlist: () => set({ items: [] }),
}));
