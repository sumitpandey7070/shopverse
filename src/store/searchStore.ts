import { create } from 'zustand';
import type { Product } from '@/types';
import { products } from '@/data';

interface SearchStore {
  query: string;
  results: Product[];
  isOpen: boolean;
  isListening: boolean;
  recentSearches: string[];
  setQuery: (query: string) => void;
  search: (query: string) => void;
  clearSearch: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleListening: () => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  query: '',
  results: [],
  isOpen: false,
  isListening: false,
  recentSearches: ['iPhone 15', 'Sony headphones', 'Nike shoes', 'MacBook Pro'],

  setQuery: (query) => set({ query }),

  search: (query) => {
    if (!query.trim()) {
      set({ results: [], query: '' });
      return;
    }
    const q = query.toLowerCase();
    const results = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    ).slice(0, 8);
    set({ results, query });
    get().addRecentSearch(query);
  },

  clearSearch: () => set({ query: '', results: '' as any }),

  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: '', results: [] }),

  toggleListening: () => set(state => ({ isListening: !state.isListening })),

  addRecentSearch: (query) => {
    set(state => ({
      recentSearches: [query, ...state.recentSearches.filter(s => s !== query)].slice(0, 6)
    }));
  },

  clearRecentSearches: () => set({ recentSearches: [] }),
}));
